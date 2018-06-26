<!DOCTYPE html>

<?php
	//
	session_start();
  // echo 'masuk..';


  if(isset($_COOKIE['marine'])){
    $dec64= base64_decode($_COOKIE['marine']);
    // echo $dec64;
    $result = json_decode($dec64);
    // // echo $hsl->{'u'}."<br>";
    // // echo $hsl->{'tz'}."<br>";
    //
    $_SESSION['id']		= $result->{'idu'};
    $_SESSION['username']	= $result->{'u'};
    // // $_SESSION['company']	= $result->id_company;
    $_SESSION['timezone']	= $result->{'tz'};

  }
  // echo $_SESSION['id'].'<br>';
  // echo $_SESSION['username'].'<br>';
  // echo $_SESSION['timezone'].'<br>';

  // echo $_COOKIE['marine'];
  // $dec64= base64_decode($_COOKIE['marine']);
  // echo $dec64;
  // $hsl = json_decode($dec64);
  // echo $hsl->{'u'}."<br>";
  // echo $hsl->{'tz'}."<br>";

	include	'../inc/cekSession.php';
?>
<html>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=9"  />
        <title>MONITA - Vessel Tracking System</title>
        <script type="text/javascript" src="../extjs/ext-all.js"></script>

        <link rel="icon" type="image/png" href="img/vessel.png">
        <link rel="stylesheet" type="text/css" href="../extjs/resources/css/ext-all-gray.css" />

        <script type="text/javascript" src="../js/jquery.min.js"></script>
		<script type="text/javascript" src="../Chart/highcharts.js"></script>
		<script type="text/javascript" src="../Chart/highcharts-more.js"></script>
		<script type="text/javascript" src="../Chart/exporting.js"></script>

		<style type="text/css">
			.labels {
				color: red;
				background-color: white;
				font-family: "Lucida Grande", "Arial", sans-serif;
				font-size: 10px;
				font-weight: bold;
				text-align: center;
				width: 40px;
				border: 2px solid black;
				white-space: nowrap;
			}
		</style>
				<span id="id01" style="background-color: #FFFF00"></span>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3&&key=AIzaSyC-UUPT4sbJjlVTR19z9tt-bBvkVVdeLmI"></script>
				<!-- <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyC-UUPT4sbJjlVTR19z9tt-bBvkVVdeLmI&callback=" defer></script> -->
        <!-- <script type="text/javascript" src="https://cdn.rawgit.com/googlemaps/v3-utility-library/master/markerwithlabel/src/markerwithlabel.js" defer></script> -->
        <!-- <script type="text/javascript" src="markerwithlabel.js" defer></script> -->

				<script type="text/javascript" src="../js/googlemaps-v3-utility-library/markerwithlabel/src/markerwithlabel.js"></script>
				<script type="text/javascript" src="../js/googlemaps-v3-utility-library/maplabel/src/maplabel.js"></script>

        <!-- <script type="text/javascript" src="markerwithlabel.js"></script> -->
        <!-- <script type="text/javascript" src="https://cdn.rawgit.com/googlemaps/v3-utility-library/master/markerwithlabel/src/markerwithlabel.js"></script> -->
        <!-- https://cdn.rawgit.com/googlemaps/v3-utility-library/master/markerwithlabel/src/markerwithlabel.js -->
				<!-- <script type="text/javascript" src="../js/lmanager_62.js"></script> -->
				<script type="text/javascript" src="../js/lmanager.js" sync></script>
				<script type="text/javascript" src="tab_map.js"></script>
        <script type="text/javascript" src="detail_kapal.js"></script>
        <script type="text/javascript" src="data_hitung.js"></script>
        <script type="text/javascript" src="marine.js"></script>
				<script type="text/javascript" src="report_adhoc.js"></script>
				<script type="text/javascript" src="report_sum.js"></script>


    </head>
    <body></body>
</html>
