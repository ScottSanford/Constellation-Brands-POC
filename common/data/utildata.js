angular.module('pieChartPOC').factory('UtilData', function($http, $q) {

    var UtilData = {};
    
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


    return UtilData;
 
});