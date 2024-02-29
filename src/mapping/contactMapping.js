function mapSFContactToAirtableContact(salesforceRecord) {
        return {
          'fldh6jLPtCGTAZIDZ': salesforceRecord.AccountId ,// multipleRecordLinks
'fld6VCO8U29Q3zN5Y': salesforceRecord.AssistantName ,// singleLineText
'fldWuM0MajVEl0VV2': salesforceRecord.AssistantPhone ,// singleLineText
'flddF0qjZljO9ZuYK': salesforceRecord.Birthdate ,// singleLineText
'fldv3z6dq9awigaWS': salesforceRecord.Cell_Phone__c ,// phoneNumber
'fld2MgetVReNSCBZG': salesforceRecord.Company_Name_IF_Any__c ,// singleLineText
'fldCp8FWgEskhTzgb': salesforceRecord.Company_Phone__c ,// phoneNumber
'fldK8EwzsPrbQ8DXv': salesforceRecord.Contact_Role__c.split(';') ,// multipleSelects
'fldvZfApU2TvJGYN5': salesforceRecord.Contact_Type__c ,// singleSelect
'fldJchvfsPFeDH6c7': salesforceRecord.CPAContactName__c ,// singleLineText
'fldCOvyl1ZmNgnbxv': salesforceRecord.CPAEmailAddress__c ,// email
'flduHDTIcNJ6d1ZSl': salesforceRecord.CPAName__c ,// singleLineText
'fldUgDd1NsCh9vHdl': salesforceRecord.CPAPhoneNumber__c ,// phoneNumber
'fldJHavCPPSUZzvGr': salesforceRecord.Department ,// singleLineText
'fld6Q9XlKdCw5tr0K': salesforceRecord.Description ,// singleLineText
'fldVu5DPqIjRLF9at': salesforceRecord.DoNotCall ,// singleLineText
'fldVl3cx5q9UJlyFW': salesforceRecord.Email ,// singleLineText
'fldxOOKA282XIX4c7': salesforceRecord.Fax ,// singleLineText
'fldontFecwmhL17AH': salesforceRecord.FirstName ,// singleLineText
'fldVEcZ7t2OgeVXKO': salesforceRecord.GenderIdentity ,// singleSelect
'fldyURSh2hmrr6T9k': salesforceRecord.Gift__c ,// checkbox
'fldvDPyHvIHWPh5bx': salesforceRecord.HasOptedOutOfEmail ,// singleLineText
'fldIjLEyDcMFaWTAs': salesforceRecord.HasOptedOutOfFax ,// singleLineText
'fldd5Ud12LNL14B9m': salesforceRecord.HealthAgencyName__c ,// singleLineText
'fld5X1U7EZJR3OrXb': salesforceRecord.HealthContactName__c ,// singleLineText
'fldDg60hC4Vv7D272': salesforceRecord.HealthEmailAddress__c ,// email
'fld7YCcbLLe1NJAPw': salesforceRecord.HealthPhoneNumber__c ,// phoneNumber
'fldgo7yNv7px9ISjj': salesforceRecord.HomePhone ,// singleLineText
'fldbSfZiP9ru7Gkqa': salesforceRecord.IndividualId ,// singleLineText
'fldlSYFEyJxu2vAAW': salesforceRecord.Jigsaw ,// singleLineText
'fldArgbebJMMf9ogH': salesforceRecord.LastCURequestDate ,// singleLineText
'fld95FaL46gbF7dV6': salesforceRecord.LastCUUpdateDate ,// singleLineText
'fldCLp5I9sHNrwohV': salesforceRecord.LastName ,// singleLineText
'fldXA0W8nR4fF0EUb': salesforceRecord.LeadSource ,// singleSelect
'fldfwZAoYOqicJscF': salesforceRecord.MailingCity ,// singleLineText
'fldARihiyHmaQ6WvP': salesforceRecord.MailingCountry ,// singleLineText
'fld2OvvYT6eKMRTni': salesforceRecord.MailingLatitude ,// singleLineText
'fldduWnpyXw3Mi0Ym': salesforceRecord.MailingLongitude ,// singleLineText
'fldsqHQ8QksLWM21X': salesforceRecord.MailingPostalCode ,// singleLineText
'fldoGrYM5lYwwepjN': salesforceRecord.MailingState ,// singleLineText
'fldbJcCUW9RnlYgWC': salesforceRecord.MailingStreet ,// singleLineText
'fld9fC1grbPtnlUrQ': salesforceRecord.MobilePhone ,// singleLineText
'fldA8RtI0PqpfQhhY': salesforceRecord.Other_Company_Name__c ,// singleLineText
'fld19vZtmyoXftcQH': salesforceRecord.Other_Contact_Name__c ,// singleLineText
'flddYmei0nhvMQDsb': salesforceRecord.Other_Email_Address__c ,// email
'fldqEGFWlRcYkpgbr': salesforceRecord.Other_Phone_Number__c ,// phoneNumber
'fldXhgDRHaO2lzEyf': salesforceRecord.OtherCity ,// singleLineText
'fldmvRrFRMPMqu9Ra': salesforceRecord.OtherCountry ,// singleLineText
'fld3DayWhci9Wvovq': salesforceRecord.OtherLatitude ,// singleLineText
'fld7cSzgfuBLMTQfJ': salesforceRecord.OtherLongitude ,// singleLineText
'fld1O1178YRe0ONgC': salesforceRecord.OtherPhone ,// singleLineText
'fld5Eke85QSpKWdsP': salesforceRecord.OtherPostalCode ,// singleLineText
'fld53wLwbAzMMtAOc': salesforceRecord.OtherState ,// singleLineText
'fldrn9T3t9bpoZAQq': salesforceRecord.OtherStreet ,// singleLineText
'fldcGiJ1IorrGYzbM': salesforceRecord.OwnerId ,// singleLineText
'fldfUrWoqahnVWxAp': salesforceRecord.Ownership__c ,// percent
'fldE7xNznPSDX0kA0': salesforceRecord.P_C_Agency_Name__c ,// singleLineText
'fldkmfu854xEuDUaG': salesforceRecord.P_C_Contact_Name__c ,// singleLineText
'fldnMZMS5kGaGK98u': salesforceRecord.P_C_Email_Address__c ,// email
'fldU17zPvdWE5T1A2': salesforceRecord.P_C_Phone_Number__c ,// phoneNumber
'fldTkYdWGAVNXpIvC': salesforceRecord.Phone ,// singleLineText
'fldY1QvVSfDVZOqWV': salesforceRecord.Pronouns ,// singleSelect
'fld1uC5Fcog1cWffE': salesforceRecord.ReportsToId ,// singleLineText
'fldjiSQYgrsigtJVp': salesforceRecord.Id ,// singleLineText
'fldnQrrgdpsB2mx5y': salesforceRecord.Salutation ,// singleLineText
'fldDVjYqIMR1SvaaP': salesforceRecord.Status__c ,// singleSelect
'fldR0PsTJP0wWfhIX': salesforceRecord.Title ,// singleLineText
'fldN40M8j2tkDoYlK': salesforceRecord.Type_of_Service_Partner__c ,// singleSelect
'fldVXVfNsjMmuIaQq': salesforceRecord.Web_Address__c ,// url
        }
      }
      exports.contactMapper = mapSFContactToAirtableContact;