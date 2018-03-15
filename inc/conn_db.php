<?php
 error_reporting(-1);
 ini_set('display_errors', 'On');
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

//<<<<<<< HEAD
$db = new PDO('mysql:host=localhost;dbname=monita4', 'monita4', 'monita4');
//=======
// $db = new PDO('mysql:host=localhost;dbname=marine_1', 'marine', 'monita2014');
//$db = new PDO('mysql:host=10.10.10.11;dbname=monita4', 'monita4', 'monita4');
// if(!db){
//   die('could not connect: ');
//
// }
// else {
//   echo 'sukses';
// }


//>>>>>>> acbcd4121c59d1900b3ea98bec84944ec035c339

//$redis = new Redis;
//$redis->connect('localhost',6379);

// echo 'connecttion to server success';
// echo 'server is running '.$redis->ping();
?>
