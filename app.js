angular.module("pieChartPOC", [
        'ngRoute', 
        'ngAnimate', 
        'ngDialog', 
        'angularUtils.directives.dirPagination'
        ])

        .config(function ($routeProvider, $compileProvider) { 
              $compileProvider.imgSrcSanitizationWhitelist(/^(mfly:\/\/data\/entry|http:\/\/)/);  
              $routeProvider
                .when('/table', {
                    templateUrl: 'table/table.html', 
                    controller: 'TableCtrl'
                })                
                .when('/sales', {
                    templateUrl: 'sales/sales.html', 
                    controller: 'SalesCtrl'
                })                
                .when('/units', {
                    templateUrl: 'units/units.html', 
                    controller: 'UnitsCtrl'
                })
                .otherwise({
                    redirectTo: '/table'
                });
        });