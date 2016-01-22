angular.module('pieChartPOC')


.controller('DialogCtrl',function ($scope, $rootScope, ngDialog, localStorageService, UtilData) {
		
	$scope.suppliers = [
		{
		 name: 'Club',
		 id: 1
		}, 
		{
		 name: 'Multi-Outlet', 
		 id: 2
		} 
	];

	$scope.weeks = [
		{
		 name: '4 Weeks', 
		 value: 4
		}, 
		{
		 name: '12 Weeks', 
		 value: 12
		}, 
		{
		 name: '52 Weeks', 
		 value: 52
		}
	];


	$scope.ngDialogData = {
		name: null, 
		value: null
	};


	$scope.openSecondDialog = function() {
		
		localStorageService.set('name', $scope.ngDialogData.name);

		ngDialog.openConfirm({
	        template: 'table/dialog/seconddialog.html',
	        className: 'ngdialog-theme-default', 
	        controller: 'DialogCtrl', 
	        scope: $scope
    	});

	};

	$scope.getWeekValue = function() {
	
		localStorageService.set('value', $scope.ngDialogData.value);

		var name      = localStorageService.get('name');
		var value     = localStorageService.get('value');

		UtilData.whichWorkSheet(name, value);

		ngDialog.close();		

	};

	$scope.closeDialog = function() {
		ngDialog.openConfirm({
	        template: 'table/dialog/dialog.html',
	        className: 'ngdialog-theme-default', 
	        controller: 'DialogCtrl', 
	        scope: $scope
    	});
	};

});
