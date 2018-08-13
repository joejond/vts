<?php
 error_reporting(-1);
 ini_set('display_errors', 'On');
// session_start();
include	'../inc/conn_db.php';
// include	'../inc/cekSession.php';
try {
	//
	// echo "masuk coba";
	// $id_user = 3;

  if (isset($_COOKIE['marine'])) {
    $cook = $_COOKIE['marine'];
    // echo '<pre>'.var_dump($cook).'</pre>';
    $cook = base64_decode($cook);
    // echo '<pre>'.var_dump($cook).'</pre>';
    $cook = json_decode($cook, true);
    // echo '<pre>'.var_dump($cook).'</pre>';
    $id_user = $cook['idu'];
  }

	// $query = "select a.id,a.aset_nama name, u.id user_id from user_login u
	// 					join user_detail ud on ud.user_login_id = u.id
	// 					join user_company uc on uc.id = ud.company_id
	// 					join aset a on a.user_company_id = uc.id
	// 					join aset_cat ac on ac.id = a.aset_cat_id
	// 					where u.id = $id_user and ac.id = 3 and a.id=8";
  $query = "call get_aset($id_user);";
  // $query = "select id from visual_group where aset_id in (8,76) and type = 'vts';";
  // echo $query;
  // echo '<pre>'.var_dump($query).'</pre>';
	// $query = 'call ship_list()';

	$sth = $db->prepare($query);
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
  // echo '<pre>'.var_dump($result).'</pre>';
	$jsonResult = array(
        'success' => true,
        'ship' => $result
    );
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );

}
echo json_encode($jsonResult);

?>
