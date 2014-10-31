<?php

/**
 * Implements hook_variable_info().
 */
function <%= moduleName %>_variable_info($options) {

  <% _.each(settings, function (setting) { %>

    $variable['<%= moduleName %>_items_[instance_id]'] = array(
      'type' => 'multiple',
      'title' => t('<%= settingName %>', array(), $options),
      'description' => t('<%= settingDesc %>', array(), $options),
      'repeat' => array(
        'type' => '<%= settingType %>',
        'default' => <%= settingDefault %>,
      ),
      'group' => '<%= moduleName %>',
    );

    return $variable;

  <% }); %>

}