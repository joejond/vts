<?php
  error_reporting(-1);
  ini_set('display_errors', 'On');
  include	'../inc/conn_db.php';

  try {
    if (isset($_GET['aset_id'])) {
      $aset_id = $_GET['aset_id'];
      $aset_id = explode(',',$aset_id);
      $json['aset_parameter'] = array();
      // echo '<pre>'.count($aset_id).'</pre>';
      for ($i = 0; $i < count($aset_id); $i++) {
        // echo '<pre>'.var_dump($aset_id[$i]).'</pre>';
        $query = "select a.aset_nama, a.attribute, v.id from aset a, visual_group v where a.id = v.aset_id and v.aset_id in ($aset_id[$i]) and v.type = 'vts';";
        // echo '<pre>'.var_dump($query).'</pre>';

        $sth = $db->prepare($query);
      	$sth->execute();
      	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
        // echo '<pre>'.var_dump($result).'</pre>';

        $name = $result[0]['aset_nama'];
        $attribute = $result[0]['attribute'];
        $vg_id = $result[0]['id'];

        // echo '<pre>'.var_dump($result[0]['id']).'</pre>';
        $query = "call get_titik_ukur('vg', ".$result[0]['id'].")";
        // echo '<pre>'.var_dump($query).'</pre>';

        $sth = $db->prepare($query);
      	$sth->execute();
      	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
        // echo '<pre>'.var_dump($result).'</pre>';
        $tu_id = $result;
        // $json = json_encode($result, JSON_PRETTY_PRINT);
        // echo '<pre>'.$json.'</pre>';
        $json['aset_parameter'][] = array(
          "name" => $name,
          "attribute" => json_decode($attribute),
          "vg_id" => $vg_id,
          "tu_id" => $tu_id
        );
      }

      // $test = json_encode($json, JSON_PRETTY_PRINT);
      // echo '<pre>'.$test.'</pre>';

    	$jsonResult = array(
            'success' => true,
            'result' => $json
        );
    }
  } catch(Exception $e) {
      $jsonResult = array(
          'success' => false,
          'message' => $e->getMessage()
      );

  }
  echo json_encode($jsonResult);
?>
