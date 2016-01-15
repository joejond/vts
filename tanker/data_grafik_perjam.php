<?php

session_start();
include	'../inc/conn_db_tanker.php';
//include	'../inc/conn_db_linode2.php';
include	'../inc/cekSession.php';


try {
	
	
	$tz = $_SESSION['timezone'];
	$id = (isset($_GET['id']) && ($_GET['id'] <> '')) ? $_GET['id'] : '23';
	$tgl = (isset($_GET['tgl']) && ($_GET['tgl'] <> '')) ? $_GET['tgl'] : date('Y-m-d') ;
	
	// echo $tz.'<br>';
	//echo 'idkapal = '.$id. ' dan tanggal = '.$tgl.' di timezone = '.$tz. '<br>';
	//$query = 'SELECT date_format(tanggal, "%d-%b-%Y") as tanggal , jam, rpm1_avg as rpm1, prop1_avg as prop1, flow1_tot as flow1, overflow1_tot as overflow1, temp1_avg as temp1, press1_avg as press1, 
					//rpm2_avg as rpm2, prop2_avg as prop2, flow2_tot as flow2, overflow2_tot as overflow2, temp2_avg as temp2, press2_avg as press2, runhour1, runhour2 
				//FROM data_perjam 
				//WHERE id_ship = '.$id.' and tanggal= "'.$tgl.'"
				//ORDER BY tanggal desc, jam desc';

	//$query = 'call kapal_perjam('.$id.',"'.$tgl.'")';
	$query = 'call data_kapal_perjam_dinamis('.$id.',"'.$tgl.'","'.$tz.'")';
	//$query = 'call kapalan_perjam('.$id.',"'.$tgl.'","'.$tz.'")';
	
	// echo 'query == '.$query.'<br>';

	$sth = $db->prepare($query);
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
	
	$jsonResult = array(
        'success' => true,
        'g_perjam' => $result
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );

}	
echo json_encode($jsonResult);

?>
