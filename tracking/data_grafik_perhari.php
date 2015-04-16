<?php

session_start();
include	'../inc/conn_db.php';
//include	'../inc/conn_db_linode1.php';
include	'../inc/cekSession.php';


try {
	
	$id = (isset($_GET['id']) && ($_GET['id'] <> '')) ? $_GET['id'] : '1';
	$tgl = (isset($_GET['tgl']) && ($_GET['tgl'] <> '')) ? $_GET['tgl'] : date('Y-m-d') ;
	//echo 'idkapal = '.$id. ' dan tanggal = '.$tgl.'<br>';
	$query = 'SELECT sum(flow1_tot) as tot_fl1, sum(overflow1_tot) as tot_ovfl1, sum(flow2_tot) as tot_fl2, sum(overflow2_tot) as tot_ovfl2, sum(runhour1) as rh1, sum(runhour2) as rh2 
				FROM data_perjam 
				WHERE id_ship = '.$id.' and tanggal= "'.$tgl.'"';


	$sth = $db->prepare($query);
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
	
	$jsonResult = array(
        'success' => true,
        'g_perhari' => $result
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );

}	
echo json_encode($jsonResult);

?>
