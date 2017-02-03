/*
@Author : Gourav Bhardwaj
@Description : This class holds the defination and utility methods to collect namespace for ApexClasses, Structure of ApexClass( and Methods in future).
Methods to make a bulk remote call to retrive apex class ids and then assign the ids to relevant html elements.

Example <a href="/ApexClassId"> LinkedInClassName </a>  //This id is dynamically added to the element
*/

var ApexClassHandler = {

classNames :[],

methodEntryString :[],

//@Description : Collecting all the namespaces for the ORG.
retrieveNameSpaces : function(){
namesSpaces = new Array();

var client = new forcetk.Client();
client.setSessionToken(UtilClass.getCookieValue('sid'));
client.query('SELECT NamespacePrefix FROM ApexClass GROUP BY NamespacePrefix', function(data)
{

	console.log(data);   

	for(var i=0;i<data.records.length;i++){
		console.log(data.records[i].NamespacePrefix);  
		namesSpaces.push(data.records[i].NamespacePrefix);
		
	}


	
	//After getting all the names spaces call this method, it will get only the class names by removing ny namespaces and methods names.
	ApexClassHandler.getClassName(namesSpaces);

});

},


getClassName : function(namesSpaces){

if(this.methodEntryString){
for(var i=0;i<this.methodEntryString.length;i++){
var element = this.methodEntryString[i];

var classStructure = element.substring(element.lastIndexOf('|')+1,element.length);
var nameSpaceUsed;
var className='';

for(var j=0;j<namesSpaces.length;j++){
	if(classStructure.indexOf(namesSpaces[j])>=0){
	nameSpaceUsed = namesSpaces[j];
	}
}

//Check if namespace used for this element
if(nameSpaceUsed){
	className = classStructure.substring(classStructure.indexOf(nameSpaceUsed+'.')+(nameSpaceUsed+'.').length);
	className = className.substring(0,className.indexOf('.'));
}else{
className = classStructure.substring(0,classStructure.indexOf('.'));
}

this.addClassName(className);

}//First For Ends


//Make a call to retrieve the Ids of the class names retrivved above.
this.retriveApexClassIds();

}

},

addClassName : function(className){
//console.log('### ClassNames : '+className);
if(this.classNames.indexOf(className)<0){
	this.classNames.push(className);
	//this.classNames += ','+className;
}
console.log(this.classNames);
},



retriveApexClassIds : function(){
if(this.classNames){
console.log(this.classNames);


 var client = new forcetk.Client();
    client.setSessionToken(UtilClass.getCookieValue('sid'));
 
  
   
        // Find cases that belong to the current user
      client.query("SELECT Name,Id FROM ApexClass WHERE Name IN ('"+this.classNames.join('\',\'')+"')", function(response){
        	
        	//client.query("SELECT Name,Id FROM ApexClass WHERE Name IN ('LinkedInCrtl','LinkedInParser')", function(response){
            console.log(response.records[0].Id);
			
			ApexClassHandler.associateIdsToHTMLElement(response.records);
        });


}

},

associateIdsToHTMLElement : function(apexClassIds){
var hostUrl = UtilClass.getHostUrl();
var elements = document.getElementsByClassName('methodEntryClass');

	for(var j=0;j<elements.length;j++){
		for(var x=0;x<apexClassIds.length;x++){
			if(elements[j].innerText.indexOf(apexClassIds[x].Name)>=0){
		         
		        elements[j].setAttribute("href","/"+apexClassIds[x].Id);
				break;
			}
		}
	}
}

}
