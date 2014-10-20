<?php

/**
 * @file
 * <%= moduleName %>_views.views.inc
 */

/*
 * Implements hook_views_plugins().
 */
function <%= moduleName %>_views_views_plugins() {
  return array(
    'style' => array(
      '<%= moduleName %>' => array(
        'title' => t('<%= moduleProper %>'),
        'help' => t('Displays the view output with <%= pluginName %> applied.'),
        'help topic' => '',
        'handler' => '<%= moduleName %>_views_plugin_style_<%= moduleName %>',
        'theme' => '<%= moduleName %>_views',
        'theme file' => '<%= moduleName %>_views.theme.inc',
        'theme path' => drupal_get_path('module', '<%= moduleName %>_views') . '/theme',
        'uses row plugin' => TRUE,
        'uses fields' => TRUE,
        'uses options' => TRUE,
        'type' => 'normal',
        'even empty' => FALSE,
      ),
    ),
    'pager' => array(
      '<%= moduleName %>_views_pager' => array(
        'title' => t('Paged output, parent'),
        'help' => t('Provides a pager for view output.'),
        'help topic' => '',
        'handler' => '<%= moduleName %>_views_plugin_pager_<%= moduleName %>',
        'theme' => '<%= moduleName %>_views_pager',
        'theme file' => '<%= moduleName %>_views.theme.inc',
        'theme path' => drupal_get_path('module', '<%= moduleName %>_views') . '/theme',
        'uses options' => TRUE,
        'parent' => 'full',
      ),
    ),
  );
}
