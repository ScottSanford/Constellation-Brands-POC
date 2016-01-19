angular.module('pieChartPOC')

.controller('ChartCtrl', function($scope, Dataset){

    initDataset();

    $scope.tab = 1;

    $scope.setTab = function(tabId) {
        $scope.tab = tabId;
    }

    $scope.isSet = function(tabId) {
        return $scope.tab === tabId;
    }

    // Dialog.create('chart/dialog/dialog.html', 'ngdialog-theme-plain custom-width', 'DialogCtrl');


   function initDataset() {

        ds = new Miso.Dataset({
            importer: Miso.Dataset.Importers.GoogleSpreadsheet,
            parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
            key: "1vcoebXyq6-pLyrAbxFjVnPezQOXksQJVXtDfLaDFt4c",
            worksheet: "1"
        });

        ds.fetch().done(fetchSuccess);

    };

    function fetchSuccess() {
        var jsonData = ds.toJSON();

        // table
        $scope.tableData = jsonData;
        // Pie Chart
        Dataset.pieChart(jsonData);
    }
    

    


});