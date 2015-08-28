<?php

session_start();
include	'../inc/conn_db.php';
//include	'../inc/conn_db_linode2.php';
include	'../inc/cekSession.php';


try {
	
	$id = (isset($_GET['id']) && ($_GET['id'] <> '')) ? $_GET['id'] : '1';
	$tgl = (isset($_GET['tgl']) && ($_GET['tgl'] <> '')) ? $_GET['tgl'] : date('Y-m-d') ;
	
	//echo 'idkapal = '.$id. ' dan tanggal = '.$tgl.'<br>';
	for($i=0; $i<24;$i++){
			$perjam[] = array(
				'jam' =>  $i,
				'rpm1' => null,
				'rpm2' => null,
				'rpm3' => null,
				'fuel1' => null,
				'fuel2' => null,
				'fuel3' => null,
				'rh1' => null,
				'rh2' => null,
				'rh3' => null
			);
	}
	
	//echo $perjam['jam'];
	//echo '<pre>';
	//print_r($perjam);
	//echo '<pre>';
	
	$query = 'call data_kapal_perjam_chart_dinamis('.$id.',"'.$tgl.'")';
	$sth = $db->prepare($query);
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
	
	//$hasil = array();
	foreach ($result as $rr){
		//echo $rr['jam'].'<br>';
		$perjam[$rr['jam']]['jam'] = $rr['jam'];
		$perjam[$rr['jam']]['rpm1'] = $rr['rpm1'];
		$perjam[$rr['jam']]['rpm2'] = $rr['rpm2'];
		$perjam[$rr['jam']]['rpm3'] = !isset ($rr['rpm3']) ? null : $rr['rpm3'];
		$perjam[$rr['jam']]['fuel1'] = ($rr['inflow1']) - ($rr['outflow1']);
		$perjam[$rr['jam']]['fuel2'] = ($rr['inflow2']) - ($rr['outflow2']);
		$perjam[$rr['jam']]['fuel3'] = !isset ($rr['inflow3']) && !isset ($rr['outflow3']) ? null : (($rr['inflow3']) - ($rr['outflow3']));
		$perjam[$rr['jam']]['rh1'] = $rr['runhour1'];
		$perjam[$rr['jam']]['rh2'] = $rr['runhour2'];
		$perjam[$rr['jam']]['rh3'] = !isset ($rr['runhour3']) ? null : $rr['runhour3'];
		
	}
	
	//$grafik = array_replace($perjam,$hasil);
	//echo 'array HASIL <br>';
	//echo '<pre>';
	//print_r($perjam);
	//echo '<pre>';
	
	
	//print_r ($data_chart);
	
	$jsonResult = array(
        'success' => true,
        'chart' => $perjam
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );

}	
echo json_encode($jsonResult);

?>
