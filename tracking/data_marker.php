<?php

session_start();
//include	'../inc/conn_db.php';
include	'../inc/conn_db_linode1.php';
include	'../inc/cekSession.php';


try{

//$id = (isset($_GET['id_kapal'])) ? $_GET['id_kapal'] : '';
	$id = isset($_GET['id']) ? $_GET['id'] : '';

	//echo $id;
	
	$q_last = 'select tu.id_ship as id, max(d.data_time) as wkt
					from data d
						join titik_ukur tu on tu.id_titik_ukur = d.id_titik_ukur
					where tu.id_ship = '.$id.'';
	$maxt = $db->prepare($q_last);
	$maxt->execute();
	
	$data = array();
	while ($row = $maxt->fetch()){
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
				tu.id_ship as kapal,  s.name as nama
			FROM data d
				inner join titik_ukur tu on tu.id_titik_ukur = d.id_titik_ukur
				inner join ship s on s.id_ship = tu.id_ship
				
			WHERE
				tu.id_ship = "'.$id.'" and d.data_time like "'.$row['wkt'].'%" 
			GROUP BY d.data_time
			ORDER BY d.data_time desc';
			
		$hsl = $db->prepare($query);
		$hsl->execute();
		$result = $hsl->fetchAll();
		
		array_push($data,$result);
		
	} 
					
	$jsonResult = array(
        'success' => true,
        'marker' => $data
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
