<?php

session_start();
include	'../inc/conn_db_tanker.php';
//include	'../inc/conn_db_linode1.php';
include	'../inc/cekSession.php';

try{
	$tz = $_SESSION['timezone'];
	$id = isset($_GET['id']) ? $_GET['id'] : '';
	$start = isset($_GET['start']) ? $_GET['start'] : '';
	$stop = isset($_GET['stop']) ? $_GET['stop'] : '';
	
	//echo 'idkapal = '.$id.', start => '.$start.', stop => '.$stop.'<br>';
	$query = "call data_tracking ($id,'$start','$stop','$tz')";
	// $query = 'SELECT tu.id_ship as id,
	// 				max(case when tu.id_data_type="1" then round(d.value,2) end) lat,
	// 				max(case when tu.id_data_type="2" then round(d.value,2) end) lng
	// 			FROM data d
	// 				inner join titik_ukur tu on tu.id_titik_ukur = d.id_titik_ukur
	// 			WHERE tu.id_ship = '.$id.' and d.data_time between "'.$start.'" and "'.$stop.'"
	// 			GROUP BY d.data_time
	// 			ORDER BY d.data_time asc;';
	// echo 'lat => '.$query.'<br>';
	$hasil = $db->prepare($query);
	$hasil->execute();
	$result = $hasil->fetchAll(PDO::FETCH_ASSOC);
	$jsonResult = array(
        'success' => true,
        'track' => $result
    );
}
catch(Exception $e) {
	 $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );
}
echo json_encode($jsonResult);
?>
