<?php

session_start();
include	'../inc/conn_db.php';
include	'../inc/cekSession.php';

try {
	
	$query = 'SELECT id_ship AS id,name FROM ship';
	
	$sth = $db->prepare($query);
	$sth->execute();
	$result = $sth->fetchAll();
	
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
