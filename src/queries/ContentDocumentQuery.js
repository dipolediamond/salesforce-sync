const query = `SELECT Id, Title, Description, FileExtension, ContentSize, FileType,LatestPublishedVersionId,
(SELECT Id,ContentDocumentId,  IsDeleted, LinkedEntityId, LinkedEntity.Type FROM ContentDocumentLinks),
(SELECT Id, FileType, FileExtension, ContentSize, ContentUrl,FirstPublishLocationId, PathOnClient, TextPreview, Title, VersionNumber, VersionDataUrl FROM ContentVersions)
FROM ContentDocument`;

exports.contentDocumentQuery = query;
