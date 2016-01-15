<?php

session_start();
include	'../inc/conn_db_tanker.php';
include	'../inc/cekSession.php';

try {
	
	//echo $_SESSION['timezone'].'<br>';
	//echo $_SESSION['company'].'<br>';
	//echo $_SESSION['uid'].'<br>';
	//
	$query = 'call ship_list()';
	//$query = 'select * from ship where ';
	//echo $query;
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
