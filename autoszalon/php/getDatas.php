<?php

	header('Content-Type: application/json');
	if(!empty($_POST['table_name'])){
		$data = array();

		$host="localhost";
		$user="root";
		$password="";
		$db="autoszalon";
		$connect = mysqli_connect($host, $user, $password, $db) or die ("Hiba az adatbázisban!");

		mysqli_set_charset($connect,"utf8");

		$sql =  "SELECT * FROM ".$_POST['table_name'];
		if(!empty($_POST['txt'])){
			$sql = $sql."".$_POST['txt'];
		}

		$result = mysqli_query($connect, $sql) or die("result HIBA");

		$i = 0;
		$data["status"] = 'ok';
		while($record=mysqli_fetch_assoc($result)){
			$data[$i]["id"] = $record['id'];
			if(!strcmp("cars", "".$_POST['table_name'])){
				$data[$i]["band"] = $record['band'];
				$data[$i]["color"] = $record['color'];
				$data[$i]["employeeID"] = $record['employeeID'];
				$data[$i]["price"] = $record['price'];
			}
			else{
				$data[$i]["name"] = $record['name'];
				$data[$i]["phone"] = $record['phone'];
				$data[$i]["address"] = $record['address'];
			}
			$i++;
		}
		
		echo json_encode($data);
	}
?>