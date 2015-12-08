<?php
$get_id = $_GET['id'];
$user_all = $modx->getAuthenticatedUser();
if (isset($user_all)){
  $user_id = $user_all -> get('id');
  $internalKey = $user_all->getOne('Profile')->get('internalKey');
}
$alias_page = $modx->resource->get('alias');
$r1 =  mysql_fetch_array(mysql_query("SELECT id FROM gsearu_ha_user_services WHERE internalKey = $internalKey "));
if ($get_id == $user_id and !empty($r1)) {
  if(isset($top)){
    echo '<div class="top_mask">
      <a class="edit_profile" href="#">Редактировать профиль</a><a class="logout '.$r1.'" href="'.$alias_page.'?hauth_action=logout">Выйти</a>
    </div>';
  }
}