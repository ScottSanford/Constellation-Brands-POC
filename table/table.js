angular.module('pieChartPOC')

.controller('TableCtrl', function($scope, $rootScope, UtilData, ngDialog, localStorageService){

    $scope.isActive = function(route) {
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

    if (name == null & value == null) {
        $scope.tableData = UtilData.getGoogleWorkSheetData(db);
    } else {
        initDataset();
    }

    $scope.sortType    = 'Supplier';
    $scope.sortReverse = false;
    $scope.searchData  = '';        

    function initDataset() {

        var savedData = localStorageService.get('savedData');

        $scope.tableData = savedData;

    };

});