/*
@Author : Gourav Bhardwaj
@Description : This class holds the defination and utility methods to filter the components in the log body and attach relevant meta data like color, bgcolor
font-size and other styling to that elment.
*/


var FormatterClass = {

colorIndexTemplate : '<div id="colorIndex" style="background: rgb(35, 35, 47);color: white;padding: 10px;bottom: 0;left: 93px;height: 248px;position: inherit;width: 257px;">'+
'<div class="colorIndexPallet" style="font-size: 20px;text-align: center;padding: 5px;background: #23232f;float: left;">Context Index</div><i data-state="popIn" id="popOutIndex" style="display:none;cursor: pointer;float: right;padding-top: 2px;font-size: 16px;" class="fa fa-external-link" aria-hidden="true"></i><div class="indexList">',

globalStyle : {'Font_Weight':'900','Font_Size':'14px','Background_Color':'rgb(35, 35, 47)','Font_Color':'white'},

debugLevelToColorMapper : [
["FATAL_ERROR",{'Label':'Error','Text_Color':'rgb(161, 34, 34)','Background_Color':'rgb(242, 156, 156)','borderColor':'none','styleClass':'errorBlock'}],
["VARIABLE_ASSIGNMENT",{'Label':'Variable Assignment','Text_Color':'#0b0638','Background_Color':'#9185f1','borderColor':'none','styleClass':'VARIABLE_ASSIGNMENT'}],
["CALLOUT_REQUEST",{'Label':'Callout','Text_Color':'#0c4040','Background_Color':'#85f1f1','borderColor':'none','styleClass':'CALLOUT_REQUEST'}],
["VALIDATION_RULE",{'Label':'Validation Rule','Text_Color':'#38280C','Background_Color':'#ccc500','borderColor':'none','styleClass':'VALIDATION_RULE'}],
["WORKFLOW",{'Label':'Workflow/Process Builder','Text_Color':'#35081d','Background_Color':'#fdc5df','borderColor':'none','styleClass':'WORKFLOW'}],
["CODE_UNIT_STARTED",{'Label':'Code Unit','Text_Color':'#38280c','Background_Color':'#FDF4C5','borderColor':'none','styleClass':'codeUnitStarted'}],
["METHOD_ENTRY",{'Label':'Method Entry','Text_Color':'#0c350d','Background_Color':'#bceea8','borderColor':'none','styleClass':'methodEntry'}],
["CUMULATIVE_LIMIT_USAGE",{'Label':'Cumulative Usage','Text_Color':'#31708f','Background_Color':'#d9edf7','borderColor':'none','styleClass':'CUMULATIVE_LIMIT_USAGE'}],
["USER_DEBUG",{'Label':'User Debug','Text_Color':'rgb(6, 6, 6)','Background_Color':'rgb(252, 252, 252)','borderColor':'none','styleClass':'USER_DEBUG'}],
["DEFAULT",{'Label':'Default','Text_Color':'none','Background_Color':'none','borderColor':'white','styleClass':'DEFAULT'}],
["TOGGLE",{'Label':'ToggleAll','Text_Color':'none','Background_Color':'none','borderColor':'white','styleClass':'TOGGLEALL'}] //New
],

getColorForTheLevel : function(debugLevel){

var mapper = new Map(this.debugLevelToColorMapper);

return mapper.get(debugLevel);

},


getColorIndex : function(){

var indexSection = this.colorIndexTemplate;
this.debugLevelToColorMapper.forEach(function(data,index){

//if(data[1].Label != 'DEFAULT'){
//indexSection += '<div class="block"><div class="checkBos" ><input type="checkbox" name="colorIndex" value="'+data[1].Label+'"></div><div class="color" style="background-color:'+data[1].Background_Color
//+';width: 13px;height: 13px;margin-right: 10px;"></div><div class="typeLog" style="font-size:14px;">'+data[1].Label+'</div></div>';


indexSection += '<div class="block" style="width: 100%;float: left;">'+
'<div class="checkBos" style="width: 10%;float: left;">'+
 '<input checked class="checkIndex '+data[1].styleClass+'" type="checkbox" name="colorIndex" value="'+data[1].Label+'">'+
'</div>'+
'<div class="color" style="width: 10%;float: left;">'+
 '<div class="colo" style="background-color:'+data[1].Background_Color+';width: 13px;height: 13px;border:2px solid '+data[1].borderColor+'"> </div>'+
'</div>'+
'<div class="typeLog" style="font-size:14px;width: 70%;">'+data[1].Label+
'</div>'+
'</div>';


//}

});//Loop Ends

indexSection +='</div></div>';

//indexSection +='</div>';

return indexSection;

},

methodEntryCounter : 0,
codeUnitComponentId:' ',
rightArrayElement :'<i class="fa fa-angle-double-right" style="font-weight: 800;font-size: 20px;color: red;" aria-hidden="true"></i>',
leftArrayElement :'<i class="fa fa-angle-double-left" style="font-weight: 800;font-size: 20px;color: blue;" aria-hidden="true"></i>',

getFormattedElement : function(element,debugLevel){
//	console.log('### : '+debugLevel);


if(debugLevel=='METHOD_ENTRY'){
formatter = this.getColorForTheLevel('METHOD_ENTRY');
formatted = '<div class="logContentBlock methodEntry"  style="color:'+formatter.Text_Color+';background-color:'+formatter.Background_Color
+';font-weight: '+this.globalStyle.Font_Weight+';font-size:'+this.globalStyle.Font_Size+'"><a class="methodEntryClass" id="methodEntry'+this.methodEntryCounter+'" href="#" target="_blank">'+element.replace('METHOD_ENTRY|','METHOD_ENTRY|'+this.leftArrayElement)+'</a></div>';


console.log(element.indexOf('METHOD_ENTRY|')+13);

this.methodEntryCounter++;
}else if(debugLevel=='METHOD_EXIT'){
formatter = this.getColorForTheLevel('METHOD_ENTRY');
formatted = '<div class="logContentBlock methodEntry" style="color:'+formatter.Text_Color+';background-color:'+formatter.Background_Color
+';font-weight: '+this.globalStyle.Font_Weight+';font-size:'+this.globalStyle.Font_Size+'"><a class="methodEntryClass" id="methodEntry'+this.methodEntryCounter+'" href="#" target="_blank">'+element.replace('METHOD_EXIT|','METHOD_EXIT|'+this.rightArrayElement)+'</a></div>';
}


else if(debugLevel=='CODE_UNIT_STARTED'){
isNumberNotstring = false;

if(this.codeUnitComponentId==' ' && element.indexOf(']|')>=0){
    componentId = element.substring(element.indexOf(']|')+2,element.indexOf(']|')+17);	

	if(!isNaN(componentId.substring(0,1))){
       isNumberNotstring = true;

        this.codeUnitComponentId = componentId;
	}
}

formatter = this.getColorForTheLevel(debugLevel);

formatted = '<div class="logContentBlock codeUnitStarted" style="color:'+formatter.Text_Color+';background-color:'+formatter.Background_Color
+';font-weight: '+this.globalStyle.Font_Weight+';font-size:'+this.globalStyle.Font_Size+'"><a class="codeUnitStartedClass" href="/'+this.codeUnitComponentId+'" target="_blank">'+element+'</a></div>';

}
else{
formatter = this.getColorForTheLevel(debugLevel);
formatted = '<div class="logContentBlock '+debugLevel+'" style="color:'+formatter.Text_Color+';background-color:'+formatter.Background_Color
+';font-weight: '+this.globalStyle.Font_Weight+';font-size:'+this.globalStyle.Font_Size+'">'+element+'</div>';

}
//console.log('### : '+formatted);

return formatted;
},

};