<?php

/**
 * @file
 * API documentation for <%= moduleProper %>.
 */

/**
 * Implements hook_<%= moduleName %>_settings_alter().
 *
 * @param array
 *   Instance settings.
 * @param string
 *   <%= pluginProper %> identifier.
 */
function hook_<%= moduleName %>_settings_alter(&$settings, $instance) {
  switch ($instance) {
    case '<%= moduleName %>_settings_default':
      //
      break;
  }
}
