'use strict';
var util = require('util'),
  yeoman = require('yeoman-generator'),
  fs = require('fs'),
  _ = require('lodash'),
  _s = require('underscore.string'),
  pluralize = require('pluralize');

var SettingGroupGenerator = module.exports = function SettingGroupGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the setting subgenerator with the argument ' + this.name + '.');

  fs.readFile('generator.json', 'utf8', function(err, data) {
    if (err) {
      console.log('Error: ' + err);
      return;
    }
    this.generatorConfig = JSON.parse(data);
  }.bind(this));
};

util.inherits(SettingGroupGenerator, yeoman.generators.NamedBase);

SettingGroupGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  console.log('\nAdd a setting');

  var prompts = [{
    type: 'input',
    name: 'settingProper',
    message: 'What is the proper name of the setting?',
    default: 'Setting'
  }, {
    type: 'input',
    name: 'settingDesc',
    message: 'What is the description of the setting?',
    default: 'Description of setting'
  }, {
    type: 'input',
    name: 'settingName',
    message: 'What is the (JavaScript) machine name of the setting?',
    default: 'aSetting'
  }, {
    type: 'input',
    name: 'settingFunctionName',
    message: 'What should the snake_case function name be for this setting?',
    default: 'a_setting'
  }, {
    type: 'list',
    name: 'settingType',
    message: 'What is the type of the attribute?',
    choices: ['String', 'Number', 'Boolean'],
    default: 'String'
  }, {
    type: 'input',
    name: 'settingDefault',
    message: 'What is the default value?',
  }, {
    when: function(props) {
      return (/String/).test(props.settingType);
    },
    type: 'input',
    name: 'minLength',
    message: 'Enter the minimum length for the String setting, or hit enter:',
    validate: function(input) {
      if (input && isNaN(input)) {
        return "Please enter a number.";
      }
      return true;
    }
  }, {
    when: function(props) {
      return (/String/).test(props.settingType);
    },
    type: 'input',
    name: 'maxLength',
    message: 'Enter the maximum length for the String setting, or hit enter:',
    validate: function(input) {
      if (input && isNaN(input)) {
        return "Please enter a number.";
      }
      return true;
    }
  }, {
    when: function(props) {
      return (/Number/).test(props.settingType);
    },
    type: 'input',
    name: 'min',
    message: 'Enter the minimum value for the numeric setting, or hit enter:',
    validate: function(input) {
      if (input && isNaN(input)) {
        return "Please enter a number.";
      }
      return true;
    }
  }, {
    when: function(props) {
      return (/Number/).test(props.settingType);
    },
    type: 'input',
    name: 'max',
    message: 'Enter the maximum value for the numeric setting, or hit enter:',
    validate: function(input) {
      if (input && isNaN(input)) {
        return "Please enter a number.";
      }
      return true;
    }
  }, {
    type: 'confirm',
    name: 'again',
    message: 'Would you like to enter another attribute or reenter a previous attribute?',
    default: true
  }];

  this.prompt(prompts, function(props) {
    this.settings = this.settings || [];
    var settingType = props.settingType;
    var settingImplType = props.settingType;
    if (settingType === 'String') {
      settingImplType = 'string';
    } else if (settingType === 'Number') {
      settingImplType = 'number';
    } else if (settingType === 'Boolean') {
      settingImplType = 'boolean';
    }
    this.settings = _.reject(this.settings, function(setting) {
      return setting.settingName === props.settingName;
    });
    this.settings.push({
      settingProper: props.settingProper,
      settingDesc: props.settingDesc,
      settingName: props.settingName,
      settingType: settingType,
      settingImplType: settingImplType,
      settingFunctionName: props.settingFunctionName,
      settingDefault: props.settingDefault,
      minLength: props.minLength,
      maxLength: props.maxLength,
      min: props.min,
      max: props.max
    });

    if (props.again) {
      this.askFor();
    } else {
      cb();
    }
  }.bind(this));
};

SettingGroupGenerator.prototype.files = function files() {

  this.moduleName = this.name;
  this.groups = this.generatorConfig.groups;
  this.groups = _.reject(this.groups, function(group) {
    return group.name === this.name;
  }.bind(this));
  this.groups.push({
    name: this.name,
    settings: this.settings
  });
  this.pluralize = pluralize;
  this.generatorConfig.groups = this.groups;
  this.generatorConfigStr = JSON.stringify(this.generatorConfig, null, '\t');

  var setDir = 'settings/';
  this.mkdir(setDir);
  this.template('_generator.json', 'generator.json');
  this.template('settings/_setting_variable.instance.inc', 'settings/' + this.moduleName + '_variable.instance.inc');
  this.template('settings/_setting_plugin_parent.instance.inc', 'settings/' + this.moduleName + '_plugin_parent.instance.inc');

};