<?php
error_reporting(-1);
ini_set('display_errors', 'On');
include	'../inc/conn_db.php';

try {

  if (isset($_COOKIE['marine'])) {
    $cook = $_COOKIE['marine'];
    // echo '<pre>'.var_dump($cook).'</pre>';
    $cook = base64_decode($cook);
    // echo '<pre>'.var_dump($cook).'</pre>';
    $cook = json_decode($cook, true);
    // echo '<pre>'.var_dump($cook).'</pre>';
    $id_user = $cook['idu'];
  }

  $query = "call get_aset($id_user);";

	$sth = $db->prepare($query);
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);

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
