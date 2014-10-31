<?php

/**
 * Return settings array or default.
 *
 * @param string $instance
 *  Parent instance settings machine name.
 */
function _<%= moduleName %>_return_parent_instance_settings($instance = '<%= moduleName %>_settings_default') {
  if ($settings_cache = cache_get('<%= moduleName %>_' . $instance)) {
    $settings = $settings_cache->data;
  }
  else {
    $function = !module_exists('variable') ? 'variable_get' : 'variable_get_value';

    $settings = array(
      // Okay, so here's an example of what we need:
        <% _.each(settings, function (setting) { %>
            '<% setting.settingName %>' => (<%= setting.settingType %>)$function('<%= setting.moduleName %>_<%= setting.settingFunctionName %>_' . $instance),
        <% }); %>
    );

    // Update settings cache.
    cache_set('<%= moduleName %>_' . $instance, $settings, 'cache');
  }

  return $settings;
}