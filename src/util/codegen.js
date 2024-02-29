const Airtable = require('airtable');
const fs = require('fs');

// Load environment variable for Airtable API key
require('dotenv').config(); // Assuming you have dotenv installed
const { resolve } = require('path');
const { error } = require('console');

const airtableEndpointUrl = process.env.AIRTABLE_ENDPOINT_URL;
const airtableApiKey = process.env.AIRTABLE_API_KEY;
const airtableBase = process.env.AIRTABLE_BASE;

const tables = [
    'tblG1WDA9dkHYBHBJ', // Account
    'tblFycun4bpUYqufm', // Contact
    'tbljdWbH5K7DOvxhk', // Case
    'tblaJ4tS8s63besTQ', // Lead
    'tblALbYhz7WNaSptH'  // Opportunity
];

async function getAirtableTableFields(tableId) {
    let url = airtableEndpointUrl + '/v0/meta/bases/' + airtableBase + '/tables';
    let options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + airtableApiKey,
        }
    }
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        const table = data.tables.find((tableRecord) => tableRecord.id == tableId);
        const fields = table.fields.sort(compareByName).map((field) => {
            if (field.type == 'multipleSelects') {
                return `'${field.id}': salesforceRecord.${field.description.replace(/^Field for /, '')}.split(';') ,// ${field.type}`;
            } else {
                return `'${field.id}': salesforceRecord.${field.description.replace(/^Field for /, '')} ,// ${field.type}`;
            }

        });

        let fileContent = `function mapSF${table.name}ToAirtable${table.name}(salesforceRecord) {
        return {
          ${fields.join("\n")}
        }
      }
      exports.${table.name.toLowerCase()}Mapper = mapSF${table.name}ToAirtable${table.name};`;

        var mappingFile = fs.createWriteStream('src/mapping/' + table.name.toLowerCase() + 'Mapping.js');
        mappingFile.write(fileContent);
        mappingFile.end();

    } catch (err) {
        console.log(err.message); //can be console.error
    }
}


async function getnerateAirtableFieldMappings() {

    const tables = [
        'tblG1WDA9dkHYBHBJ', // Account
        'tblFycun4bpUYqufm', // Contact
        'tbljdWbH5K7DOvxhk', // Case
        'tblaJ4tS8s63besTQ', // Lead
        'tblALbYhz7WNaSptH', // Opportunity
        'tblgBCzwWAi4J9mbg', // ContentDocument
        'tblKY7NtscIHODYAz', // ContentDocumentLink
        'tblnG8JLRzCFijJ7x', // ContentVersion
    ];

    tables.forEach(tableId => getAirtableTableFields(tableId));
}

function compareByName(obj1, obj2) {
    const name1 = obj1.name.toUpperCase(); // Convert names to uppercase for case-insensitive sorting
    const name2 = obj2.name.toUpperCase();

    if (name1 < name2) {
        return -1;
    }
    if (name1 > name2) {
        return 1;
    }
    return 0;
}

getnerateAirtableFieldMappings();