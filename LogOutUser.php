<?php
	if (!isset($_SESSION))
  {
    session_start();
  }
	session_destroy();
	echo '<script type="text/javascript"> window.parent.location ="LoginUser.php";</script>';

?>
