<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Bienvenue sur Cre'events !</title>
    <link id="main_style" type="text/css" rel="stylesheet" href="css/default.css" />
    <script src="js/connexion.js"></script>
    <script src="js/background.js"></script>
</head>
<body>
<?php
session_start();

require("includes/header.php");
require("config.php");
require("hashUtil.php");
?>
<div id="background"></div>
<div id="register_traitement">
    <?php
    if (isset($_POST['username']) && isset($_POST['mdp']) && isset($_POST['mdp2'])) {
        $answer = array();
        try {
            $bdd = new PDO($config["sqltype"] . ":host=" . $config["host"] . ";dbname=" . $config["dbname"], $config["username"], $config["password"]);
        } catch (PDOException $e) {
            echo "Erreur survenue : "+$e->getMessage();
        }
        if (trim(strlen($_POST['username'])) >= 4 && trim(strlen($_POST['username'])) <= 16 && trim(strlen($_POST['mdp'])) >= 8) {
            $username = htmlspecialchars(trim($_POST['username']));
            $password = crypt(trim($_POST['mdp']), aleatSalt());
            
            $req = $bdd->prepare("SELECT pseudo FROM users WHERE pseudo=:pseudo");
            $req->execute(array("pseudo" => $username));
            
            $datas = $req->fetch();
            
            if($datas != NULL) {
                echo "<span id='reponseInscription'> Ce pseudo est déjà pris. <br/><a href='inscription.php' title='inscription'>Cliquez ici pour retourner à l'inscription </a></span> ";
            }
            else if(!hash_equals($_SESSION["aleat_nbr"], crypt($_POST["captcha"], $_SESSION["aleat_nbr"]))){
                echo "<span id='reponseInscription'>Code de sécurité invalide. <br/><a href='inscription.php' title='inscription'>Cliquez ici pour retourner à l'inscription </a></span> ";
            }
            else {
                if (isset($_POST['description']) && strlen(trim($_POST['description'])) <= 2500) {
                    $description = htmlspecialchars(trim($_POST['description']));
                    $sql = "INSERT INTO users (pseudo,mdp,description) values (:username, :password, :description)";
                    $req = $bdd->prepare($sql);
                    $req->execute(array("username" => $username, "password" => $password, "description" => $description));
                } else {
                    $sql = "INSERT INTO users (pseudo,mdp,description) values (:username, :password)";
                    $req = $bdd->prepare($sql);
                    $req->execute(array("username" => $username, "password" => $password));
                }
                echo "<span id='reponseInscription'> Inscription réussie. <a href='index.php' title='index'> Retour à l'index </a> ";
            }
        } else {
            echo "<span id='reponseInscription'> Veuillez remplir un formulaire valide. <br/><a href='inscription.php' title='inscription'>Cliquez ici pour retourner à l'inscription </a></span> ";
        }
    }
    else{
        echo "<span id='reponseInscription'> Veuillez remplir un formulaire valide. <br/><a href='inscription.php' title='inscription'>Cliquez ici pour retourner à l'inscription </a></span> ";
    }
    ?>
</div>
</body>
</html>
