angular.module('pieChartPOC').factory('Dataset', function($http, $q) {

    var Dataset = {};
    
    Dataset.getSales = function(row) {
        
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

    Dataset.getUnits = function(row) {
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

    Dataset.pieChart = function(data) {
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
                text: "Wine Sales (52 Weeks - CLUB)"
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
                data: Dataset.getSales(data)
            }]
        });
    };


    return Dataset;
 
});