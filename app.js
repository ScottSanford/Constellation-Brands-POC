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
                .when('/', {
                    templateUrl: 'beginning/beginning.html', 
                    controller: 'BeginningCtrl'
                })  
                .when('/dialog', {
                    templateUrl: 'dialog/dialog-container.html', 
                    controller: 'DialogContainerCtrl'
                })   
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
                    redirectTo: '/'
                });
        });