<?php
// error_reporting(-1);
// ini_set('display_errors', 'On');
// session_start();
include	'../inc/conn_db.php';
//include	'../inc/conn_db_linode1.php';
// include	'../inc/cekSession.php';

$start = microtime(true);

try{
	$id = isset($_GET['id']) ? $_GET['id'] : '';
	$arr_id = explode(',',$id);
	// print_r ($arr_id);
	//$q_last = 'call last_position ('.$id.')';
	//$sth = $db->prepare($q_last);
	//$sth->execute();
	//$result = $sth->fetchAll(PDO::FETCH_ASSOC);

	//echo $q_last;
	$keys = 'monita_service:realtime';
	$posisi = array();

	foreach ($arr_id as $key => $value) {
			// echo 'id ==> '.$value."</br>";
			$q_last = 'select id_kapal, aset_nama, tipe, key_tu from track_vessel where id_kapal = '.$value;
			// echo $q_last;
			$sth = $db->prepare($q_last);
			$sth->execute();
			//
			// echo $sth->
			if ($sth->rowCount() > 0){
				while ($row = $sth->fetch()){

					$nilai = $redis->hget($keys,$row['key_tu']);
					$a = explode(';',$nilai);

					if($row['tipe'] == 27)
					{
						$lat = isset($a[1])?$a[1]:"";
					}
					if($row['tipe'] == 28)
					{
						$lng = isset($a[1])?$a[1]:"";
					}
					$posisi2 = array(
						'id'	=> $row['id_kapal'],
						'lat'	=> (empty($lat))? "": $lat,
						'lng'	=> (empty($lng))? "": $lng
					);
				}
			}
			else {
				$posisi2 = array(
					'id'	=> $value,
					'lat'	=> "",
					'lng'	=> "",
				);
			}

			array_push($posisi,$posisi2);
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

$end = microtime(true);
$time = $end - $start;
// echo '</br>need time => '.$time.' scnd';

?>
