<?php
//$con = mysql_connect("localhost", "monita", "monita2011");
//if (!$con)
  //{
  //die('Could not connect: ' . mysql_error());
  //}
//mysql_select_db("marine", $con) or die("Database tidak ada");  

//$db = new mysqli('localhost', 'marine', 'monita2014', 'marine_1');

	//if($db->connect_errno > 0){
		//die('Unable to connect to database [' . $db->connect_error . ']');
	//}
	//else echo 'Sukses';

$db = new PDO('mysql:host=66.228.59.91;dbname=ws', 'monita', 'monita2011');

?>
