<?php
include 'conn_pdo.php';
date_default_timezone_set("Asia/Makassar");

function hexTo32Float($number)
{
    $binfinal    = sprintf("%032b", hexdec($number));
    $sign        = substr($binfinal, 0, 1);
    $exp         = substr($binfinal, 1, 8);
    $mantissa    = "1" . substr($binfinal, 9);
    $mantissa    = str_split($mantissa);
    $exp         = bindec($exp) - 127;
    $significand = 0;
    
    for ($i = 0; $i < 24; $i++) {
        $significand += (1 / pow(2, $i)) * $mantissa[$i];
    }
    return $significand * pow(2, $exp) * ($sign * -2 + 1);
}

function insert_titik ($id_titik,$value,$tgl){
	require 'conn.php';
	$th		= date("Y",strtotime($tgl));
	$bl 	= date("m",strtotime($tgl));
	$hr  	= date("d",strtotime($tgl));
	$jam   	= date("H",strtotime($tgl));
	$mnt 	= date("i",strtotime($tgl));
	
	//cek value di tgl dan id_titik_ukur
	$cek = 'select value from data where id_titik_ukur = '.$id_titik.' and data_time = "'.$tgl.'"';
	$hsl = $db->query($cek);
	$jml = mysqli_num_rows($hsl);
	
	if ($jml != 1) $ins = 'insert into data (id_titik_ukur,value,id_trip,data_time,year,month,day,hour,minute,origin) values ("'.$id_titik.'","'.$value.'","0","'.$tgl.'","'.$th.'","'.$bl.'","'.$hr.'","'.$jam.'","'.$mnt.'","1")' ;
	else $ins = 'update data set value = "'.$value.'" where id_titik_ukur = '.$id_titik.' and data_time = "'.$tgl.'"';
	
	//$query = $db->query($ins);
	
	return $query ;
	
	
}

function urutan ($modem_id){
	require 'conn.php';
	$datax = array();
	$query = 'SELECT id_tu, urutan_data_monita
				FROM parsing_ref p
				inner join ship s on s.id_ship = p.id_ship  
				where s.modem_id = "'.$modem_id.'" and urutan_data_monita > 1 order by urutan_data_monita;';
	$hasil = $db->query($query);
	return $hasil;
	
	}
	
function parsing($rawpayload){
	
	
	}

$dateambil = isset($_GET['start'])?  date('Y-m-d H:i:s', strtotime($_GET['start'])) : date ('Y-m-d H:i:s',time()-10 * 3600); //3 jam WIB sebelum jam UTC 
echo 'ambil data tgl (utc - 7 - 2 jam) = '.$dateambil.'<br>';

$mdm = 'select modem_id, gateway from ship '.((!isset($_GET['modem']))? '' : 'where modem_id = "'.$_GET['modem'].'"');
//$mdm = 'select modem_id from ship '.((!isset($_GET['modem']))? '' : 'where modem_id = "'.$_GET['modem'].'"');
echo 'queri modem  = '.$mdm.'<br>';
//$hasil = $db->query($mdm);

	//$sth = $db->prepare($mdm);
	//$sth->execute();
	////$result = $sth->fetchAll(PDO::FETCH_ASSOC);


////while ($row = $hasil->fetch_assoc(PDO::FETCH_ASSOC)){
//while ($row = $sth->fetch()){
	
	
$hasil = $db->prepare($mdm);
$hasil->execute();
//$result = $hasil->fetchAll(PDO::FETCH_ASSOC);

//print_r ($result);


while ($row = $hasil->fetch()){
		//print_r($row);
		//echo 'gateway'.$row['gateway'].'--> modem : '.$row['modem_id'].'<br>'; 
	
		$url = $row['gateway'].'/RestMessages.svc/get_return_messages.xml/?access_id=70000214&password=STSATI2010&mobile_id='.$row['modem_id'].'&start_utc='.$dateambil;
		echo 'url = '.$url.'<br>';
		
		$filexml = simplexml_load_file($url);
		foreach ($filexml->Messages->ReturnMessage as $retmes){
			
			//print_r($retmes);
			//$paylodjml = sizeof($retmes->Payload);
			//$rpaylodjml = sizeof($retmes->RawPayload);
			
			
			
			
			//$isipayload = $retmes->Payload;
			
			//print_r($isipayload);
			
			echo 'Mulai Parsing XML <br>';
			echo '================ <br>';
			
			if (sizeof($retmes->Payload) == 1){
				echo 'jml Payload : '.sizeof($retmes->Payload).'<br>';
				
				$payload = array();
				foreach ($retmes->Payload->Fields->Field as $data ){
						array_push($payload,$data['Value']);
				}
			//print_r($payload);
				
			}
			else{
				echo 'jml RawPayload : '.sizeof($retmes->RawPayload).'<br>';
				
			} 
			
			print_r($payload);
			echo  '================ <br>';
			/*
			echo 'Mulai Parsing XML <br>';
			echo '================ <br>';
			$payload = array();
			foreach ($retmes->Payload->Fields->Field as $data ){
					array_push($payload,$data['Value']);
				}
			//print_r($payload);

			$tanggal = hexTo32Float(dechex($payload[0]));
			$date1	= date('Y-m-d H:i:s', $tanggal);
			echo 'tanggal data ==> '.$date1.'<br>';
			
			$urut = urutan($row['modem_id']);
			
			while ($row1 = mysqli_fetch_assoc($urut)){
				//echo $row1['id_tu'];
				$id_titik = $row1['id_tu'];
				$no_urut = $row1['urutan_data_monita'];
				//echo $id_titik.'<br>';
				//echo $no_urut.'<br>';
				//$id_urut = substr($angka,1,3);
				//echo 'id_titik_ukur = '.$angka .'<br>';
				//echo (int)$id_urut  .'<br>';
				$value = round(hexTo32Float(dechex($payload[$no_urut-1])),6);
				
				echo 'data urut ke-'.$no_urut.' => '.$id_titik.' dg value : '.$value.'<br>';
				
				//insert_titik ($id_titik,$value,$date1);
			}			
			echo  '================ <br>';
			 
			//*/

	}
}
