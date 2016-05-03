<?php

session_start();
include	'../inc/conn_db_tanker.php';
//include	'../inc/conn_db_linode1.php';
include	'../inc/cekSession.php';


try {
	$tz = $_SESSION['timezone'];
	$id = (isset($_GET['id']) && ($_GET['id'] <> '')) ? $_GET['id'] : '23';
	$tgl = (isset($_GET['tgl']) && ($_GET['tgl'] <> '')) ? $_GET['tgl'] : date('Y-m-d') ;
	//echo 'idkapal = '.$id. ' dan tanggal = '.$tgl.'<br>';
	//$query = 'SELECT sum(flow1_tot) as tot_fl1, sum(overflow1_tot) as tot_ovfl1, sum(flow2_tot) as tot_fl2, sum(overflow2_tot) as tot_ovfl2, sum(runhour1) as rh1, sum(runhour2) as rh2 
				//FROM data_perjam 
				//WHERE id_ship = '.$id.' and tanggal= "'.$tgl.'"';

	// echo "isi result  <br>";
	$query = 'call data_kapal_perjam_last_dinamis('.$id.',"'.$tgl.'","'.$tz.'")';
	
	$sth = $db->prepare($query);
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);

	// print_r($result);

	// echo "isi result 1 <br>";
	$q = 'call data_kapal_perhari('.$id.',"'.$tgl.'","'.$tz.'")';
	// echo $q."<br>";
	$sth = $db->prepare($q);
	$sth->execute();
	$result1 = $sth->fetchAll(PDO::FETCH_ASSOC);
	 // print_r($result1);

	// $a = array_merge($result,$result1);
	// echo "<pre> ";
	// print_r($result1);
	// echo "</pre> ";

	$bb = array();
	foreach ($result as $value) {
		$bb["volume1"] = $value["volume1"];
		$bb["volume2"] = $value["volume2"];
		$bb["volume3"] = $value["volume3"];
		$bb["volume4"] = $value["volume4"];
		$bb["volume5"] = $value["volume5"];
		$bb["volume6"] = $value["volume6"];
		$bb["volume7"] = $value["volume7"];
		$bb["volume8"] = $value["volume8"];
		$bb["volume9"] = $value["volume9"];
		$bb["volume10"] = $value["volume10"];
	}

	foreach ($result1 as $value) {
		$bb["delta_v1"] = $value["delta_v1"]; 
		$bb["delta_v2"] = $value["delta_v2"]; 
		$bb["delta_v3"] = $value["delta_v3"]; 
		$bb["delta_v4"] = $value["delta_v4"]; 
		$bb["delta_v5"] = $value["delta_v5"]; 
		$bb["delta_v6"] = $value["delta_v6"]; 
		$bb["delta_v7"] = $value["delta_v7"]; 
		$bb["delta_v8"] = $value["delta_v8"]; 
		$bb["delta_v9"] = $value["delta_v9"]; 
		$bb["delta_v5"] = $value["delta_v5"]; 
		$bb["waktu"] = $value["waktu"]; 
	}

	// echo "<pre> ";
	// print_r($bb);
	// echo "</pre> ";

	$jsonResult = array(
        'success' => true,
        'g_perhari' => $bb
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );

}	
echo json_encode($jsonResult);

?>
