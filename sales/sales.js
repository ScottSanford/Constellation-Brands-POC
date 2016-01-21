angular.module('pieChartPOC')

.controller('SalesCtrl', function($scope, UtilData, $location, localStorageService){

    var savedData = UtilData.getSavedData();


    initDataset();      

   	function initDataset() {

        UtilData.getGoogleWorkSheetData();

    };
});