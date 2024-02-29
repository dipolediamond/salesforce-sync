const Airtable = require('airtable');
const fs = require('fs');

// Load environment variable for Airtable API key
require('dotenv').config(); // Assuming you have dotenv installed
const cleaner = require('fast-clean');
const { accountMapper } = require('./mapping/accountMapping');
const { contactMapper } = require('./mapping/contactMapping');
const { caseMapper } = require('./mapping/caseMapping');
const { leadMapper } = require('./mapping/leadMapping');
const { opportunityMapper } = require('./mapping/opportunityMapping');
const { contentdocumentlinkMapper } = require('./mapping/contentdocumentlinkMapping');
const { contentdocumentMapper } = require('./mapping/contentdocumentMapping');
const { contentversionMapper } = require('./mapping/contentversionMapping');
const { resolve } = require('path');
const { error } = require('console');

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
  // let addressTable = 'tblZJ40eBmvTO6MXa';
  let accountTable = 'tblG1WDA9dkHYBHBJ';
  let accountOptions = {
    "typecast": true,
    "performUpsert": {
      "fieldsToMergeOn": [
        "fldzsLQHGYeFcXBXZ"
      ]
    }
  };

  await upsertAirtableRecords(accountTable, accountRecords, accountOptions, mapAccountData, handleAccountUpserts, handleError);

}

async function upsertContactsFromSalesforce(contactRecords) {
  let tableId = 'tblFycun4bpUYqufm';
  let options = {
    "typecast": true,
    "performUpsert": {
      "fieldsToMergeOn": [
        "fldjiSQYgrsigtJVp"
      ]
    }
  };

  await upsertAirtableRecords(tableId, contactRecords, options, mapContactData, handleContactUpserts, handleError);
}

async function upsertCasesFromSalesforce(caseRecords) {
  let tableId = 'tbljdWbH5K7DOvxhk';
  let options = {
    "typecast": true,
    "performUpsert": {
      "fieldsToMergeOn": [
        "fld7PWz4wBZrb8Xsk"
      ]
    }
  };

  await upsertAirtableRecords(tableId, caseRecords, options, mapCaseData, handleCaseUpserts, handleError);
}

async function upsertLeadsFromSalesforce(leadRecords) {
  let tableId = 'tblaJ4tS8s63besTQ';
  let options = {
    "typecast": true,
    "performUpsert": {
      "fieldsToMergeOn": [
        "fldiFy858g0myfKLf"
      ]
    }
  };

  await upsertAirtableRecords(tableId, leadRecords, options, mapLeadData, handleLeadUpserts, handleError);
}

async function upsertOpportunitiesFromSalesforce(opportunityRecords) {
  let tableId = 'tblALbYhz7WNaSptH';
  let options = {
    "typecast": true,
    "performUpsert": {
      "fieldsToMergeOn": [
        "fldDfVoxLwK50sydS"
      ]
    }
  };

  await upsertAirtableRecords(tableId, opportunityRecords, options, mapOpportunityData, handleOpportunityUpserts, handleError);
}

async function upsertContentDocumentsFromSalesforce(contentDocumentRecords) {
  let tableId = 'tblgBCzwWAi4J9mbg';
  let options = {
    "typecast": true,
    "performUpsert": {
      "fieldsToMergeOn": [
        "flduu7Law2tq0MtD2"
      ]
    }
  };

  await upsertAirtableRecords(tableId, contentDocumentRecords, options, mapContentDocumentData, handleUpserts, handleError);
}

async function upsertContentDocumentLinksFromSalesforce(contentDocumentLinkRecords) {
  let tableId = 'tblKY7NtscIHODYAz';
  let options = {
    "typecast": true,
    "performUpsert": {
      "fieldsToMergeOn": [
        "fldQIzxwvZqldge0T"
      ]
    }
  };

  await upsertAirtableRecords(tableId, contentDocumentLinkRecords, options, mapContentDocumentLinkData, handleUpserts, handleError);
}

async function upsertContentVersionsFromSalesforce(contentVersionRecords) {
  let tableId = 'tblnG8JLRzCFijJ7x';
  let options = {
    "typecast": true,
    "performUpsert": {
      "fieldsToMergeOn": [
        "flddemB9k9saRQK0N"
      ]
    }
  };

  await upsertAirtableRecords(tableId, contentVersionRecords, options, mapContentVersionData, handleUpserts, handleError);
}



async function upsertAirtableRecords(tableId, records, options, mapper, onSuccess, onError) {
  let batch = [];
  let batchSize = 10;
  // // upsert the accounts
  for (let i = 0; i < records.length; i += batchSize) {
    batch = records.slice(i, i + batchSize);
    let data = batch.map(mapper);
    await base(tableId).update(data, options)
      .then(onSuccess)
      .catch(onError);
  }
}



// Additional functions for specific data transformations or error handling can be added here

function handleAddressUpserts(records) {
  console.log(records.length + ' address records upserted');
}

function handleContactUpserts(records) {
  console.log(records.length + ' contact records upserted');
}

function handleCaseUpserts(records) {
  console.log(records.length + ' case records upserted');
}

function handleLeadUpserts(records) {
  console.log(records.length + ' lead records upserted');
}

function handleOpportunityUpserts(records) {
  console.log(records.length + ' opportunity records upserted');
}

function handleAccountUpserts(records) {

  // accountsCache = accountsCache.concat(records.map((record) => {
  //   return {
  //     salesforceRecordId: record.fields.SalesforceId,
  //     airtableRecordId: record.id
  //   }
  // })
  // );

  console.log(records.length + ' account records upserted');

}

function handleUpserts(records) {
  console.log(records.length + ' records upserted');
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
  return mapAndCleanFields(accountMapper(salesforceRecord));
}

function mapContactData(salesforceRecord) {
  return mapAndCleanFields(contactMapper(salesforceRecord));
}

function mapCaseData(salesforceRecord) {
  return mapAndCleanFields(caseMapper(salesforceRecord));
}

function mapLeadData(salesforceRecord) {
  return mapAndCleanFields(leadMapper(salesforceRecord));
}

function mapOpportunityData(salesforceRecord) {
  return mapAndCleanFields(opportunityMapper(salesforceRecord));
}

function mapContentDocumentData(salesforceRecord) {
  return mapAndCleanFields(contentdocumentMapper(salesforceRecord));
}

function mapContentDocumentLinkData(salesforceRecord) {
  return mapAndCleanFields(contentdocumentlinkMapper(salesforceRecord));
}

function mapContentVersionData(salesforceRecord) {
  return mapAndCleanFields(contentversionMapper(salesforceRecord));
}

function mapAndCleanFields(recordFields) {
  return cleaner.clean({fields: recordFields}, { nullCleaner: true, cleanInPlace: true });
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

async function getAirtableTables() {
  let url = airtableEndpointUrl + '/v0/meta/bases/' + airtableBase + '/tables';
  let options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + airtableApiKey,
    }
  }
  return new Promise((resolve, reject) => {
    fetch(url, options)
    .then(res => resolve(res.json()))
    .catch(err => reject(err));
  });
}


module.exports = {
  getAirtableTables,
  upsertAccountsFromSalesforce,
  upsertContactsFromSalesforce,
  upsertCasesFromSalesforce,
  upsertLeadsFromSalesforce,
  upsertOpportunitiesFromSalesforce,
  upsertContentDocumentLinksFromSalesforce,
  upsertContentDocumentsFromSalesforce,
  upsertContentVersionsFromSalesforce,
  upsertAirtableRecords,
};