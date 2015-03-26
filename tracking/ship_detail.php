<?php

session_start();
include	'../inc/conn_db.php';
include	'../inc/cekSession.php';

try {
	
	$id = (isset($_GET['id']) && ($_GET['id'] <> '')) ? $_GET['id'] : '1';
	$tgl = (isset($_GET['tgl']) && ($_GET['tgl'] <> '')) ? $_GET['tgl'] : date('Y-m-d') ;
	
	//echo 'idkapal = '.$id. ' dan tanggal = '.$tgl.'<br>';
	
	$query = 'SELECT d.data_time as waktu, 
				max(case when tu.id_data_type="1" then round(d.value,2) end) lat,
				max(case when tu.id_data_type="2" then round(d.value,2) end) lng,
				max(case when tu.id_data_type="4" then round(d.value,2) end) spd,
				max(case when tu.id_data_type="3" then round(d.value,2) end) head,
				max(case when tu.id_data_type="5" then round(d.value,2) end) rpm1,
				max(case when tu.id_data_type="7" then round(d.value,2) end) prop1,
				max(case when tu.id_data_type="9" then d.value end) flow1,
				max(case when tu.id_data_type="11" then d.value end) ovflow1,
				max(case when tu.id_data_type="13" then round(d.value,2) end) temp1,
				max(case when tu.id_data_type="15" then round(d.value,2) end) pres1,
				max(case when tu.id_data_type="6" then round(d.value,2) end) rpm2,
				max(case when tu.id_data_type="8" then round(d.value,2) end) prop2,
				max(case when tu.id_data_type="10" then d.value end) flow2,
				max(case when tu.id_data_type="12" then d.value end) ovflow2,
				max(case when tu.id_data_type="14" then round(d.value,2) end) temp2,
				max(case when tu.id_data_type="16" then round(d.value,2) end) pres2,
				max(case when tu.id_data_type="17" then d.value end) rh1,
				max(case when tu.id_data_type="18" then d.value end) rh2,
				max(case when tu.id_data_type="19" then round(d.value,2) end) batt,
				max(case when tu.id_data_type="20" then round(d.value,2) end) `char`,
				tu.id_ship as kapal, 
				s.modem_id as modem
			FROM data d
				inner join titik_ukur tu on tu.id_titik_ukur = d.id_titik_ukur
				inner join ship s on s.id_ship = tu.id_ship
				
			WHERE
				tu.id_ship = "'.$id.'" and d.data_time like "'.$tgl.'%" 
			GROUP BY d.data_time
			ORDER BY d.data_time desc';
		
		//echo 'query = '.$query.'<br>';

	$sth = $db->prepare($query);
	$sth->execute();
	$result = $sth->fetchAll();
	
	$jsonResult = array(
        'success' => true,
        'detail_ship' => $result
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );

}	
echo json_encode($jsonResult);

?>
