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