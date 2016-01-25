angular.module('pieChartPOC')

.controller('SalesCtrl', function($scope, UtilData, $location, localStorageService, ngDialog){

    var name  = localStorageService.get('name');
    var value = localStorageService.get('value');

    UtilData.getGoogleWorkSheetData();
    $scope.sumTotal = UtilData.sumTotal();
    $scope.outlet   = name;
    $scope.weeks    = value;


});