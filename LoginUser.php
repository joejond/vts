<?php 
session_start();
include	'inc/conn_db.php';

if (!empty($_SERVER["HTTP_CLIENT_IP"]))
{
 //check for ip from share internet
 $ip = $_SERVER["HTTP_CLIENT_IP"];
}
elseif (!empty($_SERVER["HTTP_X_FORWARDED_FOR"]))
{
 // Check for the Proxy User
 $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
}
else
{
 $ip = $_SERVER["REMOTE_ADDR"];
}

if(isset($_POST['userid']) && isset($_POST['capcai'])) {
		$user = strip_tags(trim($_POST['userid'])); //echo $user;
		$pass = strip_tags(trim($_POST['passwd'])); //echo $pass;
		$capca = strip_tags(trim($_POST['capcai'])); //echo $capca;
		$kode = $_SESSION['kode']; //echo $kode;
		$banding = strcmp($kode,$capca); //echo $banding;
		
		$sql 	= "SELECT id,username,timezone FROM user WHERE username = '".$user."' and password='".MD5($pass)."'";
		//echo $sql.'<br>';
		$sth = $db->prepare($sql);
		$sth->execute();
		//$result = $sth->fetchAll();
		//print_r($result);
		//$statement->rowCount()
		//$hasil 	= $db->query($sql);
		//$jml 	= $hasil->num_rows;
		$jml = $sth->rowCount();
		
		if ($user == '' || $pass == ''){
			$msg = '<p class="text-center text-danger" ><b><span class="glyphicon glyphicon-warning-sign"></span>   Please type your username or password!!</b></p>';
		}

		else if (($jml == 1) && ($banding == 0)) {
			while($row = $sth->fetch()){
				//echo $row['username'] . '<br />';
				
				$_SESSION['uid']		= $row['id'];	
				$_SESSION['username']	= $row['username'];
				$_SESSION['timezone']	= $row['timezone'];
				
				$sql_log = "update user set last_login = UNIX_TIMESTAMP(NOW()), ipaddress = '".$ip."' where id = ".$row['id']."";
				$loged = $db->prepare($sql_log);
				$loged->execute();
			
			}
			echo '<script type="text/javascript"> 
					window.parent.location ="tracking/#";
								
			
			</script>' ;
			$msg = '<p class="text-center text-success"><b><span class="glyphicon glyphicon-thumbs-up"></span>  Succesfull Authenticate</b></p>';
		}
		
		else {
			$msg = '<p class="text-center text-danger"><b><span class="glyphicon glyphicon-warning-sign"></span>  You not Authorize to login, please check your username or password.</b></p>';
		}
	}
else {
	$msg = '<p class="text-center text-danger"><b><span class="glyphicon glyphicon-warning-sign"></span>  Please Login First</b></p>';
	}

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
	
	</style>
	

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
				<form role="form" name="flogin" id="flogin" method="post"  action=""> 
                <div class="form-group">
					<label class="control-label">Username</label>
					<input class="form-control" name="userid" id="userid" placeholder="username" type="text">
                </div>
                <div class="form-group">
					<label for="inputPassword" class="control-label">Password</label>
					<input class="form-control" name="passwd" id="passwd" placeholder="password" type="password">
                </div>
                <div class="form-group">
					<div class="input-group">
						<span class="input-group-addon">
							<img src="inc/capca.php" alt="Pass code" height="20" width="130">
						</span>
						<input class="form-control" name="capcai" id="capcai" placeholder="Kode" type="text" >
						
					</div>
					<p class="help-block">Access from <?php echo ' '.$ip;?></p>
				
				</div>
				
                <div class="form-group">
					<button type="submit" class="btn btn-primary btn-block" name="login" id="login" >Login</button>
				</div>
				
				</form>
			</div>
      	</div>
    </div>
	</div>
	<div class="row">
		<div class="col-md-4 col-md-offset-4">
			<div id="pesan">
			<div class="well well-sm">
				<?php echo $msg; ?>
			</div>
		</div>
	
		</div>
	</div>     
	
</div>
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script>
	$(document).ready(function(){
		$("#pesan").delay(3000).fadeOut('slow');		
	});
	
	</script>
</body>
</html>

