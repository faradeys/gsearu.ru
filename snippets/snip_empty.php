<?php
if($name == 'userProfile'){
  $out = $modx->runSnippet($name, array('class'=>$class,'type'=>$type));
  if (!empty($out)) {
    echo $text;
  }
}