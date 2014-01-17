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