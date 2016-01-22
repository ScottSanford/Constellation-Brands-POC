angular.module("pieChartPOC", [
        'ngRoute', 
        'ngAnimate', 
        'ngDialog', 
        'angularUtils.directives.dirPagination', 
        'LocalStorageModule'
        ])

        .config(function ($routeProvider, $compileProvider) { 
              $compileProvider.imgSrcSanitizationWhitelist(/^(mfly:\/\/data\/entry|http:\/\/)/);  
              $routeProvider
                .when('/sales', {
                    templateUrl: 'sales/sales.html', 
                    controller: 'SalesCtrl'
                })                
                .when('/units', {
                    templateUrl: 'units/units.html', 
                    controller: 'UnitsCtrl'
                })
                .when('/table', {
                    templateUrl: 'table/table.html', 
                    controller: 'TableCtrl'
                })                
                .otherwise({
                    redirectTo: '/sales'
                });
        });