function mapSFContentDocumentLinkToAirtableContentDocumentLink(salesforceRecord) {
        return {
          'fld6sGApfraWdU4pF': salesforceRecord.ContentDocumentId ,// singleLineText
'fldefoSvmxfToBqrn': salesforceRecord.IsDeleted ,// checkbox
'fldM46NJWdSnj3IPD': salesforceRecord.LinkedEntityId ,// singleLineText
'fldWAmX8izEqkEUWL': salesforceRecord.LinkedEntityType ,// singleLineText
'fldQIzxwvZqldge0T': salesforceRecord.Id ,// singleLineText
        }
      }
      exports.contentdocumentlinkMapper = mapSFContentDocumentLinkToAirtableContentDocumentLink;