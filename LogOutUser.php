<?php
	if (!isset($_SESSION))
  {
    session_start();
  }
	echo '<script type="text/javascript"> window.parent.location ="LoginUser.php";</script>';
	unset($_COOKIE["marine"]);
	setcookie('marine', '', time() - 3600,"/");

	session_destroy();
?>
