<?php
session_start();

include	'../inc/ExcelExport.php';
include	'../inc/conn_db.php';
// include	'../inc/conn_db_linode2.php';
include	'../inc/cekSession.php';
$xls = new ExcelExport();


$id_ves = isset($_GET['id'])? $_GET['id'] : '';
$tgl = isset($_GET['t'])? $_GET['t'] : '';
// echo $_SESSION['timezone'].'<br>';
// echo $id_ves.'<br>';
// echo $tgl.'<br>';
$tz = $_SESSION['timezone'];

$query = "call data_kapal_dinamis($id_ves,'$tgl','$tz')";
	
// echo 'query == '.$query.'<br>';

$sth = $db->prepare($query);
$sth->execute();
$result = $sth->fetchAll(PDO::FETCH_ASSOC);

// print_r($result);

$qves = "select name vessel from ship where id_ship = $id_ves";
// echo $qves;
$sth = $db->prepare($qves);
$sth->execute();
$kapal = $sth->fetch(PDO::FETCH_OBJ);
$kpl = $kapal->vessel;

$r = 5;
function judul($xls){
	global $kpl;
	global $tgl;
	global $result;
	global $r;
	global $c;

	
	$xls->addRow(Array("Data Detail ".$kpl));
	$xls->addRow(Array("Date : ".$tgl));
	
	$i = 0; 
	foreach ($result[0] as $key => $value) {
		// echo $key;
		$xls->writeCell($key,$r,$i);
		$i++;
	}
}

function data($xls){
	global $kpl;
	global $tgl;
	global $result;
	global $r;
	global $c;
	
	$j=0;
	foreach ($result as $value) {
		// echo $value.'<br>';
		$k = 0;
		foreach ($value as $hsl) {
        	$xls->writeCell($hsl,$r+2+$j,$k);
			$k++;
		}
		$j++;
	}
}


//buat laporan
judul($xls);
data($xls);
$xls->download("Detail ". $kpl." (".$tgl.").xls");

//selesai laporan


?>