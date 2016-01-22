angular.module('pieChartPOC')

.controller('SalesCtrl', function($scope, $rootScope, UtilData, $location, localStorageService, ngDialog){

	$rootScope.isActive = function(route) {
        return route === $location.path();
    };

    var name  = localStorageService.get('name');
    var value = localStorageService.get('value');
    var db    =  ngDialog.openConfirm({
        template: 'table/dialog/dialog.html',
        className: 'ngdialog-theme-default', 
        controller: 'DialogCtrl', 
        scope: $scope
    });


    if (name == null && value == null) {
    	UtilData.getGoogleWorkSheetData(db);
    } else {
    	initDataset();   
    }

   	function initDataset() {

        UtilData.getGoogleWorkSheetData();
        $scope.sumTotal = UtilData.sumTotal();

    };


});