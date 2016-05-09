<?php
require("../config.php");

if (isset($_POST['username']) && isset($_POST['mdp']) && isset($_POST['mdp2'])) {
    $answer = array();
    try {
        $bdd = new PDO($config["sqltype"] . ":host=" . $config["host"] . ";dbname=" . $config["dbname"], $config["username"], $config["password"]);
    }
    catch (PDOException $e) {
        $answer["status"] = "error";
        $answer["results"] = array("message" => $e->getMessage());
    }
    if (trim(strlen($_POST['username'])) >= 4 && trim(strlen($_POST['username'])) <= 16 && trim(strlen($_POST['mdp'])) >= 8) {
        $username = trim($_POST['username']);
        $password = trim($_POST['mdp']);
        $sql = "INSERT INTO users (pseudo,mdp,description) VALUES (:username, :password, :description)";
        
        if (isset($_POST['description'])) {
            $description = trim($_POST['description']);
        }
        else {
            $description = "";
        }
        
        $req = $bdd->prepare($sql);
        $req->execute(array("username" => $username, "password" => $password, "description" => $description));
    }
    else {
            $answer["status"] = "error";
            $answer["results"] = array("message" => "Les données entrées ne repondent pas aux critères");
        }
}


		
