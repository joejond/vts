<?php
//$db = new mysqli('localhost', 'monita', 'monita2011', 'ws');
//$db = new mysqli('localhost', 'root', 'monita2014', 'vts');
$db = new PDO('mysql:host=localhost;dbname=vts', 'root', 'monita2014');

//if($db->connect_errno > 0){
    //die('Unable to connect to database [' . $db->connect_error . ']');
//}
//else echo 'Sukses';

?>
