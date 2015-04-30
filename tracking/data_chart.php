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
				'jam' =>  $i,'rpm1' => 0,'rpm2' => 0,'rpm3' => 0,
				'fuel1' => 0,'fuel2' => 0,'fuel3' => 0,
				'rh1' => 0,'rh2' => 0,'rh3' => 0
			);
	}
	
	$query = 'call data_kapal_perjam_chart_dinamis('.$id.',"'.$tgl.'")';
	$sth = $db->prepare($query);
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
	
	$hasil = array();
	foreach ($result as $rr){
		$hasil[] = array( 
			'jam' => $rr['jam'],
			'rpm1' => $rr['rpm1'],
			'rpm2' => $rr['rpm2'],
			'rpm3' => !isset ($rr['rpm3']) ? '0' : $rr['rpm3'],  
			'fuel1' => ($rr['inflow1']) - ($rr['outflow1']),
			'fuel2' => ($rr['inflow2']) - ($rr['outflow2']),
			'fuel2' => (!isset ($rr['inflow3'])) or (!isset ($rr['outflow3'])) ? '0' : ($rr['inflow3']) - ($rr['outflow3']),
			'rh1' => $rr['runhour1'],
			'rh2' => $rr['runhour2'],
			'rh3' => !isset ($rr['runhour3']) ? '0' : $rr['runhour3']
			
		);
	}
	
	$grafik = array_replace($perjam,$hasil);
	
	
	
	//for($i=0; $i<24;$i++){
		////$query = 'SELECT rpm1_avg, rpm2_avg, flow1_tot, overflow1_tot, flow2_tot, overflow2_tot, runhour1, runhour2
					////FROM data_perjam 
			////where id_ship = '.$id.' and tanggal = "'.$tgl.'" and jam = "'.$i.'"';
		
		//$query = 'call kapal_perjam_chart('.$id.', "'.$tgl.'",'.$i.')';
		
		//$sth = $db->prepare($query);
		//$sth->execute();
		
		//$r = $sth->fetch();
		
		////echo 'jame ke- '.$i.'<br>';
		////echo 'rpm1 = '.$r['rpm1'].'<br>';
		////while ($r = $sth->fetch()){
		
		//$data_chart [] = array(
			//'jam' =>  (strlen($i) ==1 )? '0'.$i : $i,
			//'rpm1' => ($r['rpm1'] == '' ) ? null : $r['rpm1'],
			//'rpm2' => ($r['rpm2'] == '' ) ? null : $r['rpm2'],
			//'fuel1' => ($r['flow1'] == '' ) ? null : $r['flow1'] - $r['overflow1'],
			//'fuel2' => ($r['flow2'] == '' ) ? null : $r['flow2'] - $r['overflow2'],
			//'rh1' => ($r['runhour1'] == '' ) ? null : $r['runhour1'],
			//'rh2' => ($r['runhour1'] == '' ) ? null : $r['runhour2']
		//);
		
		
	//}
	
	//print_r ($data_chart);
	
	$jsonResult = array(
        'success' => true,
        'chart' => $grafik
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );

}	
echo json_encode($jsonResult);

?>
