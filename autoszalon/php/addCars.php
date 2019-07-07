<?php
	$host="localhost";
	$user="root";
	$password="";
	$db="autoszalon";
	$connect = mysqli_connect($host, $user, $password, $db) or die ("Hiba az adatbázisban!");

	mysqli_set_charset($connect,"utf8");

	$id= mysqli_real_escape_string($connect, $_POST["id"]);
	$band= mysqli_real_escape_string($connect, $_POST["band"]);
	$color = mysqli_real_escape_string($connect, $_POST["color"]);
	$employeeID = mysqli_real_escape_string($connect, $_POST["employeeID"]);
	$price = mysqli_real_escape_string($connect, $_POST["price"]);
    
    if(!empty($_POST['id'])){
    	$sql = "INSERT INTO cars (id, band, color, employeeID, price) VALUES ('$id', '$band', '$color', '$employeeID', '$price')";
    }
    else{
        $sql = "INSERT INTO cars (band, color, employeeID, price) VALUES ('$band', '$color', '$employeeID', '$price')";
    }
	mysqli_query($connect, $sql) or die ("Ilyen már létezik, vagy hibás értéket adott meg valamelyik attributumhoz");
?>