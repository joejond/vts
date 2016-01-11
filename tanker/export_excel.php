<?php
include	'../inc/conn_db_linode2.php';
require_once 'Classes/PHPExcel.php';
$objPHPExcel = new PHPExcel();

// function getData($vessel,$date,$tz)
// 	{
// 		require	'../inc/conn_db.php';
// 		// echo $vessel.' <=> '.$date.'<br>';
// 		//query data
// 		// $q = "call data_kapal_dinamis(".$vessel.", '".$date."', '".$tz."')";
// 		$q = "call data_kapal_dinamis(1,'2015-06-01','+07:00')";
// 		$stm = $db->prepare('$q');
// 		$stm->execute();

// 		$hasil = $stm->fetch(PDO::FETCH_ASSOC);

// 		return print_r($hasil);
// 		// echo $q;
// 	}



try {

	$nama_file = 'coba';



	$judul = array(
		0 =>'No',
		1 => 'Vessel',
		2 => 'TimeStamp',
		3 => 'Latitude',
		4 => 'Longitude',
		5 => 'Speed',
		6 => 'Heading', 
		7 => 'Engine RPM #1', 
		8 => 'Propeller RPM #1', 
		9 => 'Fuel In #1',
		10 => 'Fuel Out #1', 
		11 => 'Temp #1', 
		12 => 'Pressure #1',
		13 => 'Engine RPM #2', 
		14 => 'Propeller RPM #2', 
		15 => 'Fuel In #2', 
		16 => 'Fuel Out #2', 
		17 => 'Temp #2',
		18 => 'Pressure #2', 
		19 => 'Engine RPM #3', 
		20 => 'Propeller RPM #3',
		21 => 'Fuel In #3',
		22 => 'Fuel Out #3', 
		23 => 'Temp #3', 
		24 => 'Pressure #3',
		25 => 'Engine RPM #4', 
		26 => 'Propeller RPM #4', 
		27 => 'Fuel In #4', 
		28 => 'Fuel Out #4', 
		29 => 'Temp #4', 
		30 => 'Pressure #4',
		31 => 'Genset #1',
		32 => 'Genset #2',
		33 => 'Genset #3',
		34 => 'Battery',
		35 => 'Charger'
	);

	$data = array(
		0 => 

		);

	// print_r($judul);

	// echo "jmlah judul ".sizeof($judul);

	$coll_offset = 0;
	$row_offset = 0;
/*
	for ($i=0; $i<sizeof($judul); $i++ ){
		// Set cell B8
		// $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow(1, 8, 'Some value');
		$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($i, 8, $judul[$i]);

	}
//*/



	$data = array();

	// $q = "select " 
	
	$vessel = isset($_GET['id'])? $_GET['id'] : '';
	$tanggal = isset($_GET['t'])? $_GET['t'] : '';

	$q = "select id_ship from ship where name = '".$vessel."'";
	$stm = $db->prepare($q);
	$stm->execute();

	$result = $stm->fetch(PDO::FETCH_OBJ);
	// // $result1 = $stm->fetch(PDO::FETCH_ASSOC);

	// // echo 'ambil laporan '.$vessel.' atau '.$result->id_ship.' pada tgl: '.$tanggal.' -->'.$q.'<br>';
	// print_r($result);
 	// $q = "call data_kapal_dinamis(".$result->id_ship.", '".$date."', '".$tz."')";
 	$q1 = "call data_kapal_dinamis(".$result->id_ship.", '".$tanggal."', '+07:00')";
	// // $q = "call data_kapal_dinamis('1','2015-06-01','+07:00')";

	// echo $q1.'<br>';
	$stm = $db->prepare($q1);
	$stm->execute();
	$hasil = $stm->fetchAll(PDO::FETCH_BOTH);
	// $hasil = $stm->fetchAll(PDO::FETCH_ASSOC);
	$jml = $stm->rowCount();

	// echo $jml.'<br>';
	// // echo $hasil[0];
	// print_r($hasil['0']['lat']);
// [0] => Array ( [waktu] => 2015-12-10 23:49:04 [lat] => -0.11 [lng] => 117.56 [heading] => 0.00 [speed] => 0.00 [rpm1] => 0.00 [rpm2] => 0.00 [prop1] => 0.00 [prop2] => 0.00 [inflow1] => 3147600.00 [inflow2] => 3089430.00 [outflow1] => 2866070.00 [outflow2] => 2846230.00 [temp1] => 32.60 [temp2] => 32.73 [press1] => 0.19 [press2] => 0.21 [runhour1] => 22534000.00 [runhour2] => 19232400.00 [battery] => 13.59 [charger] => 14.74 [kapal] => 1 [modem] => 01050309SKYA416 )
 // 	$rowCount = 1;
	for($j = 0; $j<$jml; $j++){ //row$
		for ($ii=0; $ii<sizeof($judul); $ii++ ){  //kolom
			// echo $hasil[$j][$ii].'<br>';

			// echo 'baris ke '.$j.' , dan kolom ke '.$ii.'<br>';
			// echo $hasil[$j][$ii].'<br>';

			if (!empty($hasil[$j][$ii])){
				if ($j==0){
					echo $judul[$ii].'<br>';
				}

				else{
					echo $hasil[$j-1][$ii].'<br>';
				}


				
			}

			// if (!isset($hasil[$j][$ii])){
			// 	$hasil[$j][$ii] = '';
			// }
			// $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($ii+1, $j+9, $hasil[$j][$ii]);

		}
	}

	
	// foreach ($hasil as $row) {
	// 	$objPHPExcel->getActiveSheet()->SetCellValue('A'.$rowCount, $row['waktu']);
	// 	$objPHPExcel->getActiveSheet()->SetCellValue('B'.$rowCount, $row['lat']);
	// 	$objPHPExcel->getActiveSheet()->SetCellValue('C'.$rowCount, $row['lng']);
	// 	$objPHPExcel->getActiveSheet()->SetCellValue('D'.$rowCount, $row['heading']);
	// 	$objPHPExcel->getActiveSheet()->SetCellValue('E'.$rowCount, $row['speed']);
	// 	$objPHPExcel->getActiveSheet()->SetCellValue('F'.$rowCount, $row['rpm1']);
	// 	$objPHPExcel->getActiveSheet()->SetCellValue('G'.$rowCount, $row['prop1']);
	// 	$objPHPExcel->getActiveSheet()->SetCellValue('H'.$rowCount, $row['inflow1']);
	// 	$objPHPExcel->getActiveSheet()->SetCellValue('I'.$rowCount, $row['outflow1']);
	// 	$objPHPExcel->getActiveSheet()->SetCellValue('J'.$rowCount, $row['temp1']);
	// 	$objPHPExcel->getActiveSheet()->SetCellValue('K'.$rowCount, $row['press1']);
	// 	$objPHPExcel->getActiveSheet()->SetCellValue('L'.$rowCount, $row['rpm2']);
	// 	$objPHPExcel->getActiveSheet()->SetCellValue('M'.$rowCount, $row['inflow2']);
	// 	$objPHPExcel->getActiveSheet()->SetCellValue('O'.$rowCount, $row['outflow2']);
	// 	$objPHPExcel->getActiveSheet()->SetCellValue('P'.$rowCount, $row['temp2']);
	// 	$objPHPExcel->getActiveSheet()->SetCellValue('Q'.$rowCount, $row['press2']);

	// 	$rowCount++;
	// }

	// Rename worksheet
	// $objPHPExcel->getActiveSheet()->setTitle('Simple');


	// Set active sheet index to the first sheet, so Excel opens this as the first sheet
	// $objPHPExcel->setActiveSheetIndex(0);


/*
	// Redirect output to a client’s web browser (Excel5)
	header('Content-Type: application/vnd.ms-excel');
	// header('Content-Disposition: attachment;filename="01simple.xls"');
	header('Content-Disposition: attachment;filename= "'.$nama_file.'.xls"');
	header('Cache-Control: max-age=0');
	// If you're serving to IE 9, then the following may be needed
	header('Cache-Control: max-age=1');

	// If you're serving to IE over SSL, then the following may be needed
	header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
	header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
	header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
	header ('Pragma: public'); // HTTP/1.0

	$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
	$objWriter->save('php://output');
//*/

} 
catch(Exception $e){
	echo $e->getMessage();


}





?>