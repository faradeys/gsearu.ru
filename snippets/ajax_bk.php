<?php
//функция обработки входящих данных, для использования их в базе
function filtre_inp($inp){
	$inp = trim($inp);
	$inp = strip_tags($inp);
	$inp = htmlspecialchars($inp);
	$inp = mysql_escape_string($inp);
	return $inp;
}
//функция отправки email
function send_mail($email,$subject,$message,$mail_from){
	$headers = "MIME-Version: 1.0"  . "\r\n";
	$headers .= "Content-type: text/plain; charset=utf-8"  . "\r\n";
	$headers .= 'From: <'.$mail_from.'>'  . "\r\n";
	$headers .= 'Reply-To: '.$mail_from.'' . "\r\n";
	$headers .= "Subject: {$subject}"  . "\r\n";
	$headers .= 'X-Mailer: PHP/' . phpversion();
	$send = mail($email, $subject, $message, $headers);
	return  $send;
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
			$out = $modx->runSnippet('getResources', array('showHidden'=> '1','parents'=>'25','resources' =>'-50','tpl'=>'invest_tpl', 'limit' => '6','includeTVs' => '1', 'processTVs' => '1'));
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
//проверяем, есть ли такой пользователь  и пароль
if(isset($_POST['isloggin'])) {
	$login =  filtre_inp($_POST['login']);
	$password =  filtre_inp($_POST['password']);
	$user = $modx->getObject('modUser', array('username' => $login));
	if (isset($user)) {
		$user_id = $user->get('id');
		$truepass = $user->passwordMatches($password);
	}
	if(isset($user_id) and $truepass==1){
		$json['out'] = 'true';
	}
	elseif(!isset($user_id)){
		$json['out'] = 'false_login';
	}
	else {
		$json['out'] = 'false_pass';
	}
	echo json_encode($json);
}
//Обработчик формы заявки на участие в премии ГСЕА
if (isset($_POST['req_project'])) {
	$type = filtre_inp($_POST['req_project']);
	$fio = filtre_inp($_POST['fio']);
	$site = filtre_inp($_POST['site']);
	$branch = filtre_inp($_POST['branch']);
	$year_oborot_2014 = filtre_inp($_POST['year-oborot-2014']);
	$year_oborot_2015 = filtre_inp($_POST['year-oborot-2015']);
	$kol_vo_sotrudnikov = filtre_inp($_POST['kol-vo-sotrudnikov']);
	$about_business = filtre_inp($_POST['about_business']);
	$business_osn = filtre_inp($_POST['business_osn_day']).'.'.filtre_inp($_POST['business_osn_month']).'.'.filtre_inp($_POST['business_osn_year']);
	$country_company = filtre_inp($_POST['country_company']);
	$location_bizness = filtre_inp($_POST['location-bizness']);
	$phone = filtre_inp($_POST['phone']);
	$email = filtre_inp($_POST['email']);
	$url_soc = filtre_inp($_POST['url_soc']);
	$sity = filtre_inp($_POST['sity']);
	$strit = filtre_inp($_POST['strit']);
	$home = filtre_inp($_POST['home']);
	$fio_user = filtre_inp($_POST['fio-user']);
	$birthday = filtre_inp($_POST['birthday_day']).'.'.filtre_inp($_POST['birthday_month']).'.'.filtre_inp($_POST['birthday_yaer']);
	$school = filtre_inp($_POST['school']);
	$special = filtre_inp($_POST['special']);
	$vuz_in = filtre_inp($_POST['vuz_in_day']).'.'.filtre_inp($_POST['vuz_in_month']).'.'.filtre_inp($_POST['vuz_in_year']);
	$vuz_out = filtre_inp($_POST['vuz_out_day']).'.'.filtre_inp($_POST['vuz_out_month']).''.filtre_inp($_POST['vuz_out_year']);
	$skill = filtre_inp($_POST['skill']);
	$where_learned = filtre_inp($_POST['where_learned']);
	$select_inv = filtre_inp($_POST['select_inv']);
	$investment_size = filtre_inp($_POST['investment_size']);
	$investment_who = filtre_inp($_POST['investment_who']);
	$json['out_ins'] = mysql_query("INSERT INTO gsearu_req_project (name_company,site_org,branch,year_turnover_2014,year_turnover_2015,employees,description_comp,date_start,geo_com,country,phone,email,link_social,сity,street,home,fio,date_birth,english,school,specialty,date_start_school,date_end_school,about_award,invest,summa_invest,who_invest,type) values ('$fio','$site','$branch','$year_oborot_2014','$year_oborot_2015','$kol_vo_sotrudnikov','$about_business','$business_osn','$location_bizness','$country_company','$phone','$email','$url_soc','$sity','$strit','$home','$fio_user','$birthday','$skill','$school','$special','$vuz_in','$vuz_out','$where_learned','$select_inv','$investment_size','$investment_who','$type')");
	$message ="
		ИНФОРМАЦИЯ О КОМПАНИИ
		\n
		НАЗВАНИЕ ВАШЕЙ КОМПАНИИ: ".$fio."\n
		САЙТ ОРГАНИЗАЦИИ: ".$site."\n
		В КАКОЙ ОТРАСЛИ ВЫ ВЕДЁТЕ СВОЮ ДЕЯТЕЛЬНОСТЬ: ".$branch."\n
		ГОДОВОЙ ОБОРОТ КОМПАНИИ ЗА 2014 В МЛН.РУБ.: ".$year_oborot_2014."\n
		ГОДОВОЙ ОБОРОТ КОМПАНИИ ЗА 1-Е ПОЛУГОДИЕ 2015 ГОДА В МЛН.РУБ.: ".$year_oborot_2015."\n
		СКОЛЬКО СОТРУДНИКОВ РАБОТАЕТ В КОМПАНИИ: ".$kol_vo_sotrudnikov."\n
		ОПИШИТЕ ВАШ БИЗНЕС В НЕСКОЛЬКИХ ПРЕДЛОЖЕНИЯХ : ".$about_business."\n
		ДАТА ОСНОВАНИЯ БИЗНЕСА: ".$business_osn."\n
		ГЕОГРАФИЯ ВАШЕГО БИЗНЕСА: ".$location_bizness."\n
		СТРАНА где зарегистрирована компания: ".$country_company."\n
		\n
		КАК С ВАМИ СВЯЗАТЬСЯ\n
		\n
		НОМЕР МОБИЛЬНОГО: ".$phone."\n
		EMAIL: ".$email."\n
		ССЫЛКА НА ВАШ ПРОФИЛЬ В СОЦ.СЕТЯХ: ".$url_soc."\n
		ГОРОД: ".$sity."\n
		УЛИЦА: ".$strit."\n
		№ ДОМА: ".$home."\n
		\n
		О ВАС\n
		\n
		ФИО : ".$fio_user."\n
		ДАТА РОЖДЕНИЯ: ".$birthday."\n
		ЗНАНИЕ АНГЛИЙСКОГО ЯЗЫКА: ".$skill."\n
		НАЗВАНИЕ УЧЕБНОГО ЗАВЕДЕНИЯ: ".$school."\n
		СПЕЦИАЛИЗАЦИЯ: ".$special."\n
		ДАТА ПОСТУПЛЕНИЯ: ".$vuz_in."\n
		ДАТА ОКОНЧАНИЯ: ".$vuz_out."\n
		ОТКУДА УЗНАЛИ О ПРЕМИИ: ".$where_learned."\n
		\n
		ДОСТИЖЕНИЯ\n
		\n
		ПОЛУЧАЛИ ЛИ ВЫ ИНВЕСТИЦИИ: ".$select_inv."\n
		РАЗМЕР ИНВЕСТИЦИЙ: ".$investment_size."\n
		ОТ КОГО ВЫ ПОЛУЧАЛИ ИНВЕСТИЦИИ: ".$investment_who."\n
	";
	$json['out_mail'] = send_mail('yeliseeva@indigo-trg.com','Анкета на участие в премии Пользователя: '.$fio_user,$message,'elmv@pr-solution.ru');
	echo json_encode($json);
}
//Обработчик формы заявки на новый проект
if (isset($_POST['req_form_tye'])) {
	$type = filtre_inp($_POST['req_form_tye']);
	$name_progect = filtre_inp($_POST['name-progect']);
	$anons_progect = filtre_inp($_POST['anons-progect']);
	$about_progect = filtre_inp($_POST['about-progect']);
	$problem_progect = filtre_inp($_POST['problem-progect']);
	$help_progect = filtre_inp($_POST['help-progect']);
	$comand_progect = filtre_inp($_POST['comand-progect']);
	$link_video_progect = filtre_inp($_POST['link-video-progect']);
	$level_progect = filtre_inp($_POST['level-progect']);
	$parthner_progect = filtre_inp($_POST['parthner-progect']);
	$sity_progect = filtre_inp($_POST['sity-progect']);
	$tags_progect = filtre_inp($_POST['tags-progect']);
	$resourse_progect = filtre_inp($_POST['resourse-progect']);

	$json['out_ins'] = mysql_query("INSERT INTO gsearu_new_project (name,anons,description,global_problem,help,team,link_video,stage,partners,sity,tegs,link_recours) values ('$name_progect','$anons_progect','$about_progect','$problem_progect','$help_progect','$comand_progect','$link_video_progect','$level_progect','$parthner_progect','$sity_progect','$tags_progect','$resourse_progect')");

	$message ="
		Название проекта: ".$name_progect."\n
		Анонс: ".$anons_progect."\n
		Описание: ".$about_progect."\n
		Глобальная проблема, которую решает проект: ".$problem_progect."\n
		Какая помощь нужна для проекта: ".$help_progect."\n
		Команда проекта: ".$comand_progect."\n
		Ссылка на видео : ".$link_video_progect."\n
		Текущий этап: ".$level_progect."\n
		Организации и партнеры: ".$parthner_progect."\n
		Город: ".$sity_progect."\n
		Теги: ".$tags_progect."\n
		Ссылка на другие ресурсы: ".$resourse_progect."\n
	";
	$json['out_mail'] = send_mail('yeliseeva@indigo-trg.com','Новый проект: '.$name_progect,$message,'elmv@pr-solution.ru');
	echo json_encode($json);

}
//Проверка, голосовал ли пользователь за проект
if (isset($_POST['isvote'])) {
	$page_id = filtre_inp($_POST['isvote']);
	$user_all = $modx->getAuthenticatedUser();
	if (isset($user_all)){
	  $user_id = $user_all -> get('id');
	  $Profile = $user_all->getOne('Profile');
	}
	$r1 =  mysql_fetch_array(mysql_query("SELECT id FROM gsearu_users_vote WHERE id_user = $user_id AND id_doc = $page_id "));
	if(empty($r1['id'])){
		$json['out'] = 'true';
	}
	else{
		$json['out'] = 'false';
	}
	echo json_encode($json);
}
//Добавление голоса пользователя
if (isset($_POST['addvote'])) {
	$page_id = filtre_inp($_POST['addvote']);
	$percent = filtre_inp($_POST['percent']);
	$num = filtre_inp($_POST['num']);
	$user_all = $modx->getAuthenticatedUser();
	if (isset($user_all)){
	  $user_id = $user_all -> get('id');
	  $Profile = $user_all -> getOne('Profile');
	}
	$json['out_ins'] = mysql_query("INSERT INTO gsearu_users_vote (id_user,id_doc) values ('$user_id','$page_id')");
	$page = $modx->getObject('modResource',$page_id);
	$page->setTVValue('project_rating', $num+11);
	$page->setTVValue('project_rating_percent', $percent+11);
	$json['out'] = $page->save();
	echo json_encode($json);
}


//Помощь проекту
if (isset($_POST['help_project'])) {
	$page_id = filtre_inp($_POST['help_project']);
	$type = filtre_inp($_POST['type']);
	$name = filtre_inp($_POST['name']);
	$mail = filtre_inp($_POST['mail']);
	$tel = filtre_inp($_POST['tel']);
	$text = filtre_inp($_POST['text']);
	$page = $modx->getObject('modResource',$page_id);
	$title_pr = $page->get('pagetitle');
	if($type == 'Предложить новость'){
		$type_name = '';
		$type_text = 'Предложенная новость от - ';
	}
	if($type == 'Помочь проекту'){
		$type_name = 'Название проекта: ".$title_pr."\n';
		$type_text = 'Помощь проекту от - ';
	}
	if($type == 'Стать судьей'){
		$type_name = '';
		$type_text = 'Заявка на судейство от - ';
	}
	$message ="
		".$type_name."
		Имя: ".$name."\n
		Почта: ".$mail."\n
		Телефон: ".$tel."\n
		Сообщение: ".$text."\n
	";
	$json['out_mail'] = send_mail('elmv@pr-solution.ru',$type_text.$name,$message,'elmv@pr-solution.ru');
	echo json_encode($json);
}
if (isset($_POST['meet_add'])) {
	$name = filtre_inp($_POST['name']);
	$data = filtre_inp($_POST['data']);
	$text = filtre_inp($_POST['text']);
	$message ="
		Название события: ".$name."\n
		Дата события: ".$data."\n
		Текст: ".$text."\n
	";
	$json['out_mail'] = send_mail('elmv@pr-solution.ru','Новое событие:'.$name,$message,'elmv@pr-solution.ru');
	echo json_encode($json);
}