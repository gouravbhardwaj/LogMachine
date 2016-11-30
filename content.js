//console.log(isEnvironmentSandbox());//Check if Environment is Production or Sandbox

//1. Calling the function to filters the Debug Summary page in Salesforce.
if(window.location.pathname=='/setup/ui/listApexTraces.apexp'){
	formatDebugSummaryLog();
}
else
//2. Calling the function to format the Debug Details page in Salesforce.
if(window.location.pathname=='/p/setup/layout/ApexDebugLogDetailEdit/d'){
	formatDebugDetailsLog();
}
else

//3. Calling the function to format the Class code where error has occured.
if(window.location.href=='https://crontec-dev-ed.my.salesforce.com/01p90000006ymRmAAI'){
	//formatApexClass();
}

//formatApexClass();






 

 
