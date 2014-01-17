(function () {
    "use strict";

    angular.module('hippo.cms',
            ['ngCookies', 'ui.router', 'ui.bootstrap', 'pascalprecht.translate', 'hippo.theme'])

        /**
         * @ngdoc object
         * @name hippo.cms:config
         *
         * @description
         * Configuration for the Hippo application. Sets up the routes and translations.
         * */
        .config(['$translateProvider', '$translatePartialLoaderProvider',
            function ($translateProvider, $translatePartialLoaderProvider) {

                // i18n
                $translatePartialLoaderProvider.addPart('components/hippo-cms/dist');
                $translateProvider.useMissingTranslationHandlerLog();
                $translateProvider.useLoader('$translatePartialLoader', {
                    urlTemplate: '{part}/i18n/{lang}.json'
                });
                $translateProvider.preferredLanguage('en');
            }])

        /**
         * Application initialization
         *
         * Global $rootScope events
         *  - doLayout trigger layout re-rendering
         */
        .run(['$rootScope', '$translate', '$cookies', function ($rootScope, $translate, $cookies) {
            // default language
            if ($cookies['angular-locale']) {
                $translate.uses($cookies['angular-locale']);
            }

            // refresh translation map when async parts are loaded
            $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
                $translate.refresh();
            });

            // max-height of page content
            $rootScope.$on('$viewContentLoaded', function () {
                doLayout();
            });
            $rootScope.$on('doLayout', function () {
                doLayout();
            });

            $(window).on('resize', doLayout);
            $(window).on('hashchange', doLayout);

            // layout
            function doLayout() {
                var topBarOuterHeight = $('#top-bar').outerHeight();

                var calculatedHeight = $(window).height() - topBarOuterHeight - 2;

                $('.page-detail .detail-row-container').css({
                    height: calculatedHeight
                });

                // sidebar height for iOS7
                if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)) {
                    var sidebarHeight = $(window).innerHeight() - topBarOuterHeight - 20;
                    $('.sidebar').height(sidebarHeight);
                }

                // sidebar content height
                if (IE.isTheBrowser) {
                    var sidebarContentHeight = $(window).height() - topBarOuterHeight - $('.sidebar .bottom').outerHeight() - 2;
                    $('.sidebar .content').height(sidebarContentHeight);
                }
            }

        }]);

}());

//@ sourceURL=app/hippo-cms.js
(function () {
    "use strict";

    angular.module('hippo.cms')

    /**
     * @ngdoc provider
     * @name hippo.cms.provider:Perspectives
     *
     * @description
     * Perspectives extension point.
     */
            .provider('hippo.cms.Perspectives', [function () {
                var perspectives = [
                    {
                        state: 'dashboard',
                        title: 'GLOBAL_NAVIGATION.HOME',
                        icon: 'fa-home'
                    },
                    {
                        state: 'channel-manager',
                        title: 'GLOBAL_NAVIGATION.CHANNEL_MANAGER',
                        icon: 'fa-desktop'
                    },
                    {
                        state: 'documents',
                        title: 'GLOBAL_NAVIGATION.DOCUMENTS',
                        icon: 'fa-folder'
                    }
                ], active = 'dashboard';

                this.add = function addPerspective(state, perspective) {
                    perspectives.push({
                        state: state,
                        title: perspective.title,
                        icon: perspective.icon
                    });
                };

                this.activate = function activate(name) {
                    active = name;
                };

                this.$get = function () {
                    return {
                        active: function () {
                            return active;
                        },

                        list: function () {
                            return perspectives;
                        }
                    };
                };
            }])


    /**
     * @ngdoc service
     * @name hippo.cms.service:Tabs
     *
     * @description
     * Information for each item in the User navigation
     */
            .provider('hippo.cms.UserNavigation', [function () {

                var menuItems = [];

                this.addItem = function (item) {
                    menuItems.push(item);
                };

                this.$get = function () {
                    var userNavigationService = {};
                    userNavigationService.getAll = function () {
                        return menuItems;
                    };

                    return userNavigationService;
                };
            }])

    /**
     * @ngdoc service
     * @name hippo.app.service:PageTitle
     *
     * @description
     * Keeps track of the current page title.
     */
            .service('hippo.cms.PageTitle', [function () {
                return { value: '' };
            }])

            .run(['$state', 'hippo.cms.Perspectives', function ($state, Perspectives) {

                // default state
                $state.transitionTo(Perspectives.active());
            }]);

})();
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
            .directive('hippo.cms.breadcrumb', ['hippo.plugins.url', function (buildUrl) {
                return {
                    restrict: 'A',
                    replace: true,
                    templateUrl: buildUrl('hippo-cms', 'modules/breadcrumbs/breadcrumb.html'),
                    scope: {
                        items: '='
                    }
                };
            }]);
})();
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