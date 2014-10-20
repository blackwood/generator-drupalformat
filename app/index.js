'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    yosay = require('yosay'),
    fs = require('fs'),
    _ = require('lodash'),
    _s = require('underscore.string'),
    pluralize = require('pluralize');

var DrupalformatGenerator = module.exports = function DrupalformatGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: true });
  });

  this.capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
  }
};

util.inherits(DrupalformatGenerator, yeoman.generators.Base);

DrupalformatGenerator.prototype.askFor = function askFor() {

  console.log('\n' +
    '           ____ _____  __ __ _____  ____   _ \n'+
    '          | _) \\| () )|  |  || ()_)/ () \\ | |__ \n'+
    '          |____/|_|\\_\\ \\___/ |_|  /__/\\__\\|____|\n'+
    '          ____  ____ _____  __  __   ____  _____ \n'+
    '         | ===|/ () \\| () )|  \\/  | / () \\|_   _|\n'+
    '         |__|  \\____/|_|\\_\\|_|\\/|_|/__/\\__\\ |_|  \n'+
    ' ____  ____  __  _  ____ _____   ____  _____  ____ _____ \n'+
    '/ (_,`| ===||  \\| || ===|| () ) / () \\|_   _|/ () \\| () )\n'+
    '\\____)|____||_|\\__||____||_|\\_\\/__/\\__\\ |_|  \\____/|_|\\_\\\n'
    );

  var cb = this.async();

  var prompts = [{
    name: 'moduleName',
    message: 'Module Name: (should be the same as folder):'
  },{
    name: 'moduleProper',
    message: 'Proper name for your Module:'
  },{
    name: 'libraryName',
    message: 'Name of the plugin folder in `sites/all/libraries`:'
  },{
    name: 'pluginName',
    message: 'Machine name for plugin:'
  },{
    name: 'pluginProper',
    message: 'Proper name for Plugin:'
  },{
    name: 'pluginSite',
    message: 'Website for the Plugin:',
  },{
    name: 'relativeScriptpath',
    message: 'Relative Path inside library to the main JS file: (ex. /dist/plugin.min.js)',
  },{
    name: 'relativeStylepath',
    message: 'Relative Path inside library to the main CSS file: (ex. /dist/plugin.min.css)',
  },{
    name: 'pluginInit',
    message: 'name of the initialization method (ex. owlCarousel)'
  },{
    name: 'requiredjQueryVersion',
    message: 'Required Main jQuery Version (ex. 1.5, 1.7, etc.)',
  },{
    name: 'license',
    message: 'add GPL2 license?',
    default: 'Y/n'
  }];

  this.prompt(prompts, function (props) {
    this.moduleName = props.moduleName;
    this.moduleProper = props.moduleProper;
    this.libraryName = props.libraryName;
    this.pluginName = props.pluginName;
    this.pluginProper  = props.pluginProper ;
    this.pluginSite = props.pluginSite;
    this.pluginInit = props.pluginInit;
    this.requiredjQueryVersion = props.requiredjQueryVersion;
    this.relativeScriptpath = props.relativeScriptpath;
    this.relativeStylepath = props.relativeStylepath;
    this.license = props.license;

    this.settingProper = "Test Name";
    this.settingDesc = "This Setting Name";
    this.settingName = "testName";
    this.settingType = "boolean";
    this.settingFunctionName = "test_name";
    this.settingDefault = "FALSE";

    cb();

  }.bind(this));

};

DrupalformatGenerator.prototype.app = function app() {
  var mn = this.moduleName;

  this.template('_template.api.php', mn + '.api.php');
  this.template('_template.info', mn + '.info');
  this.template('_template.install', mn + '.install');
  this.template('_template.module', mn + '.module');
  this.template('_template.variable.inc', mn + '.variable.inc');
  this.template('includes/js/_template.settings.js', 'includes/js/' + mn + '.settings.js');
  this.template('modules/fields/_template_fields.info', 'modules/fields/' + mn + '_fields.info');
  this.template('modules/fields/_template_fields.module', 'modules/fields/' + mn + '_fields.module');
  this.template('modules/ui/_template_ui.admin.inc', 'modules/ui/' + mn + '_ui.admin.inc');
  this.template('modules/ui/_template_ui.info', 'modules/ui/' + mn + '_ui.info');
  this.template('modules/ui/_template_ui.module', 'modules/ui/' + mn + '_ui.module');
  this.template('modules/views/_template_views.info', 'modules/views/' + mn + '_views.info');
  this.template('modules/views/_template_views.module', 'modules/views/' + mn + '+_views.module');
  this.template('modules/views/_template_views.views.inc', 'modules/views/' + mn + '_views.views.inc');
  this.template('modules/views/_template_views_plugin_pager__template.inc', 'modules/views/' + mn + '_views_plugin_pager_' + mn + '.inc');
  this.template('modules/views/_template_views_plugin_style__template.inc', 'modules/views/' + mn + '_views_plugin_style_' + mn + '.inc');
  this.template('modules/views/theme/_template-views.tpl.php', 'modules/views/theme/' + mn + '-views.tpl.php');
  this.template('modules/views/theme/_template_views.theme.inc', 'modules/views/theme/' + mn + '_views.theme.inc');
  this.template('theme/_template.theme.inc', 'theme/' + mn + '.theme.inc');
  this.template('theme/_template.tpl.php', 'theme/' + mn + '.tpl.php');
  if(this.license) {
    this.copy('LICENSE.txt', 'LICENSE.txt');
  }
};