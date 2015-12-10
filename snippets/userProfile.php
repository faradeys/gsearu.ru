<?php
// получаем шаблон
//$tpl = $modx->getOption('tpl',$scriptProperties,'userProfileTpl');
// получаем значение переменной "user" из _GET
if (isset($user_id)) {
  $userId = $user_id;
}
else {
  $userId = intval($_GET["id"]);
}

if($userId == 0){return;}
// формируем запрос для загрузки информации из БД
$user = $modx->getObject('modUser',array('active' => true, 'id' => $userId ));
if($user == null){return;}
$profile = $user->getOne('Profile');
$extended = $profile->get('extended');
// копируем данные в массив.
$data = array();
$data['user'] = $user->toArray();
$data['profile'] = $profile->toArray();
foreach ($extended as $key =>  $value) {
  $data['extended'][$key] = $value;
}
// выводим результат
echo $data[$class][$type];