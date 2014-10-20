<?php

/**
 * @file
 * <%= moduleName %>.theme.inc
 *
 * Implements theme functions for <%= moduleProper %>.
 */

/**
 * Default theme implementation for lists
 */
function theme_<%= moduleName %>_list(&$vars) {
  $items = &$vars['items'];
  $output = '';

  if (!empty($items)) {
    foreach ($items as $i => $item) {
      $output .= theme('<%= moduleName %>_list_item', array(
        'item' => $item['row'],
        'class' => drupal_html_class('item-' . $i),
      ));
    }
  }

  return $output;
}

/**
 * Default theme implementation for parent's items
 */
function theme_<%= moduleName %>_list_item(&$vars) {
  return '<div class="' . $vars['class'] . '">' . $vars['item'] . "</div>";
}

/**
 * Template process parent theme.
 */
function template_process_<%= moduleName %>(&$vars) {
  $instance_id = $vars['settings']['instance'];
  $<%= moduleName %>_id = $vars['settings']['attributes']['id']['default'];
  $vars['settings']['attributes']['id'] = $<%= moduleName %>_id;

  <%= moduleName %>_initiate_instance($instance_id, $<%= moduleName %>_id);
}
