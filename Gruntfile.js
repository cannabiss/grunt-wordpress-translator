module.exports = function (grunt) {
  var fs = require('fs');
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

  grunt.initConfig({pkg: grunt.file.readJSON('package.json')});

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'translate:ru'
  ]);

  /**
   * Translate *.pot from Yandex-translate
   * language codes: https://tech.yandex.ru/translate/doc/dg/concepts/langs-docpage/
   * API: https://tech.yandex.ru/translate/doc/dg/concepts/api-overview-docpage/
   * @params:
   * translateLanguage string (Grunt argument) - Code language
   * @Description:
   * basePath string - the path to the translation file
   * translateKey string - API key
   * apiUrl string - params GET request
   * @Example: grunt translate:ru
   * Generate file language_yandex.po
   */
  grunt.registerTask('translate', 'Machine translation *.pot', function (translateLanguage) {

    if (arguments.length === 0)
      grunt.fail.fatal('Please, specify target language: grunt translate:[language code]');

    var settings = {
      basePath: 'languages/',
      translateKey: '',
      apiUrl: 'https://translate.yandex.net/api/v1.5/tr.json/translate'
    };

    if (!settings.translateKey)
      grunt.fail.fatal('Please, specify an access key to API Yandex translate!');

    var templatePath = function (template, type) {
      return settings.basePath + template + '.' + type;
    };

    var trim = function (str) {
      return str.replace(/^\s+|\s+$/g, "");
    };

    var getTranslation = function (text) {
      var xhr = new XMLHttpRequest();
      var errorCodes = {
        401: 'Wrong key API',
        402: 'The key of API is blocked',
        403: 'Daily restriction on amount of inquiries is exceeded',
        404: 'Daily restriction on the volume of the translated text is exceeded',
        413: 'The most admissible size of the text is exceeded',
        422: 'The text can\'t be translated',
        501: 'The set translation direction isn\'t supported'
      };

      xhr.open('GET', settings.apiUrl + '?key=' + settings.translateKey + '&text=' + text + '&lang=en-' + translateLanguage, false);
      xhr.send();
      grunt.log.ok('Translate[en-' + translateLanguage + ']->"' + text + '";');

      if (xhr.status != 200) {
        grunt.fail.warn(xhr.status + ': ' + errorCodes[xhr.status]);
      } else {
        return JSON.parse(xhr.responseText).text[0];
      }
    };

    var lineTranslation = function (line) {
      var substr = trim(line.substr(0, 6));

      switch (substr) {
        case 'msgid':
          var curVal = line.split('"')[1].indexOf('{{') == -1 && line.split('"')[1].indexOf('_') == -1 ? line.split('"')[1] : '';
          line += '\n' + 'msgstr ';
          if (curVal) line += '"' + getTranslation(curVal) + '"';
          else line += '""';
          line += '\n';
          break;
        case 'msgstr':
          line = '';
          break;
        default:
          line += '\n';
          break
      }

      return line;
    };

    fs.readFileSync(templatePath('/pot/example', 'pot'), 'utf8').toString().split('\n').forEach(function (line) {
      fs.appendFileSync(templatePath('/po/' + translateLanguage, 'po'), lineTranslation(line), encoding = 'utf8');
    });

    grunt.log.ok('Done: Generated translation template with names: ' + translateLanguage + '.po!');
  });
};
