$(function () {

    document.ontouchmove = function(event){
          event.preventDefault();
    }

    $(document).ready(function () {

        $('.exit').on('touchstart click', function(){
            mflyCommands.close();
        })
        // $("#loading").show();

        initDataset();
    });

});

var areControlBarsOpen = false;

$(document).bind("mobileinit", function () {
    $.event.special.swipe.horizontalDistanceThreshold = 130;
});

$('.exit').live('click', function (e) {
    window.open("mfly://control/done");
});

function initDataset() {

    ds = new Miso.Dataset({
        importer: Miso.Dataset.Importers.GoogleSpreadsheet,
        parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
        key: "1vcoebXyq6-pLyrAbxFjVnPezQOXksQJVXtDfLaDFt4c",
        worksheet: "1"
    });

    ds.fetch().done(fetchSuccess);

}   

function row(dataSet) {
    var dataArr = [];
    for (var i = 0; i < dataSet.length; i++) {
        var obj = {
            name: dataSet[i].Supplier, 
            y: dataSet[i].PerShare
        }
        dataArr.push(obj);
    }
    return dataArr;
} 

function fetchSuccess() {

    var jsonData = ds.toJSON();
    // Save JSON
    // XXX

    var dataPercentage = row(jsonData);
    console.log(dataPercentage);

    // chart = new Highcharts.Chart({
    //     chart: {
    //         renderTo: 'container',
    //         type: 'column'
    //     },
    //     credits: {
    //         enabled: false
    //     },
    //     exporting: {
    //         enabled: false
    //     },
    //     title: {
    //         text: 'Total Brand Retail'
    //     },
    //     xAxis: {
    //         categories: ['July', 'August', 'September', 'October', 'November'], 
    //         title: {
    //             text: 'Months'
    //         }
    //     },
    //     yAxis: {
    //         min: 0,
    //         title: {
    //             text: 'Total Sales'
    //         }
    //     },
    //     legend: {
    //         align: 'right',
    //         x: -100,
    //         verticalAlign: 'top',
    //         y: 20,
    //         floating: true,
    //         backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
    //         borderColor: '#CCC',
    //         borderWidth: 1,
    //         shadow: false
    //     },
    //     // when user hovers over a series or point
    //     tooltip: {
    //         formatter: function () {
    //             return '<b>' + this.x + '</b><br/>' +
    //                 this.series.name + ': $' + this.y + '<br/>' +
    //                 'Total: $' + this.point.stackTotal;
    //         }
    //     },
    //     // pie chart at bottom?
    //     plotOptions: {
    //         column: {
    //             stacking: 'normal',
    //             dataLabels: {
    //                 enabled: false,
    //                 color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
    //             }
    //         },
    //         series: {
    //             cursor: 'pointer',
    //             point: {
    //                 events: {
    //                     click: function () {
    //                         $("#loading").show();

    //                         var month = $(this)[0].category;
    //                         var category = $(this)[0].series.name;

    //                         $("#subchart_container").show();

    //                         // Pull data from Dataset
    //                         var data = ds.rows(function (row) {

    //                             return row.Month === month && row.Team === category;

    //                         }).columns(['Region', 'Sales']).toJSON();

    //                         // Remap Sales to y and Product to name for Highcharts
    //                         $.each(data, function (i, point) {
    //                             point.y = point.Sales;
    //                             point.name = point.Region;
    //                         });

    //                         // Set data into Highcharts
    //                         subchart.series[0].setData(data);

    //                         $("#loading").hide();
    //                     }
    //                 }
    //             }
    //         }
    //     },
    //     series: [{
    //             name: 'East',
    //             data: ds.rows(function (row) {
    //                 return row.Team === 'East';
    //             }).groupBy('Month', ['Sales']).column('Sales').data
    //         }, {
    //             name: 'North',
    //             data: ds.rows(function (row) {
    //                 return row.Team === 'North';
    //             }).groupBy('Month', ['Sales']).column('Sales').data
    //         }, {
    //             name: 'South',
    //             data: ds.rows(function (row) {
    //                 return row.Team === 'South';
    //             }).groupBy('Month', ['Sales']).column('Sales').data
    //         }, {
    //             name: 'West',
    //             data: ds.rows(function (row) {
    //                 return row.Team === 'West';
    //             }).groupBy('Month', ['Sales']).column('Sales').data
    //         }, {
    //             name: 'TopCo & Direct',
    //             data: ds.rows(function (row) {
    //                 return row.Team === 'TopCo & Direct';
    //             }).groupBy('Month', ['Sales']).column('Sales').data
    //         }
    //     ]
    // });


    subchart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
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
                return '<b>' + this.point.name + '</b>:' + this.y;
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
            data: dataPercentage
        }]
    });

    $("#loading").hide();
}

function mflyResume() {
    // On resume, re-initialize dataset
    initDataset();
    $("#subchart_container").hide();
}