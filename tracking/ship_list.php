<?php

session_start();
include	'../inc/conn_db.php';
include	'../inc/cekSession.php';

try {
	
	$query = 'call demo_ship_list()';
	
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
