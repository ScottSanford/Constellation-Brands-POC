angular.module('pieChartPOC')

.controller('UnitsCtrl', function($scope, UtilData, $location){

    initDataset();
    var arr;           

    function initDataset() {

        UtilData.getGoogleWorkSheet().then(function(worksheet){
            
            UtilData.newData(worksheet).then(function(returnData){
                      
                UtilData.pieChart(data.titleText, data.util);

            });
         
        });

    };

});