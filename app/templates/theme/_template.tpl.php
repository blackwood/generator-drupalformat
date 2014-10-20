<?php
/**
 * @file
 * Default parent output.
*/
?>
<div id="<?php print $settings['attributes']['id']; ?>" class="<%= pluginName %>">
  <?php print theme('<%= moduleName %>_list', array('items' => $items, 'settings' => $settings)); ?>
</div>
