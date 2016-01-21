angular.module('pieChartPOC')

.controller('TableCtrl', function($scope, UtilData, ngDialog, localStorageService){

    var name = localStorageService.get('name');
    var value = localStorageService.get('value');
    var ds;

    if (name == undefined & value == undefined) {
        ngDialog.openConfirm({
            template: 'table/dialog/dialog.html',
            className: 'ngdialog-theme-default', 
            controller: 'DialogCtrl', 
            scope: $scope
        });
    } else {
        initDataset();
    }

    $scope.sortType    = 'Supplier';
    $scope.sortReverse = false;
    $scope.searchData  = '';        

    function initDataset() {

        UtilData.getGoogleWorkSheet().then(function(worksheet){
            
            UtilData.newData(worksheet).then(function(returnData){

                $scope.tableData = returnData;

            });
         
        });

    };

});