angular.module('pieChartPOC')

.controller('SalesCtrl', function($scope, UtilData, $location, localStorageService){

    var savedData = UtilData.getSavedData();


    initDataset();      

   	function initDataset() {

        UtilData.getGoogleWorkSheet().then(function(worksheet){
            
            UtilData.newData(worksheet).then(function(returnData){
                             
                UtilData.pieChart(returnData.titleText, returnData.util);

            });
         
        });

    };
});