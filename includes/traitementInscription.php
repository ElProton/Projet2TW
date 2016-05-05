<?php
	    require("config.php");

	if(isset($_POST['username']) && isset($_POST['mdp']) && isset($_POST['mdp2'])){
		try{
		$bdd = new PDO($config["sqltype"].":host=".$config["host"].";dbname=".$config["dbname"], $config["username"], $config["password"]);
        	}
		$answer = array();
        	catch (PDOException $e) {
            	$answer["status"] = "error";
            	$answer["results"] = array("message" => $e->getMessage());
        	}
		if(trim(strlen($_POST['username'])) >= 4 && trim(strlen($_POST['username'])) <= 16 && trim(strlen($_POST['mdp'])) >= 8){
			$username = trim($_POST['username']);
			$password = trim($_POST['mdp']);
		}
		else{
			$answer["status"] = "error";
			$answer["results"] = array("message" => "Les données entrées ne repondent pas au critères");
		if(isset($_POST['description']) && strlent(trim($_POST['description'])) <= 2500){
			$description = trim($_POST['description']);
		}
		$req = $bdd->prepare("INSERT INTO utilisateurs (username,password) values (username=:username , password=:password)")
		$req->execute(array("username" => $username, "password"=> $password));

		
