(function () {
    'use strict';

    angular.module('hippo.cms')
            .config(['hippo.plugins.urlProvider', function (URLBuilderProvider) {
                URLBuilderProvider.useRoot('hippo-cms');
            }]).run(['$httpBackend', function ($httpBackend) {
                $httpBackend.whenGET(/en\.json$/).respond({});
            }]);

})();