<?php
if(isset($_POST['proj_group'])){
	$json = array();
	$proj_group = $_POST['proj_group'];
	$type = $_POST['type'];
	if ($type == 'proj'){
		$out = $modx->runSnippet('getResources', array('parents'=>'12','tpl'=>'project_item', 'limit' => '8','includeTVs' => '1', 'processTVs' => '1',  'sortdirTV' => 'DESC', 'tvFilters' => 'project_cat ==%'.$proj_group.'%'));
	}
	elseif($type == 'news'){
		$out = $modx->runSnippet('getResources', array('showHidden'=> '1','parents'=>'20','tpl'=>'news_item_in', 'limit' => '6','includeTVs' => '1', 'processTVs' => '1',  'sortdirTV' => 'DESC', 'tvFilters' => 'project_cat ==%'.$proj_group.'%'));
	}
	elseif($type == 'invest'){
		if ($proj_group == 'Все'){
			$out = $modx->runSnippet('getResources', array('showHidden'=> '1','parents'=>'25','tpl'=>'invest_tpl', 'limit' => '6','includeTVs' => '1', 'processTVs' => '1'));
		}
		else {
			$out = $modx->runSnippet('getResources', array('showHidden'=> '1','parents'=>'25','tpl'=>'invest_tpl', 'limit' => '6','includeTVs' => '1', 'processTVs' => '1',  'sortdirTV' => 'DESC', 'tvFilters' => 'project_cat ==%'.$proj_group.'%'));
		}

	}
	$json['acc'] = $out;
	/*$array = explode('<div class="proj">', $out);
	foreach($array as $key => $value){
		$json[$key]  = '<div class="proj">'.$value;
	}*/
	echo json_encode($json);
}
if(isset($_POST['isloggining']))
{
	//$out = $modx->getAuthenticatedUser()->get('id');
	$json['out'] = $out;
	echo json_encode($json);
}
