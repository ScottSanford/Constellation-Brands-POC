angular.module('pieChartPOC')


.factory('Dialog',function (ngDialog) {

	return {

		// pass $scope into function arguments
		create: function(tmpl, clName, ctrl, s) {
			ngDialog.openConfirm({
                template: tmpl,
                className: clName, 
                controller: ctrl, 
                scope: s
            });
		}

}
});
