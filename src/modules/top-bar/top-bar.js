(function () {
    "use strict";

    angular.module('hippo.cms')

        /**
         * @ngdoc object
         * @name hippo.cms.controller:TopBarCtrl
         *
         * @description
         * Loads the translation files
         */
        .controller('TopBarCtrl', ['$scope', 'UserNavigationItems', function ($scope, UserNavigationItems) {
            $scope.tabs = UserNavigationItems.getAll();
            $scope.activeTabUrl = '';
        }])

        /**
         * @ngdoc directive
         * @name hippo.cms.directive:topBar
         * @restrict A
         *
         * @description
         * Displays the Top Bar
         */
        .directive('topBar', ['URLBuilder', function (buildUrl) {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: buildUrl('hippo-cms-angular-core', 'modules/top-bar/top-bar.html')
            };
        }]);
}());