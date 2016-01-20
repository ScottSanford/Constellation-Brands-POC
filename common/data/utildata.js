angular.module('pieChartPOC').factory('UtilData', function($http, $q) {

    var UtilData = {};
    
    UtilData.getSales = function(row) {
        
        var dataArr = [];
        for (var i = 0; i < row.length; i++) {
            var obj = {
                name: row[i].Supplier, 
                y: row[i].$Share
            }
            dataArr.push(obj);
        }
        return dataArr;

    };

    UtilData.getUnits = function(row) {
        var dataArr = [];
        for (var i = 0; i < row.length; i++) {
            var obj = {
                name: row[i].Supplier, 
                y: row[i].UnitShare
            }
            dataArr.push(obj);
        }
        return dataArr;
    }

    UtilData.getSalesOrUnits = function(tabId, jsonData) {
      
       var deferred = $q.defer();
      
       if (tabId == 2) {

            var obj = {
                util: UtilData.getSales(jsonData), 
                html: 'pieChartSales', 
                titleText: '$ Sales'
            }

            deferred.resolve(obj);

       } else if (tabId == 3) {

            var obj = {
                util: UtilData.getUnits(jsonData), 
                html: 'pieChartUnits', 
                titleText: 'Units'
            }

            deferred.resolve(obj);

       } 

       return deferred.promise; 

    };

    UtilData.pieChart = function(html, titleText, dataPoints) {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: html, // make dynamic 
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
                text: titleText // make dynamic
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
                data: dataPoints // make dynamic
            }]
        });
    };


    return UtilData;
 
});