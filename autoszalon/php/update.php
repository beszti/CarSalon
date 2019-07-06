<?php
		header('Content-Type: application/json');

		$host="localhost";
		$user="root";
		$password="";
		$db="autoszalon";
		$connect = mysqli_connect($host, $user, $password, $db) or die ("Hiba az adatbázisban!");

		mysqli_set_charset($connect,"utf8");

		$sql = "UPDATE ".$_POST['table_name']." SET ".$_POST['txt'];

		mysqli_query($connect, $sql) or die ("Ilyen már létezik, vagy hibás értéket adott meg valamelyik attributumhoz");
?>