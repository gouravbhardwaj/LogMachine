function formatApexClass(){

	
var myCodeBlock = document.getElementsByClassName("codeBlock");
//myCodeBlock[0].setAttribute("style","background-color: rgb(48, 10, 36);color: white;");


var classCode = myCodeBlock[0].childNodes[0].childNodes[1].childNodes[0].childNodes[1];

var arrayOfClassCode = classCode.innerText.split('\n');

var formatedCode='';
for(i=0;i<arrayOfClassCode.length;i++){
	
	//console.log(arrayOfClassCode[i]);
	elementValue = '';
	
	console.log(getQueryParams('LineNo'));
	lineNumber = parseInt(getQueryParams('LineNo').trim());
	if(arrayOfClassCode[i]==""){
		
		elementValue = " ";
	}else{
		
		elementValue = arrayOfClassCode[i];
	}
	
	
	if(i==(lineNumber-1)){
		formatedCode +='<div style="background-color: rgb(242, 156, 156);color: rgb(161, 34, 34);">'+elementValue+'</div>';	
		
	}else{
	formatedCode +='<div>'+elementValue+'</div>';	
		
	}
	
}
classCode.innerHTML = formatedCode;


}


function getQueryParams( url ) {
	var value;
	var parameters = new Array();
	name = (window.location.href).substring((window.location.href).indexOf('?'),(window.location.href).length);
	
	if(name.indexOf('+')>0){
	   parameters = name.split('+');	
	}else{
		
		
		parameters.push(name);
	}
   
   for(i=0;i<parameters.length;i ++){
	   if(parameters[i].indexOf(url)>=0){
		  value =  parameters[i].split('=')[1];
	   }
	}
	
    return value;
}