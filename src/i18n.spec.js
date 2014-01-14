// asynchronous translation loader workaround
// credits to emiaj: https://gist.github.com/emiaj/7209915
beforeEach(function() {
    var DEFAULT_LANG = 'en';
    var DEFAULT_TRANSLATIONS = {};
    var MODULE_NAME = 'hippo.cms'; // module where the translation is configured

    module(MODULE_NAME, function config($translateProvider) {
        $translateProvider.translations(DEFAULT_LANG, DEFAULT_TRANSLATIONS);
        $translateProvider.preferredLanguage(DEFAULT_LANG);
    });
});
