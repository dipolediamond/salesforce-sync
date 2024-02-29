function mapSFContentVersionToAirtableContentVersion(salesforceRecord) {
        return {
          'fldOLU5SJPXJ6Rvhr': salesforceRecord.ContentSize ,// number
'flddtllpI3mvCgYBc': salesforceRecord.ContentUrl ,// singleLineText
'fldvyH8IaPQGu6LWl': salesforceRecord.FileExtension ,// singleLineText
'fldXSipE2TU7OQTfa': salesforceRecord.FileType ,// singleLineText
'fldfj2pxak5JDSMc9': salesforceRecord.FirstPublishLocationId ,// singleLineText
'fld6Vw7Pi4uY73k54': salesforceRecord.PathOnClient ,// singleLineText
'flddemB9k9saRQK0N': salesforceRecord.Id ,// singleLineText
'fldjpMDiVUHclquUQ': salesforceRecord.TextPreview ,// multilineText
'fldMyGwRc1pnLVRo4': salesforceRecord.Title ,// singleLineText
'fldrnvtIhgxKwFdGh': salesforceRecord.VersionData ,// multipleAttachments
'fldZwGMA52MI1iduF': salesforceRecord.VersionDataUrl ,// url
'flddP5OB5dW5KzuT3': salesforceRecord.VersionNumber ,// number
        }
      }
      exports.contentversionMapper = mapSFContentVersionToAirtableContentVersion;