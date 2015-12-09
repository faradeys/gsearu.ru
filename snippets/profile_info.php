<?php
$get_id = $_GET['id'];
$user_all = $modx->getAuthenticatedUser();
if (isset($user_all)){
  $user_id = $user_all -> get('id');
  $internalKey = $user_all->getOne('Profile')->get('internalKey');
  $sites = $modx->runSnippet('userProfile', array('class'=>'profile','type'=>'website'));
  $interests = $modx->runSnippet('userProfile', array('class'=>'extended','type'=>'interests'));
  $projects = $modx->runSnippet('userProfile', array('class'=>'extended','type'=>'id_doc'));
}
$alias_page = $modx->resource->get('alias');
$r1 =  mysql_fetch_array(mysql_query("SELECT id FROM gsearu_ha_user_services WHERE internalKey = $internalKey "));
if ($get_id == $user_id) {
  if (empty($r1)) {
    $red = '<a class="edit_profile" href="#">Редактировать профиль</a>';
    if(isset($bot)){
      echo '<div class="bot_mask">
              <a class="add_img" href="#">Загрузить обложку</a>
            </div>';
    }
  }
  if(isset($top)){
    echo '<div class="top_mask">
            '.$red.'<a class="logout" href="'.$alias_page.'?hauth_action=logout">Выйти</a>
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
    echo '<a class="fav">'.$value.'</a>';
  }
  echo '';
}
if (isset($project) and !empty($projects)) {
  echo '<div class="title_pr_a">УЧАСТВУЕТ В ПРОЕКТАХ</div><div class="projects_block">';
  $arr = explode(',', $projects);
  foreach ($arr as $value) {
    $res = $modx->getObject('modResource',$value);
    echo $modx->getChunk('tpl_profile_project',array(
   'title' => $res->get('pagetitle'),'project_rating' => $res->getTVValue('project_rating'),'project_preview' => $res->getTVValue('project_preview'),'id' => $value,''));
  }
  echo '</div>';
}
if (isset($innovator)) {
  if(isset($page)){
    $id_page = $page;
  }
  else {
    $id_page = $modx->resource->get('id');
  }
  $r1 =  mysql_query("SELECT * FROM gsearu_users WHERE id != 1 ");
  while ($row = mysql_fetch_array($r1)) {
    $id = $row['id'];
    $user = $modx->getObject('modUser',array('id' => $id ));
    $profile = $user->getOne('Profile');
    $extended = $profile->get('extended')['id_doc'];
    if(isset($extended)){
      $arr = explode(',', $extended);
      $emn = in_array($id_page, $arr);
      if(!empty($emn)){
        if($innovator == 1) {
          echo '<a style="background-image:url(\''.htmlspecialchars($profile->get('photo'), ENT_QUOTES).'\');" href="profile.html?id='.$id.'"></a>
                <div class="name">'.$profile->get('fullname').'</div>';
        }
        if($innovator == 2) {
          echo '<div style="background-image:url(\''.htmlspecialchars($profile->get('photo'), ENT_QUOTES).'\')" class="img"></div>
    			      <div class="name">'.$profile->get('fullname').'</div>';
        }
      }
      unset($arr);
    }
  }
}