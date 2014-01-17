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
        .controller('hippo.cms.TopBarCtrl', ['$scope', 'hippo.cms.UserNavigation', function ($scope, UserNavigation) {
            $scope.tabs = UserNavigation.getAll();
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
        .directive('hippo.cms.topBar', ['hippo.plugins.url', function (buildUrl) {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: buildUrl('hippo-cms', 'modules/top-bar/top-bar.html')
            };
        }]);
}());