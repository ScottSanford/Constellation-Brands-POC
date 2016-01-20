angular.module('pieChartPOC')


.controller('DialogCtrl',function ($scope) {
	$scope.close = function() {
		$scope.closeThisDialog();
	}
});
