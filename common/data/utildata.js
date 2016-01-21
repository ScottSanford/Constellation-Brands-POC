angular.module('pieChartPOC').factory('UtilData', function($http, $q, localStorageService, $location) {

    var UtilData = {};

    UtilData.getGoogleWorkSheetData = function(dialogBox) {
        var deferred = $q.defer();
        var name = localStorageService.get('name');
        var value = localStorageService.get('value');

        if (name !== undefined && value !== undefined) {
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
        else {
            return dialogBox;
        }
     
    };

    UtilData.asyncRequest = function(worksheet) {
        var deferred = $q.defer();

        var ds = new Miso.Dataset({
                importer: Miso.Dataset.Importers.GoogleSpreadsheet,
                parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
                key: "1vcoebXyq6-pLyrAbxFjVnPezQOXksQJVXtDfLaDFt4c",
                worksheet: worksheet
            });

        ds.fetch().done(function(){
            var jsonData = ds.toJSON();
            UtilData.saveDataToLocalStorage(jsonData);
            
            var route = $location.path();

            if (route == '/table') {
                deferred.resolve(jsonData);
            } else if (route == '/sales') {
                UtilData.getSalesData(jsonData);
            } else if (route == '/units') {
                UtilData.getUnitsData(jsonData);
            }

        });

        return deferred.promise;
    }
    
    UtilData.getSalesData = function(jsonData) {
        var deferred = $q.defer();

        var dataArr = [];
        for (var i = 0; i < jsonData.length; i++) {
            var obj = {
                name: jsonData[i].Supplier, 
                y: jsonData[i].$Share
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
        var deferred = $q.defer();
        
        var dataArr = [];
        for (var i = 0; i < jsonData.length; i++) {
            var obj = {
                name: jsonData[i].Supplier, 
                y: jsonData[i].UnitShare
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
                    return '<b>' + this.point.name + '</b>:' + (this.percentage).toFixed(2) + '%';
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
                            return '<b>' + this.point.name + '</b>: ' + (this.percentage).toFixed(2) + '%';
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

    UtilData.saveDataToLocalStorage = function(data) {
        localStorageService.set('savedData', data);
    };    

    UtilData.getSavedData = function() {
        localStorageService.get('savedData');
    };

    return UtilData;
 
});