<?php

//if (!isset($_SESSION['s_id']) && 
	//!isset($_SESSION['s_user']) && 
	//!isset($_SESSION['s_level']) && 
	//!isset($_SESSION['s_cabang']) && 
	//!isset($_SESSION['s_nama'])) 

if (!isset($_SESSION['username'])) 	
	
	{
		echo '<script type="text/javascript"> window.parent.location ="../LoginUser.php";</script>';
	}
else {
	$inactive = 2*60; // Set timeout period in seconds
 
	if (isset($_SESSION['timeout'])) {
    $session_life = time() - $_SESSION['timeout'];
    if ($session_life > $inactive) {
        echo '<script>alert("Your Session Has Time Out, Please Login Again");</script>';
		echo '<script type="text/javascript"> window.parent.location ="../LogOutUser.php";</script>' ;
		}
	}
	$_SESSION['timeout'] = time();
	}
?>
