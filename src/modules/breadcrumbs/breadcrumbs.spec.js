describe('In the breadcrumbs module', function () {
    describe('the directive breadcrumbs', function () {
        var elm, scope;

        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope;
            scope.items = [
                {name: 'personas', path: '/personas'},
                {name: 'characteristics', path: '/characteristics'}
            ];

            elm = angular.element('<div breadcrumb items="items"></div>');
            $compile(elm)(scope);
            scope.$digest();
        }));

        it('should be available', function () {
            expect(elm).toBe('div[breadcrumb]');
        });
    });
});