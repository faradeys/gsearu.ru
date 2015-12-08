<?php
$id = $_GET['id'];
$res = $modx->getObject('modResource',$id);

if($type == 'all'){
  echo $res->get($do);
}
if($type == 'tv'){
  echo $res->getTVValue($do);
}