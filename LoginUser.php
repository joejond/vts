<?php
// error_reporting(-1);
// ini_set('display_errors', 'On');
session_start();
//>>>>>>> acbcd4121c59d1900b3ea98bec84944ec035c339
//include	'inc/conn_db.php';


?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login | MONITA - Vessel Tracking System</title>
	<link rel="icon" type="image/png" href="tracking/img/vessel.png">


	<link href="css/bootstrap.min.css" rel="stylesheet">
	<style>
	body {padding-top : 20px;}

  .multiline-row .x-grid-cell-inner {
    overflow: auto !important;
    white-space: normal !important;
    text-overflow: ellipsis;
    display: block;
  }
	</style>
  <!-- <style type=text/css>
  .x-grid-row .x-grid-cell-inner {
    white-space: normal;
  }
  .x-grid-row-over .x-grid-cell-inner {
    white-space: normal;
  }
  </style> -->
<!--</body></html>-->

</head>
<body>

<div class="container">
  	<div class="row">
		<!--div class="col-md-6 col-md-offset-3 " >
			<p class="center-block" align="center">
				<img src="inc/image/ship.png"><h2>Vessel Tracking System</h2>
			</p>
		</div-->
		<div class="col-md-4 col-md-offset-4">
			<h2 class="text-center">Login</h2>
		</div>
  	</div>
  	<div id="marine_login">
    <div class="row" >
        <div class="col-md-4 col-md-offset-4" >
          	<div class="well">
	            <form role="form" name="flogin" id="flogin" method="post"  action="javascript:;">
                <div class="form-group">
        					<label class="control-label">Username</label>
        					<input class="form-control" name="userid" id="userid" placeholder="username" type="text">
                </div>
                <div class="form-group">
        					<label for="inputPassword" class="control-label">Password</label>
        					<input class="form-control" name="passwd" id="passwd" placeholder="password" type="password">
                </div>
                <!-- <div class="form-group">
          					<div class="input-group">
          						<span class="input-group-addon">
          							<img src="inc/capca.php" alt="Pass code" height="20" width="130">
          						</span>
          						<input class="form-control" name="capcai" id="capcai" placeholder="Kode" type="text" >

          					</div>
          					<p class="help-block">Access from <?php //echo ' '.$ip;?></p>

                </div> -->

                <div class="form-group">
					             <button type="submit" class="btn btn-primary btn-block" name="login" id="login" >Login</button>
                </div>

		          </form>
	           </div>
  	    </div>
    </div>
	</div>
	<!-- <div class="row">
		<div class="col-md-4 col-md-offset-4">
			<div id="pesan">
			<div class="well well-sm">
				<?php //echo $msg; ?>
			</div>
		</div>

		</div>
	</div> -->

</div>
<?php
//$alert = "ini lagi coba";
?>
    <script src="js/jquery.min.js"></script>
    <script src="js/lmanager.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <!-- <script src="js/lmanager_62.js"></script> -->
    <script src="js/isMobile.js"></script>
    <!-- <script src="js/jsencode.js"></script> -->
    <!-- <script src="js/base64.min.js"></script> -->
    <script>
		$(document).ready(function(){
			$("#flogin").submit(function(){
				console.log("di submit");
				var uname = $("input[name='userid']").val(),
				pas = $("input[name='passwd']").val();

				var dt = {u:$("input[name='userid']").val(),p:encodeMD5(pas)};
				var j = JSON.stringify(dt);
				var uid = btoa(j);
				// console.log('j', j);
				// console.log('uid', uid);
				$.ajax(
				{
					// Post the variable fetch to url.
					type : 'post',
					// url : 'http://project.daunbiru.com:1336/auth/login',
					url : getAPI()+'/auth/login',
					dataType : 'json', // expected returned data format.
					// crossDomain : true,
					data :{idu : uid},
					// data :{idu : 'eyJ1IjoicGVsaW5kbzMiLCJwIjoiNDI2MjY2ZGRiNTY5ZTJmZjQxZDU2MGIwYzIxZmY1MjkifQ=='},
					success : function(data)
					{
							console.log('satu', data);
						if (data.success){

							var res = JSON.parse(atob(data.auth));
							var obj = JSON.stringify({idu:res.uid,u:res.nama,role:res.role_id,tz:getTimeZone()});

							var objd = btoa(obj);
							setcookie('marine',objd,30);
							var host = document.location.origin;
							console.log("android ===>>> " +isMobile());
							
							if(isMobile()){
								window.parent.location =host+"/tracking/mobile.php";
							}
							else{
								window.parent.location = (host == 'http://localhost') ? (host+"/vts/tracking"): (host == 'http://127.0.0.1')?(host+"/tracking") :  (host+"/tracking/index.php");

							}

							// if(window.mobilecheck){
								// window.parent.location = "google.com";
								// window.location = "www.google.com";

							// }
							// else{
								
								// window.location = "www.google.com";

								// window.parent.location = (host == 'http://localhost') ? (host+"/vts/tracking"): (host == 'http://127.0.0.1')?(host+"/tracking") :  (host+"/tracking/index.php");
							// }
						}else{
							alert("Username / Password not match");
						}
					},
					error: function(d){
						// debugger;
						alert("Koneksi error");
						console.log('error brroooooo');
						// console.log(d);
					},
					complete : function(data)
					{	
						console.log('dua', data);
					// debugger;
						// do something, not critical.
						// console.log("complte");
					}
				});

			});
		});



	</script>

<?php
 ?>
<!--</body></html>-->
</Body>
</html>
