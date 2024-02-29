function mapSFCaseToAirtableCase(salesforceRecord) {
        return {
          'fldUQszgEV1L8bFIX': salesforceRecord.AccountId ,// singleLineText
'fldh2FB8pXsncPUYm': salesforceRecord.AssetId ,// singleLineText
'fldxB3Tek64vPf8xJ': salesforceRecord.BusinessHoursId ,// singleLineText
'fldyHn26qb6M0p607': salesforceRecord.ClosedDate ,// singleLineText
'fldc8L3Z7FVxTxDd8': salesforceRecord.Comments ,// singleLineText
'fldY0eOCah9LVF92c': salesforceRecord.ContactEmail ,// singleLineText
'fldewvchFmxHTklTx': salesforceRecord.ContactFax ,// singleLineText
'fldQQJMg5P42Kxa9A': salesforceRecord.ContactId ,// singleLineText
'fldQAC8E7fnBfzoOx': salesforceRecord.ContactMobile ,// singleLineText
'fld7TV5dCeAmzzDCs': salesforceRecord.ContactPhone ,// singleLineText
'fldi31SgprgTBnoyY': salesforceRecord.Department__c ,// singleSelect
'fldAFTI1LLg1SUkcw': salesforceRecord.Description ,// singleLineText
'fld8vlHYLTU89xfl6': salesforceRecord.EntitlementId ,// singleLineText
'fldM16PRiDOZJJsJQ': salesforceRecord.IsClosedOnCreate ,// singleLineText
'fldz2gZHq371IncFr': salesforceRecord.IsEscalated ,// singleLineText
'fldQRNt8qEnU723vr': salesforceRecord.IsStopped ,// singleLineText
'fldMKAT8eo2YK0Obm': salesforceRecord.Language ,// singleLineText
'fld1SqbnW6PFqJBRO': salesforceRecord.MilestoneStatus ,// singleLineText
'fldooGSTodjfKTrNK': salesforceRecord.MilestoneStatusIcon ,// singleLineText
'fld8vCx52a6C9XHJA': salesforceRecord.Opportunity__c ,// singleLineText
'fldtBZUp4BIHXhKDA': salesforceRecord.Origin ,// singleSelect
'fldeJgwXTkI5Y4ocK': salesforceRecord.Other_Case_Type__c ,// singleLineText
'fldeoLiBJurH6haR0': salesforceRecord.OwnerId ,// singleLineText
'fldNgSEcqQni1TgdU': salesforceRecord.ParentId ,// singleLineText
'fldLTLZF2bp9pfQo8': salesforceRecord.Pending_On__c ,// singleSelect
'fldBXjCRxe7kxIIm5': salesforceRecord.Priority ,// singleSelect
'fldqgQbYqm5AfuhBF': salesforceRecord.Private_Case_Description__c ,// multilineText
'fldpER6vOgsPKkV15': salesforceRecord.ProductId ,// singleLineText
'flduRhUNMl6YNF4nL': salesforceRecord.Reason ,// singleSelect
'fldM63KBXnAC42XDO': salesforceRecord.Reported_By__c ,// singleLineText
'fldJs73RRSBM1NsHb': salesforceRecord.Reported_By_Email__c ,// email
'fldiQHrH8YHhAadVr': salesforceRecord.Reported_By_Phone__c ,// phoneNumber
'fldzaRA2a9zMsdZJi': salesforceRecord.Reported_By_Title__c ,// singleLineText
'fld7PWz4wBZrb8Xsk': salesforceRecord.Id ,// singleLineText
'fldRKuSSooUF1QPsn': salesforceRecord.Send_to_Manager__c.split(';') ,// multipleSelects
'flduhAcIliQ9YtM52': salesforceRecord.ServiceContractId ,// singleLineText
'fldJucYFbGspNCpDD': salesforceRecord.SlaExitDate ,// singleLineText
'flddF6jyFqoGJdBBw': salesforceRecord.SlaStartDate ,// singleLineText
'fldOs4uoPdgme7Ent': salesforceRecord.SourceId ,// singleLineText
'fldh4ekbbOflYeRvs': salesforceRecord.Status ,// singleSelect
'fld1gyoqxWSiNWBBX': salesforceRecord.StopStartDate ,// singleLineText
'fld2hIATOfWYGAtRc': salesforceRecord.Subject ,// singleLineText
'fldrD4wAprSZNHo7B': salesforceRecord.SuppliedCompany ,// singleLineText
'fldwUWHYFYOt35dhA': salesforceRecord.SuppliedEmail ,// singleLineText
'fldzAzjbN4dNmco33': salesforceRecord.SuppliedName ,// singleLineText
'fldl9TPuC2t2mqokX': salesforceRecord.SuppliedPhone ,// singleLineText
'fldh87fwtLMkOdxHM': salesforceRecord.Type ,// singleSelect
'fld3tlblZDHIkRlkb': salesforceRecord.Type_of_Request__c.split(';') ,// multipleSelects
        }
      }
      exports.caseMapper = mapSFCaseToAirtableCase;