const jsforce = require('jsforce');
const fs = require('fs');

// Load environment variables
require('dotenv').config(); // Assuming you have dotenv installed

const clientId = process.env.SALESFORCE_CLIENT_ID;
const clientSecret = process.env.SALESFORCE_CLIENT_SECRET;
const username = process.env.SALESFORCE_USERNAME;
const password = process.env.SALESFORCE_PASSWORD;
const securityToken = process.env.SALESFORCE_SECURITY_TOKEN;
const loginUrl = process.env.SALESFORCE_LOGIN_URL;

const conn = new jsforce.Connection({
    // OAuth2 configuration
    oauth2: {
        clientId: clientId,
        clientSecret: clientSecret,
        loginUrl: loginUrl,
    }, version: '58.0'
});

// Function to authenticate and return a connected instance
async function login() {
    try {
        await conn.login(username, password + securityToken);
        return conn;
    } catch (err) {
        console.error('Error during Salesforce login:', err);
        throw err; // Re-throw to handle in main application
    }
}

// Function to execute a SOQL query and return results in batches
async function querySalesforce(soqlQuery, batchSize = 2000) {
    const records = [];
    const errors = [];

    return new Promise((resolve, reject) => {
    var query = conn.query(soqlQuery)
        .on("record", function (record) {
            records.push(record);
        })
        .on("end", function () {
            console.log("total in database : " + query.totalSize);
            console.log("total fetched : " + query.totalFetched);
            resolve({ records, errors });
        })
        .on("error", function (err) {
            console.error(err);
            errors.push(err);
            reject(errors);
        })
        .run({ autoFetch: true, maxFetch: batchSize }); // synonym of Query#execute();

    });

}

// Function to execute a SOQL query in Bulk and save the result to a csv file

async function querySalesforceToCsv(soqlQuery, filePath) {
    await conn.bulk.query(soqlQuery)
        .stream().pipe(fs.createWriteStream(filePath));
    return 'Completed!';
}

async function bulkQuerySalesforce(soqlQuery) {
    const records = [];
    const errors = [];

    return new Promise((resolve, reject) => {
        conn.bulk.query(soqlQuery)
            .on('record', function (rec) {
                records.push(rec);
            })
            .on('error', function (err) {
                console.error(err);
                errors.push(err);
                reject(errors);
            })
            .on('finish', function () {
                resolve({ records, errors });
            });

    });
}

async function downloadContent(cvRecord) {
    try {
        const folderName = 'downloads/' + cvRecord.Id;
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
        const fileName = folderName + '/' + cvRecord.PathOnClient;

        const fileOut = fs.createWriteStream(fileName);
        await conn.sobject('ContentVersion').record(cvRecord.Id).blob('VersionData').pipe(fileOut); // Await the completion of pipe
        console.log(`Content downloaded to: ${fileName}`);
    } catch (error) {
        console.error('Error downloading content:', error);
        throw error; // Re-throw for handling in calling code
    }
}

async function queryMetadata() {
    var fullNames = ['Account', 'Contact', 'Lead', 'Opportunity', 'Case'];
    conn.metadata.read('CustomObject', fullNames, function (err, metadata) {
        if (err) { console.error(err); }
        for (var i = 0; i < metadata.length; i++) {
            var meta = metadata[i];
            let request = {};
            request.name = meta.fullName;
            let idField = [{
                name: "Salesforce Id",
                type: "singleLineText",
                description: 'Field for Id'
            }];
            let mappedFields = meta.fields.map((field) => {
                return addOptions({
                    name: field.label || field.fullName,
                    type: getAirtableFiedlType(field.type),
                    description: 'Field for ' + field.fullName
                })
            });


            request.fields = [...idField, ...mappedFields];

            let salesforceFields = request.fields.map(field => field.description.replace(/^Field for /, '')).join(",\n");


            console.log("Full Name: " + meta.fullName);
            console.log(hasDuplicateNames(request.fields));
            // let undefinedFields = meta.fields.filter((field) => field.type === undefined);
            // console.log(undefinedFields);
            var createAirtableFile = fs.createWriteStream('files/' + meta.fullName + '.json');
            createAirtableFile.write(JSON.stringify(request));
            createAirtableFile.end();

            var salesforceQueryFile = fs.createWriteStream('src/queries/' + meta.fullName + 'Query.js');
            salesforceQueryFile.write("const query = `select \n" + salesforceFields + " \nfrom " +
                meta.fullName + "`; \n\nexports." + meta.fullName.toLowerCase() + "Query = query;");
            salesforceQueryFile.end();
            // const distinctTypes = [...new Set(meta.fields.map(field => field.type))];
            // console.log(distinctTypes);
            //console.log("Sharing Model: " + meta.sharingModel);
        }
    });
}

function addOptions(field) {
    switch (field.type) {
        case "checkbox":
            field.options = { color: "greenBright", icon: "check" };
            break;
        case "singleSelect":
            field.options = { choices: [] };
            break;
        case "multipleSelects":
            field.options = { choices: [] };
            break;
        case "dateTime":
            field.options = { timeZone: "America/New_York", dateFormat: { name: "local" }, timeFormat: { name: "24hour" } };
            break;
        case "date":
            field.options = { dateFormat: { name: "local" } };
            break;
        case "number":
            field.options = { precision: 0 };
            break;
        case "percent":
            field.options = { precision: 2 };
            break;
        case "currency":
            field.options = { precision: 0, symbol: "$" };
            break;
    }

    return field;
}

function getAirtableFiedlType(fieldType) {
    const fieldTypeMapping = {
        'Text': 'singleLineText',
        'Checkbox': 'checkbox',
        'Picklist': 'singleSelect',
        'MultiselectPicklist': 'multipleSelects',
        'TextArea': 'multilineText',
        'Phone': 'phoneNumber',
        'Number': 'number',
        'Percent': 'percent',
        'Url': 'url',
        'Html': 'richText',
        'DateTime': 'dateTime',
        'Date': 'date',
        'Lookup': 'singleLineText',
        'LongTextArea': 'multilineText',
        'Hierarchy': 'singleLineText',
        'Currency': 'currency',
        'Email': 'email'
    };

    return fieldTypeMapping[fieldType] || 'singleLineText';
}

function hasDuplicateNames(arrayOfObjects) {
    const nameCount = {};
    let duplicateCounts = 0;
    for (const obj of arrayOfObjects) {
        const name = obj.name;
        if (nameCount[name]) {
            console.log('Duplicate field - ' + name);
            duplicateCounts++;
        } else {
            nameCount[name] = (nameCount[name] || 0) + 1;
        }
    }

    return duplicateCounts > 0;
}

/**
 * Ensure that a folder exists
 * @param {string} folderPath
 */
async function ensureFolder(folderPath) {
    try {
      await mkdir(folderPath);
    } catch (e) {}
  }

// Additional functions for specific error handling and data processing can be added here

module.exports = {
    login,
    querySalesforce,
    downloadContent,
    queryMetadata,
    bulkQuerySalesforce,
    querySalesforceToCsv,
};
