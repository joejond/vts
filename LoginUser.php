<?php
// error_reporting(-1);
// ini_set('display_errors', 'On');
session_start();
//>>>>>>> acbcd4121c59d1900b3ea98bec84944ec035c339
//include	'inc/conn_db.php';

//if (!empty($_SERVER["HTTP_CLIENT_IP"]))
//{
 ////check for ip from share internet
 //$ip = $_SERVER["HTTP_CLIENT_IP"];
//}
//elseif (!empty($_SERVER["HTTP_X_FORWARDED_FOR"]))
//{
 //// Check for the Proxy User
 //$ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
//}
//else
//{
 //$ip = $_SERVER["REMOTE_ADDR"];
//}

//if(isset($_POST['userid']) && isset($_POST['capcai'])) {
		//$user = strip_tags(trim($_POST['userid'])); //echo $user;
		//$pass = strip_tags(trim($_POST['passwd'])); //echo $pass;
		//$capca = strip_tags(trim($_POST['capcai'])); //echo $capca;
		//$kode = $_SESSION['kode']; //echo $kode;
		//$banding = strcmp($kode,$capca); //echo $banding;
//<<<<<<< HEAD

		//$sql 	= "SELECT u.id, u.username ,u.timezone, ur.route, u.id_company
//=======

		//$sql 	= "SELECT u.id, u.username ,u.timezone, ur.route, u.id_company
//>>>>>>> acbcd4121c59d1900b3ea98bec84944ec035c339
					//FROM user u
						//join user_route ur on ur.id_company = u.id_company
					//WHERE u.username = '".$user."' and u.password='".MD5($pass)."'";
		////echo $sql.'<br>';
		//$sth = $db->prepare($sql);
		//$sth->execute();
		////$result = $sth->fetchAll();
		////print_r($result);
		////$statement->rowCount()
		////$hasil 	= $db->query($sql);
		////$jml 	= $hasil->num_rows;
//<<<<<<< HEAD

		//$jml = $sth->rowCount();
		//$result = $sth->fetch(PDO::FETCH_OBJ);

		////print_r($result);

//=======

		//$jml = $sth->rowCount();
		//$result = $sth->fetch(PDO::FETCH_OBJ);

		////print_r($result);

//>>>>>>> acbcd4121c59d1900b3ea98bec84944ec035c339
		//if ($user == '' || $pass == ''){
			//$msg = '<p class="text-center text-danger" ><b><span class="glyphicon glyphicon-warning-sign"></span>   Please type your username or password!!</b></p>';
		//}

		//else if (($jml == 1) && ($banding == 0)) {
			////while($row = $sth->fetch()){
			////foreach($result as $row){
				////echo $row['username'] . '<br />';
//<<<<<<< HEAD

				////$_SESSION['uid']		= $row['id'];
				////$_SESSION['username']	= $row['username'];
				////$_SESSION['timezone']	= $row['timezone'];
				//$_SESSION['uid']		= $result->id;
				//$_SESSION['username']	= $result->username;
				//$_SESSION['company']	= $result->id_company;
				//$_SESSION['timezone']	= $result->timezone;


				//$sql_log = "update user set last_login = UNIX_TIMESTAMP(NOW()), ipaddress = '".$ip."' where id = ".$result->id."";
				//$loged = $db->prepare($sql_log);
				//$loged->execute();

			////}
				////print_r ($result);

			////echo 'ini dia - >'. $result->route;
			////echo  'hahada'.$row['user_route_id'];
			////*
			//echo '<script type="text/javascript">
					//window.parent.location ="'.$result->route.'/#";


//=======

				////$_SESSION['uid']		= $row['id'];
				////$_SESSION['username']	= $row['username'];
				////$_SESSION['timezone']	= $row['timezone'];
				//$_SESSION['uid']		= $result->id;
				//$_SESSION['username']	= $result->username;
				//$_SESSION['company']	= $result->id_company;
				//$_SESSION['timezone']	= $result->timezone;


				//$sql_log = "update user set last_login = UNIX_TIMESTAMP(NOW()), ipaddress = '".$ip."' where id = ".$result->id."";
				//$loged = $db->prepare($sql_log);
				//$loged->execute();

			////}
				////print_r ($result);

			////echo 'ini dia - >'. $result->route;
			////echo  'hahada'.$row['user_route_id'];
			////*
			//echo '<script type="text/javascript">
					//window.parent.location ="'.$result->route.'/#";


//>>>>>>> acbcd4121c59d1900b3ea98bec84944ec035c339
			//</script>' ;
			////*/
			//$msg = '<p class="text-center text-success"><b><span class="glyphicon glyphicon-thumbs-up"></span>  Succesfull Authenticate</b></p>';
			//$sks = 1;
		//}
//<<<<<<< HEAD

//=======

//>>>>>>> acbcd4121c59d1900b3ea98bec84944ec035c339
		//else {
			//$msg = '<p class="text-center text-danger"><b><span class="glyphicon glyphicon-warning-sign"></span>  You not Authorize to login, please check your username or password.</b></p>';
		//}
	//}
//else {
	//$msg = '<p class="text-center text-danger"><b><span class="glyphicon glyphicon-warning-sign"></span>  Please Login First</b></p>';
	//}

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
    <script src="js/lmanager.js"></script>
    <!-- <script src="js/jsencode.js"></script> -->
    <!-- <script src="js/base64.min.js"></script> -->
    <script>
		//var sukses = <?php echo $sks; ?>;
		//alert ('ini sukses : '+sukses);
		//alert ("<?php echo $alert;?>");


	$(document).ready(function(){
//<<<<<<< HEAD
//		$("#pesan").delay(3000).fadeOut('slow');

//		$("#flogin").submit(function(){
//				console.log("di submit");
//				var uname = $("input[name='userid']").val(),
//				pas = $("input[name='passwd']").val();

//=======
		//$("#pesan").delay(3000).fadeOut('slow');

		$("#flogin").submit(function(){
				console.log("di submit");
				var uname = $("input[name='userid']").val(),
				//pas = encodeMD5($("input[name='passwdregist']").val()),
				//email = $("input[name='email']").val(),
				pas = $("input[name='passwd']").val();
				//lname = $("input[name='lname']").val(),
				//perusahaan = $("input[name='perusahaan']").val();

//>>>>>>> acbcd4121c59d1900b3ea98bec84944ec035c339
				console.log(uname,encodeMD5(pas));


				var dt = {u:$("input[name='userid']").val(),p:encodeMD5(pas)};
				var j = JSON.stringify(dt);
				var uid = btoa(j);
//<<<<<<< HEAD
//				var tgl = new Date();
//				var n = tgl.getTimezoneOffset();

//				console.log(dt,uid,atob(uid));
				//console.log(Base64.encode(j));
//				console.log(TimeZone(n));

				//console.log(getAPI());

        // $.ajax({
        //   url: getAPI()+ "/auth/login?idu=eyJ1IjoicGVsaW5kbzMiLCJwIjoiNDI2MjY2ZGRiNTY5ZTJmZjQxZDU2MGIwYzIxZmY1MjkifQ==",
        //   success : function(data){
        //     console.log('masukk');
        //   }
        //
        //
        // });
        // var api= localhost;
//			console.log(window.location.hostname);
//			$.ajax(
//			{
				// Post the variable fetch to url.
//				type : 'post',
//				url : "http://10.10.10.11:1336/auth/login",
//				dataType : 'json', // expected returned data format.
//				crossDomain : true,
//				withCredentials: true,
//				data :{idu : uid},
				//data :{idu : 'eyJ1IjoicGVsaW5kbzMiLCJwIjoiNDI2MjY2ZGRiNTY5ZTJmZjQxZDU2MGIwYzIxZmY1MjkifQ'},
				//data :{idu : 'eyJ1IjoicGVsaW5kbzMiLCJwIjoiNDI2MjY2ZGRiNTY5ZTJmZjQxZDU2MGIwYzIxZmY1MjkifQ'},
//				success : function(data)
//				{
					// This happens AFTER the backend has returned an JSON array (or other object type)
//				  //  var res1, res2;
//					console.log("yaya ya");
//				},

//				complete : function(data)
//				{
					// do something, not critical.
//					console.log("gagal nononon");
//				}
//			});

//		});



//=======
				// var tgl = new Date();
				// var n = tgl.getTimezoneOffset();
        // var e = jsEncode.encode("Hello world!","123");
        // var d = jsEncode.encode(e,"123");


        $.ajax(
        {
            // Post the variable fetch to url.
            type : 'post',
            url : getAPI()+'/auth/login',
            dataType : 'json', // expected returned data format.
            // crossDomain : true,
            data :{idu : uid},
            // data :{idu : 'eyJ1IjoicGVsaW5kbzMiLCJwIjoiNDI2MjY2ZGRiNTY5ZTJmZjQxZDU2MGIwYzIxZmY1MjkifQ=='},
            success : function(data)
            {
              // debugger;
                // This happens AFTER the backend has returned an JSON array (or other object type)
              //  var res1, res2;
                // console.log(data);
                if (data.success){
                  // console.log('seteleh OK');
                  // var decode = atob(data.auth);

                  // console.log(JSON.parse(decode));
                  var res = JSON.parse(atob(data.auth));
                  var obj = JSON.stringify({idu:res.uid,u:res.nama,tz:getTimeZone()});

                  var objd = btoa(obj);
                  setcookie('marine',objd,30);
                  var host = document.location.origin;

                window.parent.location = (host == 'http://localhost') ? (host+"/project/vts/tracking"):(host+"/vts/tracking");
                
                }
            },
            error: function(d){
                // debugger;
                alert("User or Password not Match.. \n Please re-login ");
                console.log('error brroooooo');
                console.log(d);
            },
            complete : function(data)
            {
              // debugger;
                // do something, not critical.
                // console.log("complte");
            }
        });



			});






//>>>>>>> acbcd4121c59d1900b3ea98bec84944ec035c339
	});



	</script>

<?php
// if(isset($_COOKIE['marine'])){
//   $dec64= base64_decode($_COOKIE['marine']);
//   echo $dec64;
//   $result = json_decode($dec64);
//   // // echo $hsl->{'u'}."<br>";
//   // // echo $hsl->{'tz'}."<br>";
//   //
//   $_SESSION['id']		= $result->{'idu'};
//   $_SESSION['username']	= $result->{'u'};
//   // // $_SESSION['company']	= $result->id_company;
//   $_SESSION['timezone']	= $result->{'tz'};
//
// }

 ?>

</body>
</html>
