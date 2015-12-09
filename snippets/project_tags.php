<?php
if ($input == '') { return ''; }
$tags = explode(',',$input);
foreach ($tags as $key => $value)
   {
      $output[] = '<a class="fav" href="'.$modx->makeurl(2, '', array('tag' => $value)).'" title="'.$value.'"> '.$value.' </a>';
   }
return implode(' ',$output);
//return $output;
