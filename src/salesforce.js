const jsforce = require('jsforce');

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
    }
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
    let records = [];
    let done = false;
    let nextRecords;

    while (!done) {
        nextRecords = await conn.query(soqlQuery);
        records = records.concat(nextRecords.records);
        done = nextRecords.done;
        if (!done) {
            soqlQuery = `SOQL_QUERY { FOLLOWING OFFSET ${nextRecords.nextRecordsUrl.substr(nextRecords.nextRecordsUrl.indexOf('=') + 1)} }`;
        }
    }

    return records;
}

// Function to execute a SOQL query in Bulk and save the result to a csv file

async function querySalesforceToCsv(soqlQuery, filePath) {
    await conn.bulk.query(soqlQuery)
        .stream().pipe(fs.createWriteStream(filePath));
    return 'Completed!';
}

async function bulkQuerySalesforce(soqlQuery) {
    conn.bulk.query(soqlQuery)
        .on('record', function (rec) { console.log(rec); })
        .on('error', function (err) { console.error(err); });
}

// Additional functions for specific error handling and data processing can be added here

module.exports = {
    login,
    querySalesforce,
    bulkQuerySalesforce,
    querySalesforceToCsv,
};

/*
var username = 'dipo.majekodunmi@wise-fox-d3dzw0.com';
var password = 'RS6!zVU0W9MIBqQx';
var securityToken = '5KDixp8rdxxlmz0odns5WdDn';
conn.login(username, password + securityToken, function (err, userInfo) {
    if (err) { return console.error(err); }
    // Now you can get the access token and instance URL information.
    // Save them to establish connection next time.
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    //console.log(conn.refreshToken);
    // logged in user property
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    // ...

   
    conn.bulk.query("SELECT Id, Name, NumberOfEmployees FROM Account")
        .stream().pipe(fs.createWriteStream('./accounts.csv'));
});

*/