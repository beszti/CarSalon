<?php
	$host="localhost";
	$user="root";
	$password="";
	$db="autoszalon";
	$connect = mysqli_connect($host, $user, $password, $db) or die ("Hiba az adatbázisban!");

	mysqli_set_charset($connect,"utf8");

	$id= mysqli_real_escape_string($connect, $_POST["idB"]);
	$name= mysqli_real_escape_string($connect, $_POST["nameB"]);
	$phone = mysqli_real_escape_string($connect, $_POST["phoneB"]);
	$address = mysqli_real_escape_string($connect, $_POST["addressB"]);
    
    if(!empty($_POST['idB'])){
    	$sql = "INSERT INTO buyers (id, name, phone, address) VALUES ('$id', '$name', '$phone', '$address')";
    }
    else{
        $sql = "INSERT INTO buyers (name, phone, address) VALUES ($name', '$phone', '$address')";
    }
	mysqli_query($connect, $sql) or die ("Ilyen már létezik, vagy hibás értéket adott meg valamelyik attributumhoz");
?>