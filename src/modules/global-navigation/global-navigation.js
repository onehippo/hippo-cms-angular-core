(function () {
    "use strict";

    angular.module('hippo.cms')

    /**
     * @ngdoc object
     * @name hippo.cms.controller:GlobalNavigationCtrl
     *
     * @description
     * Loads the translation files
     */
            .controller('_hippo.cms.GlobalNavigationCtrl',
                    ['$scope', '$rootScope', 'hippo.theme.URLParser', '$state', 'hippo.cms.PageTitle', 'hippo.cms.UserNavigation', 'hippo.cms.Perspectives',
                        function ($scope, $rootScope, URLParser, $state, PageTitle, UserNavigation, Perspectives) {
                            // keep track of the state
                            $scope.state = $state;
                            $scope.pageTitle = PageTitle;
                            $scope.navigation = {
                                parentState: Perspectives.active(),
                                currentState: $state.current
                            };
                            $scope.userNavigationItems = UserNavigation.getAll();
                            $scope.perspectives = Perspectives.list();
                            $scope.home = Perspectives.active();
                            $scope.plugin = 'hippo-cms';

                            $rootScope.$on('$stateChangeSuccess', function () {
                                $scope.navigation.parentState = URLParser.getParent();
                            });

                            // get state url
                            $scope.getStateUrl = function (state) {
                                return $state.href(state);
                            };

                            // to the parent state
                            $scope.goBack = function () {
                                if ($scope.navigation.parentState == null) {
                                    $state.go($scope.home);
                                } else {
                                    $state.go($scope.navigation.parentState.name);
                                }
                            };
                        }])

    /**
     * @ngdoc directive
     * @name hippo.cms.directive:globalNavigation
     * @restrict A
     *
     * @description
     * Displays the Global Navigation
     */
            .directive('hippo.cms.globalNavigation', ['hippo.plugins.url', function (buildUrl) {
                return {
                    restrict: 'A',
                    replace: true,
                    templateUrl: buildUrl('hippo-cms', 'modules/global-navigation/global-navigation.html')
                };
            }])

    /**
     * @ngdoc filter
     * @name hippo.cms.filter:truncate
     * @function
     *
     * @description
     * Truncate Filter. Source from to http://jsfiddle.net/tUyyx/
     *
     * @returns {String} The truncated version of the original string
     */
            .filter('hippo.cms.truncate', function () {
                return function (text, length, end) {
                    if (isNaN(length)) {
                        length = 10;
                    }

                    if (end === undefined) {
                        end = "...";
                    }

                    if (text.length <= length || text.length - end.length <= length) {
                        return text;
                    }
                    else {
                        return String(text).substring(0, length - end.length) + end;
                    }

                };
            });

})();