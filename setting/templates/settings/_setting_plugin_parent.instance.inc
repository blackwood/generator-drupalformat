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
      <% _.each(settings, function (setting) { %>
      <% if (setting.settingType === "Number") { %>
      '<%= setting.settingName %>' => (int)$function('<%= moduleName %>_<%= setting.settingFunctionName %>_' . $instance),
      <% } else if (setting.settingType === "String") { %>
      '<%= setting.settingName %>' => $function('<%= moduleName %>_<%= setting.settingFunctionName %>_' . $instance),
      <% } else { %>
      '<%= setting.settingName %>' => (<%= setting.settingImplType %>)$function('<%= moduleName %>_<%= setting.settingFunctionName %>_' . $instance),
      <% } %>
      <% }); %>
    );

    // Update settings cache.
    cache_set('<%= moduleName %>_' . $instance, $settings, 'cache');
  }

  return $settings;
}