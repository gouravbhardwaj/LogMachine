function formatDebugDetailsLog(){
//Below code for Debug Log Details page.
if(window.location.pathname=='/p/setup/layout/ApexDebugLogDetailEdit/d'){


var methodEntryString = new Array()   //T01

//var searchHelpUrl = 'https://developer.salesforce.com/search?q=';

var searchHelpUrl = 'https://www.google.com/search?q=';

var myCodeBlock = document.getElementsByClassName("codeBlock");
//myCodeBlock[0].setAttribute("style","background-color: #41404e;color: white;");
myCodeBlock[0].setAttribute("style","padding-left: 10px;padding-top: 5px;background-color:"+FormatterClass.globalStyle.Background_Color+";color:"+FormatterClass.globalStyle.Font_Color+";");

//console.log(myCodeBlock);
var arrayOfCodeLines = myCodeBlock[0].innerHTML.split( "\n" );

var formattedCodeBlock = '';

//Code to get the Color Index in the LogDetails Page.
formattedCodeBlock += FormatterClass.getColorIndex();

var error=false;
var logNode='';


for(i=0;i<arrayOfCodeLines.length;i++){
//console.log(arrayOfCodeLines[i]);
	
elementValue = arrayOfCodeLines[i];

//Error block	
if(elementValue.indexOf('FATAL_ERROR')>0){
	    var errorString =  elementValue.substring(elementValue.lastIndexOf('Exception:')+10,elementValue.length);
	
	    //console.log('### ::: '+errorString);
	
		formattedCodeBlock += '<div class="logContentBlock errorBlock" style="background-color: rgb(242, 156, 156);color: rgb(161, 34, 34);font-weight: 900;font-size:14px">'+elementValue+
		
		'<span style="margin-left: 10px;"><a href="'+searchHelpUrl+errorString+' salesforce" target="_blank"><img src="'+chrome.extension.getURL('/images/help.png')+'" width="14px"></a></span>'+
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
	
	formattedCodeBlock += '<div class="logContentBlock errorBlock"  style="background-color: rgb(242, 156, 156);color: rgb(161, 34, 34);font-weight: 900;font-size:14px">'+elementValue
	+
	
	'</div>';
	logNode = 'error';
}


//Variable Assignment block
else if(elementValue.indexOf('VARIABLE_ASSIGNMENT')>0 ){
	
	formattedCodeBlock += FormatterClass.getFormattedElement(elementValue,'VARIABLE_ASSIGNMENT');  

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

   // ApexClassHandler.addClassName(ApexClassHandler.getClassName(elementValue)); //T01
   if(elementValue.indexOf('|METHOD_ENTRY')>=0 && elementValue.indexOf('|System')<0){
		ApexClassHandler.methodEntryString.push(elementValue); //T01

		formattedCodeBlock += FormatterClass.getFormattedElement(elementValue,'METHOD_ENTRY');
   }else if(elementValue.indexOf('|System')<0){

       formattedCodeBlock += FormatterClass.getFormattedElement(elementValue,'METHOD_EXIT');
   }
    
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
//console.log('USER_DEBUG');
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
	formattedCodeBlock += '<div class="logContentBlock DEFAULT">'+elementValue+'</div>';
	//formattedCodeBlock += FormatterClass.getFormattedElement(elementValue,'DEFAULT');
	}
	
	if(elementValue!=""){
	error=false;	
	}
	
	}
}//For Ends Here
  
	myCodeBlock[0].innerHTML = formattedCodeBlock;

   /*@Description : 
   1. Logic to get the list of all the Method Entry Lines and then filter them out to get the actual class name, by removing the namespace
   2. Query Apex Class to get the id for those class names and assign the ids to the DOU element.
   */

 /*  console.log(ApexClassHandler.methodEntryString); Assign the ids of the CodeUnit Started to the below elements */

   var elements =  document.getElementsByClassName('codeUnitStartedClass');
   for(var j=0;j<elements.length;j++){
			elements[j].setAttribute("href","/"+FormatterClass.codeUnitComponentId);
   	}
   	
   ApexClassHandler.retrieveNameSpaces(); //T01 




//Event Handlers ===============
assignEventHandlers();

}

}


//Event Handlers ===============//
var assignEventHandlers = function(){

	//1 Color Index Div float when screen scrolled down to make it further visible.
	var colorIndexElement = document.getElementById("colorIndex");
	

	   window.addEventListener("scroll", function(){
	     contextIndex = document.getElementById('popOutIndex');


	     if(window.pageYOffset > 560){
               
		      colorIndexElement.style.position='fixed';
		      colorIndexElement.style.left='23px';
		      colorIndexElement.style.opacity='.92';
		     
		      contextIndex.setAttribute('data-state','popOut');
			  contextIndex.style.display = 'block';
		 }else{
		      colorIndexElement.style.position='inherit';
		      colorIndexElement.style.left='93px';
		      
              contextIndex.setAttribute('data-state','popIn');
              contextIndex.style.display = 'none';
		 }

	});	
	//1 Ends


	//2
	var clickedClass;
	var checkIndex = document.getElementsByClassName('checkIndex');
     
	   for (var i = 0; i < checkIndex.length; i++) {
			checkIndex[i].addEventListener("click", function(){
			  

			    clickedClass = this.attributes[1].value.split(' ')[1];
				//console.log('clicked component : '+clickedClass);


                //New Code
				if(clickedClass=='TOGGLEALL'){
					    toCheck = false;
						if(this.checked){
	                      toCheck = true;
						}else{
	                      toCheck = false;
						}

					  for(var x = 0; x < checkIndex.length; x++){

						  	if(checkIndex[x].classList[1]!='TOGGLEALL'){
		                        checkIndex[x].checked = toCheck;
						  	}
	                     
					  	}//for ends

						//showall/hideall
                        showHideLogContextToggle(toCheck,'',toCheck);


					  }//if TOGGLEALL check Ends

				  else{ //New Code Ends

					//showall/hideall
                    showHideLogContextToggle(this.checked,clickedClass,this.checked);
					

					/*
					var logContentBlocks = document.getElementsByClassName('logContentBlock '+clickedClass);

					if(this.checked){

					       for (var j = 0; j < logContentBlocks.length; j++) {

					            
					                 logContentBlocks[j].style.display = 'block';
					            
					       	}

					}else{

					         for (var j = 0; j < logContentBlocks.length; j++) {

					            
					                 logContentBlocks[j].style.display = 'none';
					            
					       	}


					}
					*/
	
				}


				


			});	
		}//for Ends

	//2 Ends


	//3 - 
	var hoveredUserDebug;
	var userDebug = document.getElementsByClassName('logContentBlock USER_DEBUG');
	 for (var k = 0; k < userDebug.length; k++) {

			userDebug[k].addEventListener("mouseover", function(){

				   hoveredUserDebug = this.attributes[0].value.split(' ')[1];
				   content = this.innerText;
				   logBody = content.substring(content.indexOf('|DEBUG|')+7,content.length);
                  // console.log(logBody);

					var node = document.createElement("div");                 // Create a <div> node
					node.style.cssText = 'width:200px;height:200px;-moz-box-shadow: 0 0 25px #fff;-webkit-box-shadow: 0 0 25px #fff;box-shadow: 0 0 25px #fff;';
					node.Id='hoverUserDebug';
					var textnode = document.createTextNode(logBody);         // Create a logBody node
					node.appendChild(textnode); 


                   // this.appendChild(node);

				});
		}
		//for Ends		

    //3 Ends

    //4 : Popout Color Index

    var contextIndex = document.getElementById('popOutIndex');
	contextIndex.addEventListener("click", function(){

		colorIndexElement = document.getElementById("colorIndex");

       if(contextIndex.getAttribute('data-state')=='popOut'){
	      contextIndex.setAttribute('data-state','popIn');

	       	  //colorIndexElement.style.bottom='-226px';

	       	  $("#colorIndex").animate({ bottom: '-226px' });
		      $("#popOutIndex").css({'transform': 'rotate(180deg)'});

       }else{
	      contextIndex.setAttribute('data-state','popOut');

	      	   $("#colorIndex").animate({ bottom: '0px' });
		      // $("#popOutIndex").css({'transform': 'rotate(-180deg)'});
		     
       }

		
				


		
        // console.log(contextIndex);

		});

 
}

var showHideLogContextToggle = function(isShowAll,classClicked,isChecked){
   	var logContentBlocks = document.getElementsByClassName('logContentBlock '+classClicked);

	if(isChecked || isShowAll){

					       for (var j = 0; j < logContentBlocks.length; j++) {

					            
					                 logContentBlocks[j].style.display = 'block';
					           
					       	}

					}else{

					         for (var j = 0; j < logContentBlocks.length; j++) {

					            
					                 logContentBlocks[j].style.display = 'none';
					            
					       	}


					}

}