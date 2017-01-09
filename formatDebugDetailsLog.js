function formatDebugDetailsLog(){
//Below code for Debug Log Details page.
if(window.location.pathname=='/p/setup/layout/ApexDebugLogDetailEdit/d'){
var searchHelpUrl = 'https://developer.salesforce.com/search?q=';

var myCodeBlock = document.getElementsByClassName("codeBlock");
//myCodeBlock[0].setAttribute("style","background-color: #41404e;color: white;");
myCodeBlock[0].setAttribute("style","background-color:"+FormatterClass.globalStyle.Background_Color+";color:"+FormatterClass.globalStyle.Font_Color+";");

//console.log(myCodeBlock);
var arrayOfCodeLines = myCodeBlock[0].innerHTML.split( "\n" );

var formattedCodeBlock = '';
formattedCodeBlock += FormatterClass.getColorIndex();

var error=false;
var logNode='';
for(i=0;i<arrayOfCodeLines.length;i++){
//console.log(arrayOfCodeLines[i]);
	
elementValue = arrayOfCodeLines[i];

//Error block	
if(elementValue.indexOf('FATAL_ERROR')>0){
	    var errorString =  elementValue.substring(elementValue.lastIndexOf(':')+1,elementValue.length);
	
	    //console.log('### ::: '+errorString);
	
		formattedCodeBlock += '<div style="background-color: rgb(242, 156, 156);color: rgb(161, 34, 34);font-weight: 900;font-size:14px">'+elementValue+
		
		'<span style="margin-left: 10px;"><a href="'+searchHelpUrl+errorString+'" target="_blank"><img src="'+chrome.extension.getURL('/images/help.png')+'" width="14px"></a></span>'
		'</div>';
		 
		error=true;
		
		logNode = 'error';
	}
	
//Line of code where error has occured ???
else if(error==true && elementValue.indexOf('Class.')>=0){
	
	response = elementValue.substring(elementValue.indexOf('Class.crontec.')+'Class.crontec.'.length, elementValue.indexOf(': line'));
	
	className = response.substring(0,response.indexOf('.'));
	
	lineNumber = elementValue.substring(elementValue.indexOf(': line')+': line'.length,elementValue.indexOf(','));
	
	/*
    Check if the org has namespace enabled, if yes then takes the name space and then take the class,
    else take the class without name space.
    
	getSFDCIdForTheComponent(className,lineNumber); Getting the class name and opening in a new tab

	*/
	
	formattedCodeBlock += '<div  style="background-color: rgb(242, 156, 156);color: rgb(161, 34, 34);font-weight: 900;">'+elementValue
	+
	
	'</div>';
	logNode = 'error';
}


//Variable Assignment block
else if(elementValue.indexOf('VARIABLE_ASSIGNMENT')>0 ){
	
	formattedCodeBlock += FormatterClass.getFormattedElement(elementValue,'VARIABLE_ASSIGNMENT');  //T01

	logNode = 'variableAssignment';
}

//Callout block
else if(elementValue.indexOf('CALLOUT_REQUEST')>0 || elementValue.indexOf('CALLOUT_RESPONSE')>0){
	
    formattedCodeBlock += FormatterClass.getFormattedElement(elementValue,'CALLOUT_REQUEST');

	logNode = 'callOut';
}

//validation block
else if(elementValue.indexOf('|CODE_UNIT_STARTED|[EXTERNAL]|Validation')>0 || elementValue.indexOf('|CODE_UNIT_FINISHED|Validation')>0 || elementValue.indexOf('VALIDATION_')>0){
	
	formattedCodeBlock += FormatterClass.getFormattedElement(elementValue,'VALIDATION_RULE');

	error=false;
	logNode = 'validation';
}	
	
//Workflow block	
else if(elementValue.indexOf('CODE_UNIT_STARTED|[EXTERNAL]|Workflow')>0 || elementValue.indexOf('CODE_UNIT_FINISHED|Workflow')>0 || elementValue.indexOf('|WF_')>0){
	
	formattedCodeBlock += FormatterClass.getFormattedElement(elementValue,'WORKFLOW');

	error=false;
	logNode = 'workflow';
	
	if(elementValue.indexOf('CODE_UNIT_FINISHED|Workflow')>0){
		logNode = 'none';
	}
}

//Code Unit block
else if(elementValue.indexOf('CODE_UNIT_STARTED')>0 || elementValue.indexOf('CODE_UNIT_FINISHED')>0){

	formattedCodeBlock += FormatterClass.getFormattedElement(elementValue,'CODE_UNIT_STARTED');
	
	logNode = 'codeUnitStarted';
}


//Method Entry block	
else if(elementValue.indexOf('|METHOD_ENTRY')>=0 || elementValue.indexOf('|METHOD_EXIT')>=0){

	formattedCodeBlock += FormatterClass.getFormattedElement(elementValue,'METHOD_ENTRY');

	logNode = 'methodEntry';
}	
	
//Cumulative Usage block	
else if(elementValue.indexOf('CUMULATIVE_LIMIT_USAGE')>0 || elementValue.indexOf('CUMULATIVE_LIMIT_USAGE_END')>0){

	formattedCodeBlock += FormatterClass.getFormattedElement(elementValue,'CUMULATIVE_LIMIT_USAGE');

	error=false;
	logNode = 'cumulativeUsage';
	
	if(elementValue.indexOf('CUMULATIVE_LIMIT_USAGE_END')>0){
		logNode = 'none';
	}
}	

	
//User Debug block	
else if(elementValue.indexOf('USER_DEBUG')>0)
{
console.log('USER_DEBUG');
	formattedCodeBlock += FormatterClass.getFormattedElement(elementValue,'USER_DEBUG');

	error=false;
	logNode = 'userDebug';
	
	
}	

else{
	if(logNode=='cumulativeUsage'){
	//formattedCodeBlock += '<div style="font-weight: 700;color: #31708f;background-color: #d9edf7;">'+elementValue+'</div>';
	formattedCodeBlock += FormatterClass.getFormattedElement(elementValue,'CUMULATIVE_LIMIT_USAGE');
	}
	
	else{
	formattedCodeBlock += '<div>'+elementValue+'</div>';
	//formattedCodeBlock += FormatterClass.getFormattedElement(elementValue,'DEFAULT');
	}
	
	if(elementValue!=""){
	error=false;	
	}
	
	}
}
	myCodeBlock[0].innerHTML = formattedCodeBlock;
}

}