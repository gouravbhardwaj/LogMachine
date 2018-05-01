var debugConsoleHandler = {

rightPanelTemplate : '<div style="height: 100%;width: 22%;position: fixed;background: rgba(0, 0, 0, 0.85);z-index: 999;top: 0px;right: 0px;"> right panel <div>',	

 showRightPanel : function(){
   $('#panel-1136').append(debugConsoleHandler.rightPanelTemplate);
 },

getApexClassCoverage : function(){


var client = new forcetk.Client();
client.setSessionToken(UtilClass.getCookieValue('sid'));


//client.query('SELECT ApexClassOrTrigger.Name, NumLinesCovered, NumLinesUncovered FROM ApexCodeCoverageAggregate ORDER BY ApexClassOrTrigger.Name ASC', function(data)
/*client.query('SELECT NumLinesCovered FROM ApexCodeCoverageAggregate WHERE ApexClassorTriggerId = \'01p90000006ykkSAAQ\' Limit 1', function(data)
{
console.log(data);

debugConsoleHandler.showRightPanel();
});
*/	



}








}