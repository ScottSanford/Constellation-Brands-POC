angular.module('pieChartPOC')

.controller('UnitsCtrl', function($scope, UtilData, $location){

    // if ls is true get data from there else just run normal initDataSet
    initDataset();
    var arr;           

    function initDataset() {

      UtilData.getGoogleWorkSheetData();

    };

});