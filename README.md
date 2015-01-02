# generator-drupalformat [![Build Status](https://secure.travis-ci.org/milesblackwood/generator-drupalformat.png?branch=master)](https://travis-ci.org/milesblackwood/generator-drupalformat)

> [Yeoman](http://yeoman.io) generator


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-drupalformat from npm, run:

```bash
npm install -g generator-drupalformat
```

Finally, create your Drupal module folder somewhere in `sites/all/modules`, cd into it and run:

```bash
yo drupalformat
```

### Drupalformat-Specific Notes

You'll be prompted by the generator for a few main things:

Note: Machine names only allow lowercase letters and underscores.

- `Module Name`
(should be the same as folder, also is used as the machine name that precedes each hook)
- `Proper name for your Module`
The proper name, i.e. uppercase, spaces and punctuation allowed.
- `Name of the plugin folder in sites/all/libraries:`
This should be the name of the folder you plan on putting the external library you're integrating in. You can always change this value manually after the fact.
- `Machine name for plugin`
This will be stored within the code as a reference to the plugin, and certain functions will be namespaced with it. Feel free to reuse the module machine name, but unique values will make the code clearer.
- `Proper name for Plugin`
Again, this can be something different or the same as the module machine name, but a descriptive/unique name is preferred if you plan on modifying the generated code.
- `Website for the Plugin`
This is optional, but its always nice to give attribution, and hook_library() will register it. Make sure you read the license, if necessary, to ensure your generated module is not infringing.
- `Relative Path inside library to the main JS file`
For example, if the path to the plugin is sites/all/libraries/dist/plugin.min.js, you should just put /dist/plugin.min.js here. If you need to change the value later/add more files, see hook_library in the main module file.
- `Relative Path inside library to the main CSS file`
For example, if the path to the plugin is sites/all/libraries/dist/plugin.min.css, you should just put /dist/plugin.min.css here.
- `name of the initialization method`
For example if the initialization method is:
```js
$('#element').owlCarousel({ ... options ... });
```
... then you should put `owlCarousel` as the value.
- `Required Main jQuery Version`
Presuming that the plugin requires jQuery, which minimum jQuery version is required.
If you don't require jQuery or don't want to check, simply remove the first 4 lines of the function initiate_instance() in the main .module file.
- `add GPL2 license?`
Optional, takes yes or no.

After you've run the main generator, there's a subgenerator that handles the creation of the variables that the module should handle through the UI.
Generally, this is meant to be for a JavaScript plugin that gets initialized with a JSON object of settings. If this doesn't fit your use case, you can feel free to forgo using the UI submodule entirely.

This can't be run outside of the root directory of the module you've already generated.

It takes one argument, which is the machine name of the module you've already provided. Again, this should be the same as your module folder name, as per Drupal conventions.

```bash
yo drupalformat:setting [modulename]
```

This will get recursively called so you can add as many settings as required. The required options are:

- `What is the proper name of the setting?`
The user will see this name in the UI when altering this value.
- `What is the description of the setting?`
The user will see this description in the UI when altering this value.
- `What is the (JavaScript) machine name of the setting?`
This should be the same as it appears in the JSON initialization object.
- `What should the snake_case function name be for this setting?`
For use by PHP in function and table naming.
- `What is the type of the attribute? `
Here you'll be prompted to select one of these options:
String
Number
Boolean
- `What is the default value?`
Provide a default value for the setting. This is useful if you want to provide defaults that the plugin doesn't have. You can also enter those values here if you wish.

If you've chosen string, you'll see these prompts.
- `Enter the minimum value for the numeric setting, or hit enter:`
- `Enter the maximum value for the numeric setting, or hit enter:`

If you've choen number, you'll see these prompts.
- `Enter the minimum length for the String setting, or hit enter:`
- `Enter the maximum length for the String setting, or hit enter:`

Then you'll be prompted if you want to enter another settings value:
- `Would you like to enter another attribute or reenter a previous attribute?`

When you're finished, you'll be asked if you want to overwrite generator.json, which is expected. Follow the prompt to overwrite.

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
