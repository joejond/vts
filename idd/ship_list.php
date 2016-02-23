<?php

session_start();
include	'../inc/conn_db.php';
include	'../inc/cekSession.php';

try {
	//
	// $_SESSION['uid'];		
	// $_SESSION['username'];	
	// $_SESSION['company'];	
	// $_SESSION['timezone'];

	// $query = 'call ship_list()';
	$query = "select id_ship id,name from ship_idd;";

	
	$sth = $db->prepare($query);
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
	
	//$hasil = $db->query($query);
	//while($row = $hasil->fetch_assoc()){
		//$kapal[] = array(
					//"id"=>$row['id'],
					//"name"=>$row['name']
					//);
	//}
	
	$jsonResult = array(
        'success' => true,
        'ship' => $result
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );

}	
echo json_encode($jsonResult);
	
?>
