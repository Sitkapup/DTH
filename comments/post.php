<?php 
include 'config.php';
include 'comments.class.php';
$page_id = $_GET["page"];
$settings = array(
	'public' => true,
	'user_details' => array(
		'name' => 'Anon',
		'email' => 'Anon@mouse'
		)
	);
$comments = new Comments_System($db_details, $settings);
$comments->grabComment($page_id);

header('Location: http://lem2.dragonnest.co.uk');

?>