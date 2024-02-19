const Salesforce = require('./salesforce'); // Replace with your path
const Airtable = require('./airtable'); // Replace with your path
//const config = require('./config'); // Replace with your path

const main = async () => {
  try {
    // Connect to Salesforce
    const conn = await Salesforce.login();

    // Define data extraction configuration
    const soqlQuery = `SELECT Id, Name, Description, Type, Active__c, Phone, 
    NumberOfEmployees FROM Account`; // Replace with your desired query and fields

    // Retrieve Salesforce data in batches
    await Salesforce.bulkQuerySalesforce(soqlQuery);

    // Process and map data
    // const airtableData = salesforceData.map(Airtable.mapData); // Use your mapping function

    // Create Airtable records in batches
    //await Airtable.upsertAccountsFromSalesforce(salesforceData);

    console.log('Data migration completed successfully!');
  } catch (err) {
    console.error('Error during data migration:', err);
  }
};


main();