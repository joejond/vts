<?php 
session_start();
include	'inc/conn_db.php';

$msg = '<p class="text-center text-danger"><b><span class="glyphicon glyphicon-warning-sign"></span>  Silahkan Login dahulu.</b></p>';

if(isset($_POST['userid'])) {
		$user = strip_tags(trim($_POST['userid'])); #echo $user;
		$pass = strip_tags(trim($_POST['passwd'])); #echo $pass;
		
		$sql 	= "SELECT id,username FROM user WHERE username = '".$user."' and password='".MD5($pass)."'";
		//echo $sql.'<br>';
		$sth = $db->prepare($sql);
		$sth->execute();
		//$result = $sth->fetchAll();
		//$statement->rowCount()
		//$hasil 	= $db->query($sql);
		//$jml 	= $hasil->num_rows;
		$jml = $sth->rowCount();
		
		if ($user == '' || $pass == ''){
			$msg = '<p class="text-center text-danger" ><b><span class="glyphicon glyphicon-warning-sign"></span>   Please type your username or password!!</b></p>';
		}
		else if ($jml == 1) {
			while($row = $sth->fetch()){
				//echo $row['username'] . '<br />';
				
				$_SESSION['uid']		= $row['id'];	
				$_SESSION['username']	= $row['username'];
			
			}
			
			
			echo '<script type="text/javascript"> window.parent.location ="tracking/index.php";</script>' ;
			
			
			
			
		}
		
		else {
			$msg = '<p class="text-center text-danger"><b><span class="glyphicon glyphicon-warning-sign"></span>  You not authorize to login, please check your username or password.</b></p>';
		
		}
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
	
	<script>
	$(document).ready(function(){
		$("#pesan").delay(3000).fadeOut('slow');		
	});
	
	</script>
	

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
    <div class="row">
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
					<button type="submit" class="btn btn-primary btn-block" name="login" id="login" >Login</button>
				</div>
				
				</form>
			</div>
      	</div>
    </div>
	
	<div class="row">
		<div class="col-md-4 col-md-offset-4">
			<div id="pesan">
			<div class="well well-sm">
			
				<?php echo $msg?>
			</div>
		</div>
	
		</div>
	</div>     
	
</div>
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
</body>
</html>
