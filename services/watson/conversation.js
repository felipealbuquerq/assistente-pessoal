//Language Translator Watson Third Party Module
var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

var language_translator = new LanguageTranslatorV2({
    username: process.env.LANGUAGE_TRANSLATOR_USERNAME,
    password: process.env.LANGUAGE_TRANSLATOR_PASSWORD,
    url: 'https://gateway.watsonplatform.net/language-translator/api/'
});

