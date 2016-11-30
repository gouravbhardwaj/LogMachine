//Global Variables
var resourceLink = 'chrome-extension://ddjcjpbcpjmkogoemogijmgnfcolniod';

function formatDebugSummaryLog(){
console.log('### Entering');

if(window.location.pathname=='/setup/ui/listApexTraces.apexp'){
var firstHref = $("#Apex_Trace_List.traceForm.traceTable.thetracetable.tb");
//https://robots.thoughtbot.com/how-to-make-a-chrome-extension  background-color: rgb(223, 255, 235);
var myElement = document.getElementById("Apex_Trace_List:traceForm:traceTable:thetracetable:tb");

for(var i = 0; i < myElement.rows.length; i++){
	
	
	var rowActions = document.getElementById('Apex_Trace_List:traceForm:traceTable:thetracetable:'+i+':rowActions');	
	
	
	
	/*
	rowActions.children[0].innerHTML = '<img width= "19px" title="View" src="'+resourceLink+'/images/View.png"/>';
	*/
	
	//chrome.extension.getURL('/images/delete.png')
	
	rowActions.children[0].innerHTML = '<img width= "19px" title="View" src='+chrome.extension.getURL('/images/View.png')+'>';
	rowActions.children[1].innerHTML = '<img width= "19px" title="Download" src='+chrome.extension.getURL('/images/download.png')+'>';
	rowActions.children[2].innerHTML = '<img width= "19px" title="Delete" src='+chrome.extension.getURL('/images/delete.png')+'>';
	
	
	
	
var statusColumn = document.getElementById('Apex_Trace_List:traceForm:traceTable:thetracetable:'+i+':status');
	if(statusColumn.innerHTML == 'Success'){
	 
	 statusColumn.parentElement.style.backgroundColor = "rgb(223, 255, 235)";
	 statusColumn.innerHTML = '<img title="'+statusColumn.innerHTML+'" src="'+chrome.extension.getURL('/images/success.png')+'" width="30px">';
	 
	 }else{
	 statusColumn.parentElement.style.backgroundColor = "rgb(255, 223, 223)";
	 statusColumn.innerHTML = '<img title="'+statusColumn.innerHTML+'" src="'+chrome.extension.getURL('/images/error.png')+'" width="30px">';
	 }
	 
	 
	 
}
}

}