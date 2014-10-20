<?php

/**
 * @file
 * <%= moduleName %>_views_plugin_style_<%= moduleName %>.inc
 */

/**
 * Implements a style type plugin for the Views module.
 */
class <%= moduleName %>_views_plugin_style_<%= moduleName %> extends views_plugin_style {

  /**
   * Set default options.
   */
  function option_definition() {
    $options = parent::option_definition();

    $options['instance'] = array('default' => 'default');
    return $options;
  }

  /**
   * Show a form to edit the style options.
   */
  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
    // Parent instances.
    $keys = <%= moduleName %>_instance_callback_list();

    $form['settings'] = array(
      '#type' => 'fieldset',
      '#title' => t('<%= moduleProper %>'),
    );
    $form['settings']['instance'] = array(
      '#title' => t('Options Set'),
      '#type' => 'select',
      '#description' => t('Settings to apply to this <%= pluginProper %> instance.'),
      '#options' => $keys,
      '#default_value' => $this->options['instance'],
    );
  }

  /**
   * Additionally format saved instance.
   */
  function options_submit(&$form, &$form_state) {
    $settings = $form_state['values']['style_options'];
    $config = array_merge($settings['settings']);

    // Keep default value structure.
    $form_state['values']['style_options'] = $config;
  }

  /**
   * Render display.
   */
  function render() {
    $id = drupal_html_id('<%= moduleName %>-' . $this->view->current_display . $this->view->vid);
    $this->options['id']['default'] = $id;
    // Group results.
    $rows = $this->render_grouping($this->view->result, $this->options['grouping']);

    $output = '';
    foreach ($rows as $title => $row) {
      $output .= theme($this->theme_functions(),
        array(
          'view' => $this->view,
          'options' => $this->options,
          'rows' => $row,
          'title' => $title
        )
      );
    }

    return $output;
  }
}
