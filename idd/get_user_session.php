<?php
	session_start();
	//include	'../inc/cekSession.php';

	//echo $_SESSION['username'];
	//echo $_SESSION['timezone'];
	
try {
	
	
	if (!isset ($_SESSION['username'])) {
        throw new Exception('Loged error');
    }
	
	
	
	//$query = 'call ship_list()';
	
	//$sth = $db->prepare($query);
	//$sth->execute();
	//$result = $sth->fetchAll(PDO::FETCH_ASSOC);
	
	//$hasil = $db->query($query);
	//while($row = $hasil->fetch_assoc()){
		//$kapal[] = array(
					//"id"=>$row['id'],
					//"name"=>$row['name']
					//);
	//}
	$user_login = array(
		'user' 	=> $_SESSION['username'],
		'tz' 	=> $_SESSION['timezone']
	
	);
	
	$jsonResult = array(
        'success' => true,
        'loged' => $user_login
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );

}	
echo json_encode($jsonResult);


?>
