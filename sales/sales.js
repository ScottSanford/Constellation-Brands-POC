angular.module('pieChartPOC')

.controller('SalesCtrl', function($scope, UtilData, $location){

    initDataset();          

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

        UtilData.getSalesData(jsonData).then(function(data){
            
            UtilData.pieChart(data.titleText, data.util);
            
        });
    }
});