function mapSFContentDocumentToAirtableContentDocument(salesforceRecord) {
        return {
          'fld2uJi0zFBy4D9kz': salesforceRecord.ContentSize ,// number
'fld9sYECScrsiMHs7': salesforceRecord.Description ,// multilineText
'fldDFYyXTHX49tDE6': salesforceRecord.FileExtension ,// singleLineText
'fldlUJS3OzQXB615g': salesforceRecord.FileType ,// singleLineText
'flds5WWIJSPwtcxAU': salesforceRecord.LatestPublishedVersionId ,// singleLineText
'flduu7Law2tq0MtD2': salesforceRecord.Id ,// singleLineText
'fld793nf9W5Du9cCP': salesforceRecord.Title ,// singleLineText
        }
      }
      exports.contentdocumentMapper = mapSFContentDocumentToAirtableContentDocument;