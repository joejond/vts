<!DOCTYPE html>

<?php
	//
	session_start();
	include	'../inc/cekSession.php';
?>
<html>
    <head>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=9"  />
        <title>MONITA - Tanker Tracking System</title>
		<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3"></script>
        <script type="text/javascript" src="../extjs/ext-all.js"></script>
        
        <link rel="icon" type="image/png" href="img/vessel.png">
        <link rel="stylesheet" type="text/css" href="../extjs/resources/css/ext-all-gray.css" /> 
		
        <script type="text/javascript" src="../js/jquery.min.js"></script>
		<script type="text/javascript" src="../Chart/highcharts.js"></script>
		<script type="text/javascript" src="../Chart/highcharts-more.js"></script>
		<script type="text/javascript" src="../Chart/exporting.js"></script>		
        
       
        
        <style type="text/css">
            .labels {
              color: blue;
              font-family: "Lucida Grande", "Arial", sans-serif;
              font-size: 9px;
              font-weight: bold;
              text-align: center;
              width: 80px;
              white-space: nowrap;
            }
         
            #app-header-title{
            padding:15px 9px 9px 80px;
            background:url(img/header.png) no-repeat 9px 4px;
            /*color:blue;*/
            font-size:25px;
            font-weight:bold;
            text-shadow:0 2px 0 white
        }
        
        </style>            
        <script type="text/javascript" src="markerwithlabel.js"></script>
        <script type="text/javascript" src="tab_map.js"></script>
        <script type="text/javascript" src="detail_kapal.js"></script>
        <script type="text/javascript" src="data_hitung.js"></script>
        <script type="text/javascript" src="marine.js"></script>
    </head>
    <body></body>
</html>
