<?php
$start = microtime();
session_start();
include	'../inc/conn_db.php';
//include	'../inc/conn_db_linode1.php';
include	'../inc/cekSession.php';

try {
	
	$id = (isset($_GET['id']) && ($_GET['id'] <> '')) ? $_GET['id'] : '1';
	$tgl = (isset($_GET['tgl']) && ($_GET['tgl'] <> '')) ? $_GET['tgl'] : date('Y-m-d') ;
	
	//echo 'idkapal = '.$id. ' dan tanggal = '.$tgl.'<br>';
	
	//$query = 'call data_kapal('.$id.', "'.$tgl.'")';
	$query = 'call data_kapal_dinamis('.$id.', "'.$tgl.'")';
		//echo 'query = '.$query.'<br>';

	$sth = $db->prepare($query);
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
	
	$jsonResult = array(
        'success' => true,
        'detail_ship' => $result
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );

}	
echo json_encode($jsonResult);
//echo '</br>';
$end = microtime();
$creationtime = ($end - $start) / 1000;
//printf("Page created in %.5f seconds.", $creationtime);
?>
