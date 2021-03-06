'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var React6Generator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'You\'re using the fantastic ' + chalk.red('React-6') + ' generator. Write React apps in es6 now!'
    ));

    var prompts = [{
      type: 'input',
      name: 'project',
      message: 'What is the project\'s name?',
      default: this.appname
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name: 'Bootstrap',
        value: 'includeBootstrap',
        checked: true
      }, {
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: true
      }, {
        name: 'Jest for unit tests',
        value: 'includeJest',
        checked: true
      }]
    }];

    this.prompt(prompts, function (answers) {
      var features = answers.features || [];

      this.projectName = answers.project;

      function hasFeature(feat) { return features.indexOf(feat) !== -1; }

      this.includeBootstrap = hasFeature('includeBootstrap');
      this.includeModernizr = hasFeature('includeModernizr');
      this.includeJest = hasFeature('includeJest');

      this.config.set('includeJest', this.includeJest);
      done();
    }.bind(this));
  },

  writing: function() {
    this._copyTpl('_package.json', 'package.json');
    this._copyTpl('_gulpfile.js', 'gulpfile.js');
    this._copyTpl('_bower.json', 'bower.json');
    this._copy('bowerrc', '.bowerrc');
    this._copy('gitignore', '.gitignore');
    this._copy('editorconfig', '.editorconfig');

    this._copyTpl('app/index.html', 'app/index.html');
    this._copy('app/favicon.ico', 'app/favicon.ico');
    this._copy('app/robots.txt', 'app/robots.txt');

    this._copyTpl('app/main.scss', 'app/styles/main.scss');
    this._copy('app/app.js', 'app/scripts/app.js');
    this._copyTpl('app/home.js', 'app/scripts/components/home.js');

    if (this.includeJest)
      this._copy('app/home-test.js', 'app/scripts/components/__tests__/home-test.js');
  },

  _copy: function(from, to) {
    this.fs.copy(this.templatePath(from), this.destinationPath(to));
  },

  _copyTpl: function(from, to) {
    this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this);
  },

  install: function() {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});

module.exports = React6Generator;
