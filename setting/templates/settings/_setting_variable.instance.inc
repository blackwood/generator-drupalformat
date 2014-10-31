<?php

/**
 * Implements hook_variable_info().
 */
function <%= moduleName %>_variable_info($options) {
  <% _.each(settings, function (setting) { %>
  $variable['<%= moduleName %>_<%= setting.settingFunctionName %>_[instance_id]'] = array(
    'type' => 'multiple',
    'title' => t('<%= setting.settingName %>', array(), $options),
    'description' => t('<%= setting.settingDesc %>', array(), $options),
    'repeat' => array(
      'type' => '<%= setting.settingImplType %>',
      <% if (setting.settingType === "String") { %>
      'default' => '<%= setting.settingDefault %>',
      <% } else { %>
      'default' => <%= setting.settingDefault %>,
      <% } %>
    ),
    'group' => '<%= moduleName %>',
  );
  <% }); %>
  return $variable;
}