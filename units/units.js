angular.module('pieChartPOC')

.controller('UnitsCtrl', function($scope, $rootScope, UtilData, $location){

	$scope.isActive = function(route) {
        return route === $location.path();
    };

    initDataset();     

    function initDataset() {

      UtilData.getGoogleWorkSheetData();

    };

    $scope.sumTotal = UtilData.sumTotal();

});