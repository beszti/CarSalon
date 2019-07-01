<?php
	$host="localhost";
	$user="root";
	$password="";
	$db="autoszalon";
	$connect = mysqli_connect($host, $user, $password, $db) or die ("Hiba az adatbázisban!");

	mysqli_set_charset($connect,"utf8");

	$id= mysqli_real_escape_string($connect, $_POST["idE"]);
	$name= mysqli_real_escape_string($connect, $_POST["name"]);
	$phone = mysqli_real_escape_string($connect, $_POST["phone"]);
	$address = mysqli_real_escape_string($connect, $_POST["address"]);
    
    if(!empty($_POST['idE'])){
    	$sql = "INSERT INTO employees (id, name, phone, address) VALUES ('$id', '$name', '$phone', '$address')";
    }
    else{
        $sql = "INSERT INTO employees (name, phone, address) VALUES ($name', '$phone', '$address')";
    }
	mysqli_query($connect, $sql) or die ("Ilyen már létezik, vagy hibás értéket adott meg valamelyik attributumhoz");
		
	header("Location: ../index.html");
?>