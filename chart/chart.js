angular.module('pieChartPOC')

.controller('ChartCtrl', function($scope, UtilData, ngDialog){

    // ngDialog.openConfirm({
    //     template: 'chart/dialog/dialog.html',
    //     className: 'ngdialog-theme-default', 
    //     controller: 'DialogCtrl', 
    //     scope: $scope
    // });

    $scope.sortType    = 'Supplier';
    $scope.sortReverse = false;
    $scope.searchData  = '';

    initDataset();

    $scope.tab = 1;

    $scope.setTab = function(tabId) {
        $scope.tab = tabId;
        fetchSuccess(tabId);
    }

    $scope.isSet = function(tabId) {
        return $scope.tab === tabId;
    }

   function initDataset() {

        ds = new Miso.Dataset({
            importer: Miso.Dataset.Importers.GoogleSpreadsheet,
            parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
            key: "1vcoebXyq6-pLyrAbxFjVnPezQOXksQJVXtDfLaDFt4c",
            worksheet: "1"
        });

        ds.fetch().done(fetchSuccess(1));

    };

    function fetchSuccess(tabId) {

        var jsonData = ds.toJSON();

        // attach to scope for table view
        $scope.tableData = jsonData;
        // Pie Chart
        UtilData.getSalesOrUnits(tabId,jsonData).then(function(data){
            UtilData.pieChart(data.html, data.titleText, data.util);
        });
    }


});