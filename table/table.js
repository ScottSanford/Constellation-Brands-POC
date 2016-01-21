angular.module('pieChartPOC')

.controller('TableCtrl', function($scope, UtilData, ngDialog){

    ngDialog.openConfirm({
        template: 'table/dialog/dialog.html',
        className: 'ngdialog-theme-default', 
        controller: 'DialogCtrl', 
        scope: $scope
    });

    $scope.sortType    = 'Supplier';
    $scope.sortReverse = false;
    $scope.searchData  = '';

    initDataset();           

   function initDataset() {

        ds = new Miso.Dataset({
            importer: Miso.Dataset.Importers.GoogleSpreadsheet,
            parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
            key: "1vcoebXyq6-pLyrAbxFjVnPezQOXksQJVXtDfLaDFt4c",
            worksheet: "1"
        });

        ds.fetch().done(function(){
            var jsonData = ds.toJSON();
            $scope.tableData = jsonData;
        });

    };

});