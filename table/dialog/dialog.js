angular.module('pieChartPOC')


.controller('DialogCtrl',function ($scope, ngDialog) {
		
	$scope.suppliers = [
		{
		 name: 'Club',
		 id: 1,
		 value: 'club'
		}, 
		{
		 name: 'Multi-Outlet', 
		 id: 2,
		 value: 'multi'
		} 
	];

	$scope.selectedS = {s: null};

	$scope.weeks = [
		{
		 name: '4 Weeks', 
		 id: 1,
		 value: 4
		}, 
		{
		 name: '12 Weeks', 
		 id: 2,
		 value: 12
		}, 
		{
		 name: '52 Weeks', 
		 id: 3,
		 value: 52
		}
	];


	$scope.openSecondDialog = function(selected) {
		console.log("JSON:: ", json);

		// ngDialog.openConfirm({
	 //        template: 'table/dialog/seconddialog.html',
	 //        className: 'ngdialog-theme-default', 
	 //        controller: 'DialogCtrl', 
	 //        scope: $scope
  //   	});
	};

	$scope.closeDialog = function() {
		ngDialog.close();
	};
});
