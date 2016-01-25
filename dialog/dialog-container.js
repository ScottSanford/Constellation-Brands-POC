angular.module('pieChartPOC')


.controller('DialogContainerCtrl', function($scope, ngDialog) {
	
	ngDialog.openConfirm({
        template: 'dialog/dialog.html',
        className: 'ngdialog-theme-default', 
        controller: 'DialogCtrl', 
        scope: $scope, 
        showClose: false
   	});

});
