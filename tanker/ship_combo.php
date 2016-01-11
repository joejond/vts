<?php

session_start();
include	'../inc/conn_db.php';
//include	'../inc/cekSession.php';

try {
	//$dbh = new PDO('mysql:host=localhost;dbname=marine_1', 'marine', 'monita2014');
	//$sth = $dbh->prepare("SELECT id_ship AS id,name FROM ship");
	////$sth = $dbh->prepare("SELECT * FROM ship");
	//$sth->execute();

	///* Exercise PDOStatement::fetch styles */
	//print("PDO::FETCH_ASSOC: ");
	//print("Return next row as an array indexed by column name\n");
	//$result = $sth->fetch(PDO::FETCH_ASSOC);
	////$result = $sth->fetch_assoc();
	//print_r($result);
	
	$sth = $dbh->prepare("SELECT id_ship AS id,name FROM ship");
	$sth->execute();

	/* Fetch all of the remaining rows in the result set */
	//print("Fetch all of the remaining rows in the result set:\n");
	$result = $sth->fetchAll();
	//print_r($result);
	
	
	
	
	
	
	//$query = 'SELECT id_ship AS id,name FROM ship';
	//$hasil = $db->query($query);
	//while($row = $hasil->fetch_assoc()){
		//$kapal[] = array(
					//"id"=>$row['id'],
					//"name"=>$row['name']
					//);
	//}
	
	$jsonResult = array(
        'success' => true,
        'kapal' => $result
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );

}	
echo json_encode($jsonResult);



/*
$host = "localhost";
$user = "monita";
$pass = "monita2011";
$db_name = "ws";
$conn = mysql_connect($host, $user, $pass)
        or die("Could not connect to server\n");
mysql_select_db($db_name, $conn);

$query = 'SELECT name
FROM 
ship;';

$isi_ada = mysql_query($query);

$data = '({"results":[';

while ($row = mysql_fetch_array($isi_ada)) {

    $data = $data . '{"name":"' . $row[0].'"},';
}
substr($data, 0, -1);

$data = $data . ']})';

echo $data;
* */
?>
