<?php

session_start();
include	'../inc/conn_db.php';
include	'../inc/cekSession.php';


try{


$id = isset($_GET['id_kapal']) ? explode(",",$_GET['id_kapal']) : '';

//print_r ($id);

for ($i = 0 ; $i<sizeof($id); $i++){
	
	echo $id[$i];
	
	
	
	
	}


	
} 
catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );

}	





/*

$id = explode(",", $_GET['id_kapal']);

$n = sizeof($id);

$host = "localhost";
$user = "monita";
$pass = "monita2011";
$db_name = "ws";
$conn = mysql_connect($host, $user, $pass)
        or die("Could not connect to server\n");
mysql_select_db($db_name, $conn);

$text_out = '';

for($x = 0; $x < $n; $x++)
{
    $text_out = $text_out . $id[$x] . ',';
    
    //LAT
    
    $query = 'SELECT id_titik_ukur FROM titik_ukur where id_ship = ' . $id[$x] . ' and id_data_type = 1;';

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
    
    //LON
    $query = 'SELECT id_titik_ukur FROM titik_ukur where id_ship = ' . $id[$x] . ' and id_data_type = 2;';

    $isi_ada = mysql_query($query);
    $row = mysql_fetch_row($isi_ada);
    $tu = $row[0];

    $query = 'SELECT dt1.value FROM data as dt1
inner join(select max(dt3.data_time) as max_time from data as dt3 where dt3.id_titik_ukur = ' . $tu . ') as dt2 
on dt2.max_time = dt1.data_time and
dt1.id_titik_ukur = ' . $tu . ';';

    $isi_ada = mysql_query($query);
    $row = mysql_fetch_row($isi_ada);
    
    $text_out = $text_out . $row[0] . '|';
}

if($text_out == ',,|')
    echo 'null';
if($text_out != ',,|')
    echo $text_out;
*/
?>
