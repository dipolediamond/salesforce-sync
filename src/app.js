const Salesforce = require('./salesforce'); // Replace with your path
const Airtable = require('./airtable'); // Replace with your path
const Azure = require('./azure'); // Replace with your path
//const config = require('./config'); // Replace with your path
const { accountQuery } = require('./queries/AccountQuery.js');
const { contactQuery } = require('./queries/ContactQuery.js');
const { caseQuery } = require('./queries/CaseQuery.js');
const { leadQuery } = require('./queries/LeadQuery.js');
const { opportunityQuery } = require('./queries/OpportunityQuery.js');
const { contentDocumentQuery } = require('./queries/ContentDocumentQuery.js');

const main = async () => {
    try {
        // Connect to Salesforce
        const conn = await Salesforce.login();

        //await Salesforce.querySalesforceToCsv(`Select NACIS_Code__c,NAIC_Code__c from Account where NACIS_Code__c != '' or NAIC_Code__c != ''`, 'NAICS.csv');
        //await Salesforce.queryMetadata();
        let content = await Salesforce.querySalesforce(contentDocumentQuery);
        //console.log(content.records[0].ContentDocumentLinks.records[0].LinkedEntity);
        let contentDocuments = content.records.map((c) => ({
            Id: c.Id,
            Title: c.Title,
            FileExtension: c.FileExtension,
            ContentSize: c.ContentSize,
            FileType: c.FileType,
            LatestPublishedVersionId: c.LatestPublishedVersionId
        }));

        // Airtable.upsertContentDocumentsFromSalesforce(contentDocuments);

        let contentDocumentLinks = content.records.map((c) => c.ContentDocumentLinks.records.map((cdl) => ({
            Id: cdl.Id,
            ContentDocumentId: cdl.ContentDocumentId,
            IsDeleted: cdl.IsDeleted,
            LinkedEntityId: cdl.LinkedEntityId,
            LinkedEntityType: cdl.LinkedEntity.Type
        }))).flat();

        // Airtable.upsertContentDocumentLinksFromSalesforce(contentDocumentLinks);

        let contentVersions = content.records.map((c) => c.ContentVersions.records.map((cv) => ({
            Id: cv.Id,
            FileType: cv.FileType,
            FileExtension: cv.FileExtension,
            ContentSize: cv.ContentSize,
            ContentUrl: cv.ContentUrl,
            FirstPublishLocationId: cv.FirstPublishLocationId,
            PathOnClient: cv.PathOnClient,
            TextPreview: cv.TextPreview,
            Title: cv.Title,
            VersionNumber: cv.VersionNumber,
            VersionDataUrl: cv.VersionDataUrl
        }))).flat();

        await processDownloads(contentVersions);
        

        let containerClient = Azure.getContainerClient();
        let updatedCV = await uploadContentVersions(contentVersions, containerClient);
        //console.log(contentVersions, updatedCV);
        
        Airtable.upsertContentVersionsFromSalesforce(updatedCV);

        // Retrieve Salesforce data in batches
        let accounts = [];
        // await Salesforce.bulkQuerySalesforce(accountQuery)
        //     .then(results => {
        //         console.log("Account records fetched:", results.records.length);
        //         console.log("Errors fetching accounts:", results.errors.length);
        //         accounts.push(...results.records);
        //     })
        //     .then(() => {
        //         Airtable.upsertAccountsFromSalesforce(accounts);
        //     })
        //     .catch(error => {
        //         console.error("Error fetching accounts:", error);
        //     });

        // let contacts = [];
        // await Salesforce.bulkQuerySalesforce(contactQuery)
        //     .then(results => {
        //         console.log("Contact records fetched:", results.records.length);
        //         console.log("Errors fetching contacts:", results.errors.length);
        //         contacts.push(...results.records);
        //     })
        //     .then(() => {
        //         Airtable.upsertContactsFromSalesforce(contacts);
        //     })
        //     .catch(error => {
        //         console.error("Error fetching contacts:", error);
        //     });

        // let cases = [];
        // await Salesforce.bulkQuerySalesforce(caseQuery)
        //     .then(results => {
        //         console.log("Case records fetched:", results.records.length);
        //         console.log("Errors fetching cases:", results.errors.length);
        //         cases.push(...results.records);
        //     })
        //     .then(() => {
        //         Airtable.upsertCasesFromSalesforce(cases);
        //     })
        //     .catch(error => {
        //         console.error("Error fetching cases:", error);
        //     });

        // let leads = [];
        // await Salesforce.bulkQuerySalesforce(leadQuery)
        //     .then(results => {
        //         console.log("Lead records fetched:", results.records.length);
        //         console.log("Errors fetching leads:", results.errors.length);
        //         leads.push(...results.records);
        //     })
        //     .then(() => {
        //         Airtable.upsertLeadsFromSalesforce(leads);
        //     })
        //     .catch(error => {
        //         console.error("Error fetching leads:", error);
        //     });

        // let opportunities = [];
        // await Salesforce.bulkQuerySalesforce(opportunityQuery)
        //     .then(results => {
        //         console.log("Opportunity records fetched:", results.records.length);
        //         console.log("Errors fetching opportunities:", results.errors.length);
        //         opportunities.push(...results.records);
        //     })
        //     .then(() => {
        //         Airtable.upsertOpportunitiesFromSalesforce(opportunities);
        //     })
        //     .catch(error => {
        //         console.error("Error fetching opportunities:", error);
        //     });

        // Process and map data
        // const airtableData = salesforceData.map(Airtable.mapData); // Use your mapping function

        // Create Airtable records in batches
        //await Airtable.upsertAccountsFromSalesforce(salesforceData);

        //console.log('Data migration completed successfully!');
    } catch (err) {
        console.error('Error during data migration:', err);
    }
};

async function processDownloads(cvRecords) {
    try {
        for (const cvRecord of cvRecords) {
            await Salesforce.downloadContent(cvRecord); // Await each download
            console.log(`File ${cvRecord.PathOnClient} downloaded successfully.`);
        }
        console.log("All downloads completed successfully.");
    } catch (error) {
        console.error("An error occurred during downloads:", error);
    }
}

async function uploadContentVersions(contentVersions, containerClient) {
    try {
        for (const cv of contentVersions) {
            const blobName = `${cv.Id}/${cv.PathOnClient}`;

            try {
                const res = await Azure.uploadBlobFromLocalPath(containerClient, blobName, `downloads/${blobName}`);
                cv.VersionData = [{ url: res.url }];
                console.log("Blob uploaded successfully:", cv.PathOnClient);
            } catch (err) {
                console.error("Error uploading blob:", err);
                // Handle individual upload errors as needed
            }
        }
        console.log("All blobs uploaded successfully.");
    } catch (error) {
        console.error("An error occurred during uploads:", error);
        // Handle any errors that occurred during the overall process
    }
    return contentVersions;
}
main();