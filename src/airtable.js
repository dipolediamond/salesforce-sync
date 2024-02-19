const Airtable = require('airtable');

// Load environment variable for Airtable API key
require('dotenv').config(); // Assuming you have dotenv installed
const cleaner = require('fast-clean');

const airtableEndpointUrl = process.env.AIRTABLE_ENDPOINT_URL;
const airtableApiKey = process.env.AIRTABLE_API_KEY;
const airtableBase = process.env.AIRTABLE_BASE;

Airtable.configure({
  endpointUrl: airtableEndpointUrl,
  apiKey: airtableApiKey
});
const base = Airtable.base(airtableBase);

var accountsCache = [];


function getAddressesFromAccount(records) {
  let billingAddresses = records.filter(record => record.BillingAddress)
    .map((record) => mapAddressData(record.Id, 'Billing', record.BillingAddress));

  let shippingAddresses = records.filter(record => record.ShippingAddress)
    .map((record) => mapAddressData(record.Id, 'Shipping', record.ShippingAddress));

  return billingAddresses.concat(shippingAddresses);
}

async function upsertAccountsFromSalesforce(accountRecords) {
  accountsCache.length = 0;
  let addressTable = 'tblZJ40eBmvTO6MXa';
  let accountTable = 'tblxZYB1Q6FY3hQGt';

  let addressOptions = {
    "typecast": true,
    "performUpsert": {
      "fieldsToMergeOn": [
        "fldk4xCjVYuy8Td1s",
        "fldqjJ2HoCbdz0IKn"
      ]
    }
  };

  let accountOptions = {
    "typecast": true,
    "performUpsert": {
      "fieldsToMergeOn": [
        "fldiAd2DHJLgDa5xz"
      ]
    }
  };

  let accountBatch = [];
  let addressBatch = [];
  let batchSize = 10;
  // // upsert the accounts
  for (let i = 0; i < accountRecords.length; i += batchSize) {
    accountBatch = accountRecords.slice(i, i + batchSize);
    let accounts = accountBatch.map(mapAccountData);
    await base(accountTable).update(accounts, accountOptions)
      .then(handleAccountUpserts)
      .catch(handleError);

    let addressRecords = getAddressesFromAccount(accountBatch);
    for (let j = 0; j < addressRecords.length; j += batchSize) {
      let addressBatch = addressRecords.slice(j, j + batchSize);
      await base(addressTable).update(addressBatch, addressOptions)
        .then(handleAddressUpserts)
        .catch(handleError);;
    }
  }
}

async function upsertAirtableRecords(tableId, records, options) {
  return base(tableId).update(batch, options);
}


// Additional functions for specific data transformations or error handling can be added here

function handleAddressUpserts(records) {
  console.log(records.length + ' address records upserted');
}

function handleAccountUpserts(records) {

  accountsCache = accountsCache.concat(records.map((record) => {
    return {
      salesforceRecordId: record.fields.SalesforceId,
      airtableRecordId: record.id
    }
  })
  );

  console.log(records.length + ' account records upserted');

}

function handleError(err) {
  console.error(err);
}

function getAirtableIdBySalesforceId(salesforceId) {
  let match = accountsCache.find(
    (account) => account.salesforceRecordId == salesforceId);
  if (match)
    return match.airtableRecordId;
  else return null;
}

function mapAccountData(salesforceRecord) {
  let mappedData = {
    fields: {
      'fldjoTOIRqMhEpDIS': salesforceRecord.Name, // Name - Text
      'fldEbXvKqeNXBER5a': salesforceRecord.Description, // Description - Long text
      'fldZQyxccUM72SdSV': salesforceRecord.Type, // Type - Single Select
      'fldnKlbGlSn8kQCb2': salesforceRecord.Active__c, // Status - Single select
      'fldiAd2DHJLgDa5xz': salesforceRecord.Id, // SalesforceId - Text
      'fldE2uInnbjU1dd2r': salesforceRecord.NumberOfEmployees, // NumberOfEmployees - Number
      'flddfrVaTpRswXdH9': salesforceRecord.Phone, // Phone - phone number
      'fldnJ1vgAUMqPDRjE': salesforceRecord.BillingAddress, // BillingAddress - Linked record
      'fldErzv3F9yLUam1a': salesforceRecord.ShippingAddress, // ShippingAddress - Linked record
    }
  }

  return cleaner.clean(mappedData, { nullCleaner: true, cleanInPlace: true });
}

function mapAddressData(salesforceRecordId, addressType, address) {

  let mappedData = {
    fields: {
      'fldillTieuCIX1EGh': address.street, //
      'fldQESomIx21udWgK': address.city, // 
      'fldavDorvCB8WT9kB': address.state, // 
      'fldLsi6eyGTj24sBx': address.postalCode, // 
      'fldzxDjNDfGJAJhNn': address.country, // 
      'fld1AcpWkIi4ixrzc': address.latitude, // 
      'fldTeN52DiFw9uYtC': address.longitude, // 
      'fldCe2qXf72vIuQYb': address.geocodeAccuracy, // 
      'fldk4xCjVYuy8Td1s': salesforceRecordId, // salesforceRecordId
      'fldqjJ2HoCbdz0IKn': addressType, // AddressType
    }
  };

  if (addressType == 'Billing') {
    mappedData.fields.fldGh12Q8X6otMKr2 = getAirtableIdBySalesforceId(salesforceRecordId);
  }
  if (addressType == 'Shipping') {
    mappedData.fields.flds0zoKI36uvYdkc = getAirtableIdBySalesforceId(salesforceRecordId);
  }

  return cleaner.clean(mappedData, { nullCleaner: true, cleanInPlace: true });
}

module.exports = {
  upsertAccountsFromSalesforce,
  upsertAirtableRecords,
};