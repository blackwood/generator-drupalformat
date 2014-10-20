<?php

/**
 * @file
 * <%= moduleName %>_views.theme.inc
 */

/**
 * Add helper variables for parent view.
 */
function template_process_<%= moduleName %>_views(&$vars) {
  if (!empty($vars['view'])) {
    $options = $vars['options'];
    $view = $vars['view'];

    $function = !module_exists('variable') ? 'variable_get' : 'variable_get_value';
    // Could add js/css here
    $items = array();
    $row_plugin = $view->style_plugin->row_plugin;
    foreach ($vars['rows'] as $id => $row) {
      $view->row_index = $id;
      $item['row'] = $row_plugin->render($row);

      $items[] = $item;
    }

    // Add the slide items.
    $vars['items'] = $items;

    $options['attributes']['id'] = $vars['options']['id'];
    $vars['settings'] = $options;
  }

  return $vars;
}

/**
 * Theme callback for pager.
 */
function theme_<%= moduleName %>_views_pager($vars) {
  global $pager_page_array, $pager_total;

  $element = $vars['element'];
  $options = $vars['options'];

  $prev_label = (!isset($options['prev_label'])) ? $options['prev_label'] : 'previous';
  $next_label = (!isset($options['next_label'])) ? $options['next_label'] : 'next';

  if ($pager_total[$element] > 1) {
    $items = array(
      array(
        'class' => array('pager-previous'),
        'data' => l(t($prev_label), '', array('attributes' => array('class' => 'previous'), 'external' => TRUE, 'fragment' => 'pre')),
      ),
      array(
        'class' => array('pager-next'),
        'data' => l(t($next_label), '', array('attributes' => array('class' => 'next'), 'external' => TRUE, 'fragment' => 'next')),
      ),
    );

    return theme('item_list', array(
      'items' => $items,
      'attributes' => array('class' => array('pager')),
    ));
  }
}
