const { BlobServiceClient } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require('@azure/identity');
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();

function getContainerClient() {
    try {
        console.log("Azure Blob storage v12 - JavaScript quickstart sample");

        // Quick start code goes here

        const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
        const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
        if (!accountName) throw Error('Azure Storage accountName not found');
        if (!containerName) throw Error('Azure Storage containerName not found');

        const blobServiceClient = new BlobServiceClient(
            `https://${accountName}.blob.core.windows.net`,
            new DefaultAzureCredential()
        );

        const containerClient = blobServiceClient.getContainerClient(containerName);

        return containerClient;

    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}


// containerClient: ContainerClient object
// blobName: string, includes file extension if provided
// localFilePath: fully qualified path and file name
async function uploadBlobFromLocalPath(containerClient, blobName, localFilePath) {
    // Create blob client from container client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadFile(localFilePath);

    return blockBlobClient;
}

module.exports = {
    getContainerClient,
    uploadBlobFromLocalPath,
};