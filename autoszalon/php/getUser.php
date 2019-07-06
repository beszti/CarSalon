<?php
	if(!empty($_POST['user_name']) && !empty($_POST['user_pw'])){
		$data = array();

		$host="localhost";
		$user="root";
		$password="";
		$db="autoszalon";
		$connect = mysqli_connect($host, $user, $password, $db) or die ("Hiba az adatbázisban!");

		mysqli_set_charset($connect,"utf8");

		$sql = "SELECT * FROM users WHERE pw = '".$_POST['user_pw']."' AND name = '".$_POST['user_name']."'";

		$result = mysqli_query($connect, $sql) or die("result HIBA");
	
		$record=mysqli_fetch_assoc($result);
		$data['status'] = 'ok';
		$data['result'] = $record;
		
		echo json_encode($data);
	}
?>