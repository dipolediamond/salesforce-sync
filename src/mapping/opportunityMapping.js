function mapSFOpportunityToAirtableOpportunity(salesforceRecord) {
        return {
          'fldx11KWXUzdN7hrb': salesforceRecord.of_States__c ,// number
'fld93VpLklaRfVzWf': salesforceRecord.X401_k__c ,// singleSelect
'fldh04WLDo1Lkxlde': salesforceRecord.AccountId ,// singleLineText
'fldJDCE1juV1a8Vll': salesforceRecord.Amount ,// singleLineText
'fldOS9H4W72HZ3UdC': salesforceRecord.Annual_Revenue__c ,// currency
'fld473JAPLAhmjmQe': salesforceRecord.Annualized_Admin__c ,// currency
'fldQWOVVVtrhDFbuB': salesforceRecord.Any_Lifting_Exposure__c ,// singleSelect
'fldKtsdI1PrtnZkbl': salesforceRecord.Any_work_above_15_feet__c ,// singleSelect
'fldcB7n1GFR4wz2lN': salesforceRecord.Are_Machines_Operated__c ,// singleSelect
'fldWcJNWTvFbK2fAe': salesforceRecord.Are_Subcontractor_Labor__c ,// singleSelect
'fldJLG0erjTaDUWK2': salesforceRecord.Benefit__c ,// singleSelect
'fld3EFwC0LEaPQrIf': salesforceRecord.Best_Chance__c ,// checkbox
'fldkqmbkYgCxY26HK': salesforceRecord.Budget_Confirmed__c ,// checkbox
'fldvVmtBYPqS5oMXy': salesforceRecord.CampaignId ,// singleLineText
'fldxRpOhE9iq5tF32': salesforceRecord.Clock_Own_Rent__c ,// singleSelect
'fldMPlRYI09KuFfmt': salesforceRecord.Clock_s_Type__c ,// singleSelect
'fldQpmp3XsWN4fBP1': salesforceRecord.Closed_Detail__c ,// multilineText
'fldvwPjPsGxbOkRBr': salesforceRecord.Closed_Lost_Reason__c ,// singleSelect
'fldn9JTzOzyqR7bjC': salesforceRecord.CloseDate ,// singleLineText
'fldnhsqmx3DohcU9z': salesforceRecord.Contract_Sub_Type__c.split(';') ,// multipleSelects
'fldOnH7NJP3cLdAqE': salesforceRecord.Contract_Type__c ,// singleSelect
'fld2bd4CcAPRrmAiT': salesforceRecord.ContractId ,// singleLineText
'fld02FaJjUsPePDl8': salesforceRecord.CPAContactName__c ,// singleLineText
'flduNM1bhgW2270Og': salesforceRecord.CPAEmailAddress__c ,// email
'fld0fffhJcLLYd1nn': salesforceRecord.CPAName__c ,// singleLineText
'fldAvvSFoJiIIo3PB': salesforceRecord.CPAPhoneNumber__c ,// phoneNumber
'fldcrQPL2ejmBIJny': salesforceRecord.Current_Payroll_Provider__c ,// singleLineText
'fldIhtpRItANSep3f': salesforceRecord.Deep_Dive_Demo_Completed_By__c ,// singleSelect
'fld1T4iH1s0J0oKZs': salesforceRecord.Deep_Dive_Demo_Shown_By_Other__c ,// singleLineText
'fldF8EeazwltJ8qU0': salesforceRecord.Deep_Dive_Demo_Shown__c ,// singleSelect
'fldtP8O23SW1Yn0hX': salesforceRecord.Description ,// singleLineText
'fldogfwRszpWqakdD': salesforceRecord.Discovery_Completed__c ,// checkbox
'fldEhq6IESY8h3jjE': salesforceRecord.Effective_Date__c ,// date
'fldUsT8jZuQR6ZH9D': salesforceRecord.EIN__c ,// singleLineText
'fldjJBHyykWSDV3li': salesforceRecord.Employees__c ,// number
'fldb9hNnpneWVmtdV': salesforceRecord.Employee_Count_for_Oppty__c ,// number
'fldCEBplWQnvAo66l': salesforceRecord.Estimated_Start_Month__c ,// singleSelect
'fldYYDGdS05tdDFOh': salesforceRecord.ExpectedRevenue ,// singleLineText
'fldEj47M4Zwlh7spC': salesforceRecord.First_Check_Date__c ,// date
'fld23F4KVP2MHWQvH': salesforceRecord.HealthAgencyName__c ,// singleLineText
'fldyN2JkxluHIiRje': salesforceRecord.HealthContactName__c ,// singleLineText
'fldVpzxRP5PamBwhI': salesforceRecord.HealthEmailAddress__c ,// email
'fldDoijWycZy5IQuw': salesforceRecord.Health_Exp_Date__c ,// date
'fld0beyre9Hn8scy3': salesforceRecord.HealthPhoneNumber__c ,// phoneNumber
'fldsLs4WSyhrUrqnM': salesforceRecord.How_many_Payroll_Cycles__c ,// singleSelect
'fld7ZuApouNsBLMEy': salesforceRecord.Identify_Other_or_Name_of_Source__c ,// singleLineText
'fldGUS5mUx0ebVXa7': salesforceRecord.If_so_Guards_in_Place__c ,// singleSelect
'fld8wSA2u6xTgg3Aw': salesforceRecord.If_Won_Check_Date__c ,// date
'fldvF6CXwVeWA4K67': salesforceRecord.If_yes_max_weight_lifted__c ,// number
'fld5T3BWxLmLfVAu3': salesforceRecord.IqScore ,// singleLineText
'fldbOJolKY9JZeOTZ': salesforceRecord.IsPrivate ,// singleLineText
'fldpuaGRHKPM3J8xL': salesforceRecord.LeadSource ,// singleSelect
'fldUoP328uSLjtDWO': salesforceRecord.Legal__c ,// singleSelect
'fldZ3L5eWTlYm0vXA': salesforceRecord.Loss_Reason__c ,// singleSelect
'fldCwmFjD3wGybQKL': salesforceRecord.Monthly_Revenue__c ,// number
'fldtXat1fXdbsPEoX': salesforceRecord.Name ,// singleLineText
'fld1w9SoWKrbtrMcK': salesforceRecord.Names_of_State_s__c.split(';') ,// multipleSelects
'fld8HjVUbGRXtzUWo': salesforceRecord.NextStep ,// singleLineText
'fldmbXipTokROKv8O': salesforceRecord.No_of_Employees_Pay_Cycle_1__c ,// number
'fldhOHOoItmEp0MLt': salesforceRecord.No_of_Employees_Pay_Cycle_2__c ,// number
'fldHXz5T8CeQCfpoP': salesforceRecord.Number_of_Clocks__c ,// number
'fldMd6G8ut9dBP8Pw': salesforceRecord.Oppty_Name_Formula__c ,// singleLineText
'fldPnAsLyn2Dm7ocE': salesforceRecord.Other_Lead_Source__c ,// singleLineText
'fldE4ssXyznlLo4AZ': salesforceRecord.Other_Company_Name__c ,// singleLineText
'fldmTpl9kjGJvFWBX': salesforceRecord.Other_Contact_Name__c ,// singleLineText
'fldnF6IlHM4xXQZWf': salesforceRecord.Other_Email_Address__c ,// email
'fldAeOmnbykgqBbXl': salesforceRecord.Other_Phone_Number__c ,// phoneNumber
'fldeM811QPq9ZeIzZ': salesforceRecord.Out_of_State_Travel__c ,// singleSelect
'fldcv2S5N449GOdmk': salesforceRecord.OwnerId ,// singleLineText
'fldnz5SVJm59RTuKs': salesforceRecord.P_C_Agency_Name__c ,// singleLineText
'fldR1uJ5olMpX1qQn': salesforceRecord.P_C_Contact_Name__c ,// singleLineText
'fld3ZsVBipjevlSG2': salesforceRecord.P_C_Email_Address__c ,// email
'fldUuKA3e8lkajMq5': salesforceRecord.P_C_Phone_Number__c ,// phoneNumber
'fldxJwUFd8mZhFl9U': salesforceRecord.Pay_Cycle_1__c ,// singleSelect
'fldqLO4pRa1zWpeS5': salesforceRecord.Pay_Cycle_2__c ,// singleSelect
'fldz6rV1vHFoopDfx': salesforceRecord.PEPY__c ,// currency
'fldtCyzB0HLjE7DOr': salesforceRecord.Pricebook2Id ,// singleLineText
'fldDouRWRAYS2M8cp': salesforceRecord.Probability ,// singleLineText
'fldrT0TCiqKUYlIIb': salesforceRecord.Propel_Annual_Revenue__c ,// currency
'fld0YPhktQrnzg9xp': salesforceRecord.Proposal_Contract_Uploaded__c ,// checkbox
'fldeDfuLR3l56PBgf': salesforceRecord.Ready_for_Implementation__c ,// checkbox
'fld0z7dpAsQ7JvQLQ': salesforceRecord.RevenuePerEmployeePerMonth__c ,// currency
'fldgepoaH3GTGRBRO': salesforceRecord.RevenuePerEmployeePerYear__c ,// currency
'fldgzUlrQRGgH1cdm': salesforceRecord.ROI_Analysis_Completed__c ,// checkbox
'fldQK1Onvyy3OzOU0': salesforceRecord.Sales_Demo_Shown__c ,// singleSelect
'fldDfVoxLwK50sydS': salesforceRecord.Id ,// singleLineText
'fld17Tz6k8C1j8Wnh': salesforceRecord.Services__c.split(';') ,// multipleSelects
'fld7nGQpiA6R83OUi': salesforceRecord.Setup_Fee__c ,// currency
'fldcElsezY4EnnrkH': salesforceRecord.StageName ,// singleSelect
'fld5uomGHlRRpDgaF': salesforceRecord.Start_Date__c ,// date
'fld7gHfqOvXoFaSIl': salesforceRecord.Startup_Business__c ,// singleSelect
'fldBpwjhSWXjkQIJG': salesforceRecord.SUTA_old__c ,// singleLineText
'fldyttYMzYhYyR4UC': salesforceRecord.SyncedQuoteId ,// singleLineText
'fldWudDJuRqSvmPJV': salesforceRecord.System_sent_task_to_Proposal_Team__c ,// checkbox
'fld3m2lzmsfHeDQdK': salesforceRecord.TotalOpportunityQuantity ,// singleLineText
'fldI7i5HhPW2zQSOw': salesforceRecord.pandadoc__TrackingNumber__c ,// singleLineText
'fldosQ7ZMQNwktFVg': salesforceRecord.Type ,// singleSelect
'flde0kcYk31ocqGOu': salesforceRecord.WC__c ,// singleSelect
'fldvedBKubglRJ5yk': salesforceRecord.WC_Exp_Date__c ,// date
'fldM5L5yr55cGG3ze': salesforceRecord.Workers_Comp_Deductible__c ,// currency
'fldk365P7j1cj7mUn': salesforceRecord.Workers_Comp_Code__c ,// singleLineText
'fldnzrE8hHpq2bsKp': salesforceRecord.Workers_Comp_State__c.split(';') ,// multipleSelects
'fldKdXpMdUrfQ2JfT': salesforceRecord.Workers_Comp_Wages__c ,// currency
        }
      }
      exports.opportunityMapper = mapSFOpportunityToAirtableOpportunity;