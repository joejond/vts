<?php

session_start();
include	'../inc/conn_db.php';
include	'../inc/cekSession.php';


try{

$id = (isset($_GET['id_kapal'])) ? $_GET['id_kapal'] : '';

echo $id;
	
} 
catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );

}	
//echo json_encode($jsonResult);



/*
$id = $_GET['id_kapal'];

$n = sizeof($id);

//$host = "localhost";
//$user = "monita";
//$pass = "monita2011";
//$db_name = "ws";
//$conn = mysql_connect($host, $user, $pass)
        //or die("Could not connect to server\n");
//mysql_select_db($db_name, $conn);

$text_out = '';

$query = 'SELECT name FROM ship WHERE id_ship = ' . $id . ';'; // LAT

$isi_ada = mysql_query($query);
$row = mysql_fetch_row($isi_ada);

$text_out = $text_out . $row[0] . ',';

for ($n = 1; $n < 15; $n++) {

    $query = 'SELECT id_titik_ukur FROM titik_ukur where id_ship = ' . $id . ' and id_data_type =' . $n . ';';

    $isi_ada = mysql_query($query);
    $row = mysql_fetch_row($isi_ada);
    $tu = $row[0];

    $query = 'SELECT dt1.value FROM data as dt1
        inner join(select max(dt3.data_time) as max_time from data as dt3 where dt3.id_titik_ukur = ' . $tu . ') as dt2 
        on dt2.max_time = dt1.data_time and
        dt1.id_titik_ukur = ' . $tu . ';';

    $isi_ada = mysql_query($query);
    $row = mysql_fetch_row($isi_ada);

    $text_out = $text_out . $row[0] . ',';
}

$query = 'SELECT max(data_time) FROM data where id_titik_ukur = ' . $tu . ';';

$isi_ada = mysql_query($query);
$row = mysql_fetch_row($isi_ada);

$text_out = $text_out . $row[0];

echo $text_out;
*/
?>
