'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    yosay = require('yosay'),
    fs = require('fs'),
    _ = require('lodash'),
    _s = require('underscore.string'),
    pluralize = require('pluralize');

var DrupalformatGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

  console.log('\n' +
    '           ____ _____  __ __ _____  ____   _ \n'+
    '          | _) \| () )|  |  || ()_)/ () \ | |__ \n'+
    '          |____/|_|\_\ \___/ |_|  /__/\__\|____|\n'+
    '          ____  ____ _____  __  __   ____  _____ \n'+
    '         | ===|/ () \| () )|  \/  | / () \|_   _|\n'+
    '         |__|  \____/|_|\_\|_|\/|_|/__/\__\ |_|  \n'+
    ' ____  ____  __  _  ____ _____   ____  _____  ____ _____ \n'+
    '/ (_,`| ===||  \| || ===|| () ) / () \|_   _|/ () \| () )\n'+
    '\____)|____||_|\__||____||_|\_\/__/\__\ |_|  \____/|_|\_\\n'
    );

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('app');
      this.dest.mkdir('app/templates');

      this.src.copy('_package.json', 'package.json');
      this.src.copy('_bower.json', 'bower.json');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = DrupalformatGenerator;
