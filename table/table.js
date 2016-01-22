angular.module('pieChartPOC')

.controller('TableCtrl', function($scope, $rootScope, UtilData, ngDialog, localStorageService){

    $scope.isActive = function(route) {
        return route === $location.path();
    };

    var name      = localStorageService.get('name');
    var value     = localStorageService.get('value');
    var savedData = localStorageService.get('savedData');

    $scope.sortType    = 'Supplier';
    $scope.sortReverse = false;
    $scope.searchData  = '';        
    $scope.tableData = savedData;

    $scope.outlet = name;
    $scope.weeks = value;

});