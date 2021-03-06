/**
 * @file
 * Initiate <%= pluginProper %>.
 */

(function($) {

  Drupal.behaviors.<%= moduleName %> = {
    attach: function(context, settings) {

      for (var parent in settings.<%= moduleName %>) {
        // Parent instance.
        var par = $('#' + parent);

        // Attach instance settings.
        par.<%= pluginInit %>(settings.<%= moduleName %>[parent].settings);

      }
    }
  };

}(jQuery));
