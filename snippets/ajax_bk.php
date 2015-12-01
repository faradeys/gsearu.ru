<?php 
if(isset($_POST['proj_group'])){
	$proj_group = $_POST['proj_group'];
	$out = $modx->runSnippet('getResources', array('parents'=>'12','tpl'=>'project_item', 'limit' => '8','includeTVs' => '1', 'processTVs' => '1',  'sortdirTV' => 'DESC', 'tvFilters' => 'project_cat ==%'.$proj_group.'%'));
	$json['acc'] = $out;
	echo json_encode($json);
}


?> 