<?php

session_start();
include	'../inc/conn_db_tanker.php';
//include	'../inc/conn_db_linode2.php';
include	'../inc/cekSession.php';


try {
	$tz = $_SESSION['timezone'];
	$id = (isset($_GET['id']) && ($_GET['id'] <> '')) ? $_GET['id'] : '23';
	$tgl = (isset($_GET['tgl']) && ($_GET['tgl'] <> '')) ? $_GET['tgl'] : date('Y-m-d') ;
	
	echo 'idkapal = '.$id. ' dan tanggal = '.$tgl.' dg tz = '.$tz.'<br>';
	for($i=0; $i<24;$i++){
			$perjam[] = array(
				'jam' =>  $i,
				'volume1' => null,
				'volume2' => null,
				'volume3' => null,
				'volume4' => null,
				'volume5' => null,
				'volume6' => null,
				'volume7' => null,
				'volume8' => null,
				'volume9' => null,
				'volume10' => null
			);
	}
	
	//echo $perjam['jam'];
	echo '<pre>';
	print_r($perjam);
	echo '<pre>';
	
	$query = 'call data_kapal_perjam_dinamis('.$id.',"'.$tgl.'","'.$tz.'")';
	// $query = 'call data_kapal_perjam_chart_dinamis('.$id.',"'.$tgl.'")';
	$sth = $db->prepare($query);
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
	print_r($result);
	//$hasil = array();
	foreach ($result as $rr){
		//echo $rr['jam'].'<br>';
		$perjam[$rr['jam']]['jam'] = $rr['jam'];
		$perjam[$rr['jam']]['rpm1'] = $rr['rpm1'];
		$perjam[$rr['jam']]['rpm2'] = $rr['rpm2'];
		$perjam[$rr['jam']]['rpm3'] = !isset ($rr['rpm3']) ? null : $rr['rpm3'];
		$perjam[$rr['jam']]['rpm4'] = !isset ($rr['rpm4']) ? null : $rr['rpm4'];
		$perjam[$rr['jam']]['fuel1'] = ($rr['inflow1']) - ($rr['outflow1']);
		$perjam[$rr['jam']]['fuel2'] = ($rr['inflow2']) - ($rr['outflow2']);
		$perjam[$rr['jam']]['fuel3'] = !isset ($rr['inflow3']) && !isset ($rr['outflow3']) ? null : (($rr['inflow3']) - ($rr['outflow3']));
		$perjam[$rr['jam']]['fuel4'] = !isset ($rr['inflow4']) && !isset ($rr['outflow4']) ? null : (($rr['inflow3']) - ($rr['outflow4']));
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
