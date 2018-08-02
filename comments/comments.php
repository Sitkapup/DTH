<?php
include 'comments.class.php';
include 'config.php'
$page_id = $_GET["page"];
$settings = array(
	'public' => 0,
	'user_details' => array(
		'name' => 'Anon',
		'email' => 'Anon@mouse'
		)
	);
$comments = new Comments_System($db_details, $settings);
$comments->grabComment($page_id);
if($comments->success)
	echo "<div class='alert alert-success' id='comm_status'>".$comments->success."</div>";
else if($comments->error)
	echo "<div class='alert alert-error' id='comm_status'>".$comments->error."</div>";
// a simple form
echo $comments->generateForm();
// we show the posted comments
echo $comments->generateComments($page_id); // we pass the page id
?>