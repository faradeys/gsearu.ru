<?php
if ($input == '') { return ''; }
$tags = explode(',',$input);
if ($type == 'ОРГАНИЗАЦИЯ' or $type == 'ПАРТНЕР'){
    foreach ($tags as $key => $value) 
   {
      $output[] = '<div class="block">
      <div class="org">'.$value.'</div>
	  <div class="post_title">'.$type.'</div>
	  </div>'; 
   }
}
elseif ($type == 'url'){
    foreach ($tags as $key => $value) 
   {
      $output[] = '<a target="_blank" href="http://'.$value.'">'.$value.'</a>'; 
   }
}
 
return implode(' ',$output);