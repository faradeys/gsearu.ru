<?php
global $modx;
$priceneed = $modx->resource->get('invest_priceneed')['1'];
$price_now = $modx->resource->get('invest_price_now')['1'];
$percent = round($price_now*100/$priceneed);
if($type == 'percent'){
	echo $percent;
}
if($type == 'percent2'){
	$res = $modx->getObject('modResource',$id);
	$priceneed = $res->getTVValue('invest_priceneed');
	$price_now = $res->getTVValue('invest_price_now');
	$percent = round($price_now*100/$priceneed);
	echo $percent;
}
if($type == 'percent3'){
	$res = $modx->getObject('modResource',$id);
	$priceneed = $res->getTVValue('invest_priceneed');
	$price_now = $res->getTVValue('invest_price_now');
	$percent = round($price_now*100/$priceneed);
	echo $percent*0.75;
}
if($type == 'line'){
	echo round(263*$percent/100);
}
if($type == 'line2'){
	echo round(263*$percent/100);
	if (isset($_GET['id'])) {
		$id = $_GET['id'];
	}
	$res = $modx->getObject('modResource',$id);
	$priceneed = $res->getTVValue('invest_priceneed');
	$price_now = $res->getTVValue('invest_price_now');
	$percent = round($price_now*100/$priceneed);
	echo round(263*$percent/100);
}
if($type == 'date'){
	function  days($day)
    {
        $a=substr($day,strlen($day)-1,1);
        if($a==1) $str="ДЕНЬ";
        if($a==2 || $a==3 || $a==4) $str="ДНЯ";
        if($a==5 || $a==6 || $a==7 || $a==8 || $a==9 || $a==0) $str="ДНЕЙ";
        return $str;
    }
	$end_date = $modx->resource->get('invest_end_date')['1'];
	$time = date( "Y-m-d H:i:s" , time());
	$data1 = explode(' ',$end_date);
	$data2 = explode('-',$data1[0]);
	$data3 = explode(':',$data1[1]);
	$mk_data = mktime( $data3[0],$data3[1],$data3[2],$data2[1],$data2[2],$data2[0] );
	$need_data = ($mk_data - time()) / 86400;
	echo round($need_data).' '.days(round($need_data));
	//print_r($mk_data1);
}
