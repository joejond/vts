<?php
session_start();
function getRandomWord($len = 5) {
	$word = array_merge(range('0', '9'), range('A', 'Z'), range('a','z'));
	shuffle($word);
	return substr(implode($word), 0, $len);
}

$ranStr = getRandomWord();


$_SESSION["kode"] = $ranStr;

$height = 35; //CAPTCHA image height
$width = 130; //CAPTCHA image width
$font_size = 26; //CAPTCHA Font size

$image_p = imagecreate($width, $height);
$graybg = imagecolorallocate($image_p, 245, 245, 245);
$textcolor = imagecolorallocate($image_p, 34, 34, 34);

imagefttext($image_p, $font_size, -2, 2, 26, $textcolor, 
'../fonts/times_new_yorker.ttf', $ranStr);
imagepng($image_p);
//* */
?>
