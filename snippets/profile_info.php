<?php
$get_id = $_GET['id'];
$user_all = $modx->getAuthenticatedUser();
if (isset($user_all)){
  $user_id = $user_all -> get('id');
  $internalKey = $user_all->getOne('Profile')->get('internalKey');
  $sites = $modx->runSnippet('userProfile', array('class'=>'profile','type'=>'website'));
  $interests = $modx->runSnippet('userProfile', array('class'=>'extended','type'=>'interests'));
}
$alias_page = $modx->resource->get('alias');
$r1 =  mysql_fetch_array(mysql_query("SELECT id FROM gsearu_ha_user_services WHERE internalKey = $internalKey "));
if ($get_id == $user_id and !empty($r1)) {
  if(isset($top)){
    echo '<div class="top_mask">
      <a class="edit_profile" href="#">Редактировать профиль</a><a class="logout '.$r1.'" href="'.$alias_page.'?hauth_action=logout">Выйти</a>
    </div>';
  }
  if(isset($bot)){
    echo '<div class="bot_mask">
            <a class="add_img" href="#">Загрузить обложку</a>
          </div>';
  }
}
if (isset($site) and !empty($sites)) {
  echo '<div class="title_pr_a">ССЫЛКИ</div><div class="links">';
  $arr = explode(',', $sites);
  foreach ($arr as $value) {
    echo '<a target="_blank" href="http://'.$value.'">'.$value.'</a>';
  }
  echo '</div>';
}
if (isset($interes) and !empty($interests)) {
  echo '<div class="title_pr_a">ИНТЕРЕСЫ</div>';
  $arr = explode(',', $interests);
  foreach ($arr as $value) {
    echo '<a class="fav" href="#">'.$value.'</a>';
  }
  echo '';
}
