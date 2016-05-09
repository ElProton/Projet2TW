<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Bienvenue sur Cre'events !</title>
    <link id="main_style" type="text/css" rel="stylesheet" href="css/default.css" />
    <script src="js/connexion.js"></script>
</head>
<body>
<?php
require("includes/header.php");
require("config.php");

if (isset($_POST['username']) && isset($_POST['mdp']) && isset($_POST['mdp2'])) {
    $answer = array();
    try {
        $bdd = new PDO($config["sqltype"] . ":host=" . $config["host"] . ";dbname=" . $config["dbname"], $config["username"], $config["password"]);
    } catch (PDOException $e) {
        $answer["status"] = "error";
        $answer["results"] = array("message" => $e->getMessage());
    }
    if (trim(strlen($_POST['username'])) >= 4 && trim(strlen($_POST['username'])) <= 16 && trim(strlen($_POST['mdp'])) >= 8) {
        $username = trim($_POST['username']);
        $password = trim($_POST['mdp']);
        if (isset($_POST['description']) && strlen(trim($_POST['description'])) <= 2500) {
            $description = trim($_POST['description']);
            $sql = "INSERT INTO users (pseudo,mdp,description) values (username=:username, password=:password, description=:description)";
            $req = $bdd->prepare($sql);
            $req->execute(array("username" => $username, "password" => $password, "description" => $description));
        } else {
            $sql = "INSERT INTO users (pseudo,mdp,description) values (username=:username, password=:password)";
            $req = $bdd->prepare($sql);
            $req->execute(array("username" => $username, "password" => $password));
        }
        echo "<span id='reponseInscription'> Inscription réussie. <a href='index.php' title='index'> Retour à l'index </a> ";
    } else {
        echo "<span id='reponseInscription'> Veuillez remplir un formulaire valide. <a href='inscription.php' title='inscription'>Inscription </a></span> ";
    }
}
else{
    echo "<span id='reponseInscription'> Veuillez remplir un formulaire valide. <a href='inscription.php' title='inscription'>Inscription </a></span> ";
}
?>
</body>
</html>