<?php

session_start();
include	'../inc/conn_db_tanker.php';
//include	'../inc/conn_db_linode1.php';
include	'../inc/cekSession.php';


try{
	$id = isset($_GET['id']) ? $_GET['id'] : '';
	//print_r ($id);
	//$q_last = 'call last_position ('.$id.')';
	//$sth = $db->prepare($q_last);
	//$sth->execute();
	//$result = $sth->fetchAll(PDO::FETCH_ASSOC);
	
	//echo $q_last;
	$q_last = 'select tu.id_ship as id, max(d.data_time) as wkt
					from data d
						join titik_ukur tu on tu.id_titik_ukur = d.id_titik_ukur
					where tu.id_ship in ('.$id.')
					group by tu.id_ship'; 
	echo $q_last;
	$sth = $db->prepare($q_last);
	$sth->execute();
	//$result = $sth->fetchAll(PDO::FETCH_ASSOC);
	$posisi = array();
	while ($row = $sth->fetch()){
		//array_push = ()
		print_r ($row);
		//echo 'waktu '.$row['wkt'].'<br>';
		//echo 'nama :'.$row['name'].'<br>';
		$q_lat = 'select d.value as lat
				from data d 
					join titik_ukur tu on tu.id_titik_ukur = d.id_titik_ukur
				where  d.data_time = "'.$row['wkt'].'" and tu.id_ship = "'.$row['id'].'" and tu.id_data_type = 1';
		echo 'q_lat => '.$q_lat.'<br>';			
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
				where  d1.data_time = "'.$row['wkt'].'" and tu1.id_ship = "'.$row['id'].'" and tu1.id_data_type = 2';
		//echo 'q_lng => '.$q_lng.'<br>';		
		$lng = $db->prepare($q_lng);
		$lng->execute();
		while ($sss = $lng->fetch())	{
			//echo 'ini lng : '.$sss['lng'].'<br>';
			$posisi2 = array('lng'=>$sss['lng']);
			//print_r($posisi2);
		}

		$kapal = array('id'=>$row['id']); 
		$posisi3 = array_merge($kapal,$posisi1,$posisi2);
		array_push($posisi,$posisi3);
	} 

	$jsonResult = array(
        'success' => true,
        //'posisi' => $result
        'posisi' => $posisi
    );

} 
catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );

}	

echo json_encode($jsonResult);

?>
