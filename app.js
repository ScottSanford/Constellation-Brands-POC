angular.module("pieChartPOC", [
        'ngRoute', 
        'ngAnimate', 
        'ngDialog'
        ])

        .config(function ($routeProvider, $compileProvider) { 
              $compileProvider.imgSrcSanitizationWhitelist(/^(mfly:\/\/data\/entry|http:\/\/)/);  
              $routeProvider
                .when('/', {
                    templateUrl: 'chart/chart.html', 
                    controller: 'ChartCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
          })
        