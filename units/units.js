angular.module('pieChartPOC')

.controller('UnitsCtrl', function($scope, UtilData, $location){

    initDataset();
    var arr;           

   function initDataset() {

        ds = new Miso.Dataset({
            importer: Miso.Dataset.Importers.GoogleSpreadsheet,
            parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
            key: "1vcoebXyq6-pLyrAbxFjVnPezQOXksQJVXtDfLaDFt4c",
            worksheet: UtilData.getGoogleWorkSheet()
        });

        ds.fetch().done(fetchSuccess);

    };

    function fetchSuccess() {

        var jsonData = ds.toJSON();

        UtilData.getUnitsData(jsonData).then(function(data){
            
            UtilData.pieChart(data.titleText, data.util);

        });
        

    }

});