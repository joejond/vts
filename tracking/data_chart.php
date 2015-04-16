<?php

session_start();
include	'../inc/conn_db.php';
//include	'../inc/conn_db_linode2.php';
include	'../inc/cekSession.php';


try {
	
	$id = (isset($_GET['id']) && ($_GET['id'] <> '')) ? $_GET['id'] : '1';
	$tgl = (isset($_GET['tgl']) && ($_GET['tgl'] <> '')) ? $_GET['tgl'] : date('Y-m-d') ;
	
	echo 'idkapal = '.$id. ' dan tanggal = '.$tgl.'<br>';
	for($i=0; $i<24;$i++){
		//$query = 'SELECT rpm1_avg, rpm2_avg, flow1_tot, overflow1_tot, flow2_tot, overflow2_tot, runhour1, runhour2
					//FROM data_perjam 
			//where id_ship = '.$id.' and tanggal = "'.$tgl.'" and jam = "'.$i.'"';
		
		$query = 'call kapal_perjam_chart('.$id.', "'.$tgl.'",'.$i.')';
		
		$sth = $db->prepare($query);
		$sth->execute();
		
		$r = $sth->fetch();
		
		//echo 'jame ke- '.$i.'<br>';
		//echo 'rpm1 = '.$r['rpm1'].'<br>';
		//while ($r = $sth->fetch()){
		
		$data_chart [] = array(
			'jam' =>  (strlen($i) ==1 )? '0'.$i : $i,
			'rpm1' => ($r['rpm1'] == '' ) ? null : $r['rpm1'],
			'rpm2' => ($r['rpm2'] == '' ) ? null : $r['rpm2'],
			'fuel1' => ($r['flow1'] == '' ) ? null : $r['flow1'] - $r['overflow1'],
			'fuel2' => ($r['flow2'] == '' ) ? null : $r['flow2'] - $r['overflow2'],
			'rh1' => ($r['runhour1'] == '' ) ? null : $r['runhour1'],
			'rh2' => ($r['runhour1'] == '' ) ? null : $r['runhour2']
		);
		
		
	}
	
	//print_r ($data_chart);
	
	$jsonResult = array(
        'success' => true,
        'chart' => $data_chart
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );

}	
echo json_encode($jsonResult);

?>
