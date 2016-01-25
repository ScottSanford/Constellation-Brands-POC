angular.module('pieChartPOC').factory('UtilData', function($http, $q, localStorageService, $location, ngDialog) {

    var UtilData = {};

    UtilData.getGoogleWorkSheetData = function(dialog) {

        var name = localStorageService.get('name');
        var value = localStorageService.get('value');

        if (name !== null && value !== null) { 
            UtilData.whichWorkSheet(name, value);        
        } else {
            dialog;
            var savedData = localStorageService.get('savedData');
            console.log('lsSavedData:: ', savedData);
            return savedData;
        }
     
    };

    UtilData.whichWorkSheet = function(name, value) {
        if (name == "Club" && value == 4) {
            var wksht = "1";
            UtilData.asyncRequest(wksht);
        } else if (name == "Club" && value == 12) {
            var wksht = "2";
            UtilData.asyncRequest(wksht);
        } else if (name == "Club" && value == 52) {
            var wksht = "3";
            UtilData.asyncRequest(wksht);
        } else if (name == "Multi-Outlet" && value == 4) {
            var wksht = "4";
            UtilData.asyncRequest(wksht);
        } else if (name == "Multi-Outlet" && value == 12) {
            var wksht = "5";
            UtilData.asyncRequest(wksht);
        } else if (name == "Multi-Outlet" && value == 52) {
            var wksht = "6";
            UtilData.asyncRequest(wksht);
        } 
    }

    UtilData.asyncRequest = function(worksheet) {
        var ds = new Miso.Dataset({
                importer: Miso.Dataset.Importers.GoogleSpreadsheet,
                parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
                key: "1vcoebXyq6-pLyrAbxFjVnPezQOXksQJVXtDfLaDFt4c",
                worksheet: worksheet
            });

        ds.fetch().done(function(){
            var jsonData  = ds.toJSON();
            var savedData = localStorageService.set('savedData', jsonData);
            
            var route = $location.path();

            if (route == '/sales') {

                UtilData.getSalesData(jsonData);

            } else if (route == '/units') {
                
                UtilData.getUnitsData(jsonData);
                
            } else if (route == '/table') {
                
                return;

            }

        });
    }
    
    UtilData.getSalesData = function(jsonData) {
    

        var dataArr = [];
        for (var i = 0; i < jsonData.length; i++) {
            var obj = {
                name: jsonData[i].Supplier, 
                y: jsonData[i].$Share,
                tooltip: jsonData[i].$Sales,
            }
            dataArr.push(obj);
        }

        var obj = {
            util: dataArr,
            titleText: '$ Sales'
        }

        var chart = UtilData.pieChart(obj.titleText, obj.util);

        return chart;

    };

    UtilData.getUnitsData = function(jsonData) {
        
        var dataArr = [];
        for (var i = 0; i < jsonData.length; i++) {
            var obj = {
                name: jsonData[i].Supplier, 
                y: jsonData[i].UnitShare, 
                tooltip: jsonData[i].Units
            }
            dataArr.push(obj);
        }

        var obj = {
            util: dataArr,
            titleText: 'Units'
        }

        var chart = UtilData.pieChart(obj.titleText, obj.util);

        return chart;
    };

    UtilData.pieChart = function(titleText, dataPoints) {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'pieChart', 
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false, 
                type: 'pie'
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: titleText
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.name + '</b>: $' + this.point.tooltip;
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#F4C74E',
                        formatter: function () {
                            return '<b>' + this.point.name + '</b>: ' + this.point.tooltip;
                        }
                    }
                }
            },
            series: [{
                name: "Suppliers", 
                colorByPoint: true, 
                data: dataPoints
            }]
        });
    };

    UtilData.sumTotal = function() {
        var savedData = localStorageService.get('savedData');
        var route     = $location.path();

        var arr = [];

        if (route == '/sales') {
            savedData.map(function(data){
                var sales = data.$Sales;
                arr.push(sales);
            });                
        } else if (route == '/units') {
            savedData.map(function(data){
                var units = data.Units;
                arr.push(units);
            }); 
        }

        var sum = arr.reduce(function(a,b){
            return a + b;
        }, 0);
        
        return sum;
    };

    return UtilData;
 
});