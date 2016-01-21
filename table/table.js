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
            console.log(typeof worksheet);
            var ds = new Miso.Dataset({
                importer: Miso.Dataset.Importers.GoogleSpreadsheet,
                parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
                key: "1vcoebXyq6-pLyrAbxFjVnPezQOXksQJVXtDfLaDFt4c",
                worksheet: worksheet
            });          
            ds.fetch().done(function(){
                var jsonData = ds.toJSON();

                console.log(jsonData);
                UtilData.saveDataToLocalStorage(jsonData);

                $scope.tableData = jsonData;
            });
        });

    };

});