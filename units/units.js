angular.module('pieChartPOC')

.controller('UnitsCtrl', function($scope, $rootScope, UtilData, $location, localStorageService){

	var name  = localStorageService.get('name');
    var value = localStorageService.get('value');

    $scope.outlet = name;
    $scope.weeks = value;

	$scope.isActive = function(route) {
        return route === $location.path();
    };

    initDataset();     

    function initDataset() {

      UtilData.getGoogleWorkSheetData();

    };

    $scope.sumTotal = UtilData.sumTotal();

});