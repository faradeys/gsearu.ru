<?php
function filtre_inp($inp){
	$inp = trim($inp);
	$inp = strip_tags($inp);
	$inp = htmlspecialchars($inp);
	$inp = mysql_escape_string($inp);
	return $inp;
}
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
if(isset($_POST['isloggining'])) {
	$out = $modx->getAuthenticatedUser();
	if(isset($out)){
		$json['out'] = 'true';
	}
	else {
		$json['out'] = 'false';
	}
<<<<<<< HEAD
	echo json_encode($json);
}
if (isset($_POST['do_invest'])) {
	if (isset($_POST['name']) and isset($_POST['tel']) and isset($_POST['mail']) and isset($_POST['sum'])) {
		$name = filtre_inp($_POST['name']);
		$tel = filtre_inp($_POST['tel']);
		$mail = filtre_inp($_POST['mail']);
		$sum = filtre_inp($_POST['sum']);
		$id_invest = filtre_inp($_POST['id']);
		$id_user = filtre_inp($_POST['id_user']);
		$json['out'] = mysql_query("INSERT INTO gsearu_invests (name,tel,mail,sum,id_invest,id_user) values ('$name','$tel','$mail','$sum','$id_invest','$id_user')");
	}
=======
>>>>>>> 658c7fb229002a791352aacaa4dcf98ac3a528f8
	echo json_encode($json);
}
if (isset($_POST['do_invest'])) {
	if (isset($_POST['name']) and isset($_POST['tel']) and isset($_POST['mail']) and isset($_POST['sum'])) {
		$name = filtre_inp($_POST['name']);
		$tel = filtre_inp($_POST['tel']);
		$mail = filtre_inp($_POST['mail']);
		$sum = filtre_inp($_POST['sum']);
		$id_invest = filtre_inp($_POST['id']);
		$id_user = filtre_inp($_POST['id_user']);
		$json['out'] = mysql_query("INSERT INTO gsearu_invests (name,tel,mail,sum,id_invest,id_user) values ('$name','$tel','$mail','$sum','$id_invest','$id_user')");
	}
	echo json_encode($json);
}
