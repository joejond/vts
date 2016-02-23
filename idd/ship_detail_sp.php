<?php
$start = microtime();
session_start();
include	'../inc/conn_db.php';
//include	'../inc/conn_db_linode1.php';
include	'../inc/cekSession.php';

try {
	$tz = $_SESSION['timezone'];
	$id = (isset($_GET['id']) && ($_GET['id'] <> '')) ? $_GET['id'] : '25';
	$tgl = (isset($_GET['tgl']) && ($_GET['tgl'] <> '')) ? $_GET['tgl'] : date('Y-m-d') ;

	// $psrh = 1;
	// $tz = '+08:00';
	
	//echo 'idkapal = '.$id. ' dan tanggal = '.$tgl.'<br>';
	
	//$query = 'call data_kapal('.$id.', "'.$tgl.'")';
	//$query = 'call data_kapal_dinamis('.$id.', "'.$tgl.'")';
	$query = 'call data_kapal_dinamis('.$id.',"'.$tgl.'","'.$tz.'")';
		//echo 'query = '.$query.'<br>';

	$sth = $db->prepare($query);
	$sth->execute();
 

	$result = $sth->fetchAll(PDO::FETCH_ASSOC);	
	
	// $j = 0;
	// for ($i = 0; $i < $sth->columnCount(); $i++) {
	//     $col = $sth->getColumnMeta($i);
	//     $columns[$j]['name'] = $col['name'];
	//     $isi[$j]['dataIndex'] = $col['name'];
	//     $isi[$j]['text'] = $col['name'];

	//     if ($col['name'] == 'waktu' || $col['name'] == 'kapal' || $col['name'] == 'modem'){
	//     	$columns[$j]['type'] = 'string';
	//     }
	//     else $columns[$j]['type'] = 'float'; 
	//     $j++;
	// }
	// print_r($columns);


	$jsonResult = array(
        'success' => true,
        // 'metaData' => array(
        // 		'fields'=>$columns,
        // 		'columns' => $isi,
        // 	),
        
        'detail_ship' => $result
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );

}	
echo json_encode($jsonResult);
//echo '</br>';
$end = microtime();
$creationtime = ($end - $start) / 1000;
//printf("Page created in %.5f seconds.", $creationtime);
?>
