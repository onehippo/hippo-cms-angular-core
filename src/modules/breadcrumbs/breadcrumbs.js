(function () {
    "use strict";

    angular.module('hippo.cms')

    /**
     * @ngdoc directive
     * @name hippo.cms.directive:breadcrumb
     * @restrict A
     *
     * @description
     * Displays a breadcrumb with the data provided. Best to be used in combination with the
     * {@link hippo.theme.service:URLParser URLParser service}.
     *
     * @scope
     * @param {Array} source object containing the breadcrumb items to be displayed
     */
            .directive('breadcrumb', ['URLBuilder', function (buildUrl) {
                return {
                    restrict: 'A',
                    replace: true,
                    templateUrl: buildUrl('hippo-cms-angular-core', 'modules/breadcrumbs/breadcrumb.html'),
                    scope: {
                        items: '='
                    }
                };
            }]);
})();