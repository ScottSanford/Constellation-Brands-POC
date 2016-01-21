angular.module('pieChartPOC').factory('UtilData', function($http, $q, localStorageService) {

    var UtilData = {};

    UtilData.newData = function(worksheet) {
        var deferred = $q.defer();

        var ds = new Miso.Dataset({
                importer: Miso.Dataset.Importers.GoogleSpreadsheet,
                parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
                key: "1vcoebXyq6-pLyrAbxFjVnPezQOXksQJVXtDfLaDFt4c",
                worksheet: worksheet
            });

        ds.fetch().done(function(){
            var jsonData = ds.toJSON();
            deferred.resolve(jsonData);
        })

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

        deferred.resolve(obj);

        return deferred.promise;

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

        deferred.resolve(obj);

        return deferred.promise;
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

    UtilData.getGoogleWorkSheet = function() {
        var deferred = $q.defer();
        var name = localStorageService.get('name');
        var value = localStorageService.get('value');

        if (name == "Club" && value == 4) {
            var wksht = "1";
            deferred.resolve(wksht);
        } else if (name == "Club" && value == 12) {
            var wksht = "2";
            deferred.resolve(wksht);
        } else if (name == "Club" && value == 52) {
            var wksht = "3";
            deferred.resolve(wksht);
        } else if (name == "Multi-Outlet" && value == 4) {
            var wksht = "4";
            deferred.resolve(wksht);
        } else if (name == "Multi-Outlet" && value == 12) {
            var wksht = "5";
            deferred.resolve(wksht);
        } else if (name == "Multi-Outlet" && value == 52) {
            var wksht = "6";
            deferred.resolve(wksht);
        }
        
        return deferred.promise;
    };

    UtilData.saveDataToLocalStorage = function(data) {
        localStorageService.set('savedData', data);
    };    

    UtilData.getSavedData = function() {
        localStorageService.get('savedData');
    };

    return UtilData;
 
});