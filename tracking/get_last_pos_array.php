<?php

session_start();
include	'../inc/conn_db.php';
include	'../inc/cekSession.php';


try{
	$id = isset($_GET['id']) ? $_GET['id'] : '';
	//print_r ($id);
	$q_last = 'select tu.id_ship as id,max(d.data_time) as wkt
					from data d
						join titik_ukur tu on tu.id_titik_ukur = d.id_titik_ukur
					where id_ship in ('.$id.')
					group by tu.id_ship'; 

	$sth = $db->prepare($q_last);
	$sth->execute();
	$posisi = array();
	while ($row = $sth->fetch()){
		
		//print_r ($row);
		//echo 'waktu '.$row['wkt'].'<br>';
		//echo 'id_kapal :'.$row['id'].'<br>';
		$q_lat = 'select d.value as lat
				from data d 
					join titik_ukur tu on tu.id_titik_ukur = d.id_titik_ukur
				where  d.data_time = "'.$row['wkt'].'" and tu.id_data_type = 1';
		//echo 'q_lat => '.$q_lat.'<br>';			
		$lat = $db->prepare($q_lat);
		$lat->execute();
		
		while ($ss = $lat->fetch())	{
			//echo 'ini lat : '.$ss['lat'].'<br>';
			$posisi1 = array( 'lat'=>$ss['lat'] );
			//print_r($posisi1);
		}
		
		$q_lng = 'select d1.value as lng
				from data d1 
					join titik_ukur tu1 on tu1.id_titik_ukur = d1.id_titik_ukur
				where  d1.data_time = "'.$row['wkt'].'" and tu1.id_data_type = 2';
		//echo 'q_lng => '.$q_lng.'<br>';		
		$lng = $db->prepare($q_lng);
		$lng->execute();
		while ($sss = $lng->fetch())	{
			//echo 'ini lng : '.$sss['lng'].'<br>';
			$posisi2 = array('lng'=>$sss['lng']);
			//print_r($posisi2);
		}

		$kapal = array('id'=>$row['id']); 
		$posisi3 = array_merge($posisi1,$posisi2,$kapal);
		array_push($posisi,$posisi3);
	} 
//print_r($posisi);

	foreach($posisi as $isi){
			$aa = $isi['id'].','.$isi['lat'].','.$isi['lng'].'|';
			
			$bb = ($aa != ',,|') ? $aa : 'null';
			
			echo $bb;
		
		}
	

	$jsonResult = array(
        'success' => true,
        'posisi' => $posisi
    );

} 
catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );

}	

//echo json_encode($jsonResult);



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
