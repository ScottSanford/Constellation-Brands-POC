angular.module('pieChartPOC')

.controller('ChartCtrl', function($scope, Dialog){

    $scope.pieOne = false;

    $scope.toggle = function() {
        if ($scope.pieOne) {
            return false;
        } else {
            return true;
        }
    }

    $scope.tab = 2;

    $scope.setTab = function(tabId) {
        $scope.tab = tabId;
    }

    $scope.isSet = function(tabId) {
        return $scope.tab === tabId;
    }

    Dialog.create('chart/dialog/dialog.html', 'ngdialog-theme-plain custom-width', 'DialogCtrl');

	initDataset();

	function initDataset() {

	    ds = new Miso.Dataset({
	        importer: Miso.Dataset.Importers.GoogleSpreadsheet,
	        parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
	        key: "1vcoebXyq6-pLyrAbxFjVnPezQOXksQJVXtDfLaDFt4c",
	        worksheet: "1"
	    });

	    ds.fetch().done(fetchSuccess);

	}   

	function getSales(row) {
	    var dataArr = [];
	    for (var i = 0; i < row.length; i++) {
	        var obj = {
	            name: row[i].Supplier, 
	            y: row[i].PerShare
	        }
	        dataArr.push(obj);
	    }
	    return dataArr;
	} 

	function getUnits(row) {
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

    function fetchSuccess() {

        var jsonData = ds.toJSON();

        var dataPercentage = getSales(jsonData);
        var dataUnits      = getUnits(jsonData);
        
        function toggleChart() {
            if ($scope.pieOne) {
                return dataPercentage;
            } else {
                return dataUnits; 
            }
        }

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
                data: toggleChart()
            }]
        });

}


});