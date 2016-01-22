angular.module('pieChartPOC')

.controller('SalesCtrl', function($scope, $rootScope, UtilData, $location, localStorageService){

	$rootScope.isActive = function(route) {
        return route === $location.path();
    };

    initDataset();      

   	function initDataset() {

        UtilData.getGoogleWorkSheetData();

    };

    $scope.sumTotal = UtilData.sumTotal();
});