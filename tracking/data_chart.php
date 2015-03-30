<?php

session_start();
include	'../inc/conn_db_linode1.php';
include	'../inc/cekSession.php';


try {
	
	$id = (isset($_GET['id']) && ($_GET['id'] <> '')) ? $_GET['id'] : '1';
	$tgl = (isset($_GET['tgl']) && ($_GET['tgl'] <> '')) ? $_GET['tgl'] : date('Y-m-d') ;
	
	//echo 'idkapal = '.$id. ' dan tanggal = '.$tgl.'<br>';
	for($i=0; $i<24;$i++){
		$query = 'SELECT rpm1_avg, rpm2_avg, flow1_tot, overflow1_tot, flow2_tot, overflow2_tot, runhour1, runhour2
					FROM data_perjam 
			where id_ship = '.$id.' and tanggal = "'.$tgl.'" and jam = "'.$i.'"';

		$sth = $db->prepare($query);
		$sth->execute();
		
		$r = $sth->fetch();
		
		//echo 'jame ke- '.$i.'<br>';
		//echo 'rpm1 = '.$r['rpm1_avg'].'<br>';
		//while ($r = $sth->fetch()){
		
		$data_chart [] = array(
			'jam' =>  (strlen($i) ==1 )? '0'.$i : $i,
			'rpm1' => ($r['rpm1_avg'] == '' ) ? 'null' : $r['rpm1_avg'],
			'rpm2' => ($r['rpm2_avg'] == '' ) ? 'null' : $r['rpm2_avg'],
			'fuel1' => ($r['rpm1_avg'] == '' ) ? 'null' : $r['flow1_tot'] - $r['overflow1_tot'],
			'fuel2' => ($r['rpm1_avg'] == '' ) ? 'null' : $r['flow2_tot'] - $r['overflow2_tot'],
			'rh1' => ($r['rpm1_avg'] == '' ) ? 'null' : $r['runhour1'],
			'rh2' => ($r['rpm1_avg'] == '' ) ? 'null' : $r['runhour2']
		);
	}
	
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
