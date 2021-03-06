<?php session_start(); ?>
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

require("includes/header.php");
require("config.php");
require("hashUtil.php");
?>
<div id="background"></div>

<?php
echo "<div id=\"profil\">";
echo "<div id=\"content\">";
//User is not connect
if(!isset($_SESSION['ident'])){
    echo "<span class='erreur'> Veuillez vous connectez (en haut à droite) afin d'accéder à votre profil";
}
else {
    if (isset($_POST['latitude']) && isset($_POST['longitude']) && isset($_POST['titre']) && isset($_POST['jour']) && isset($_POST['mois']) && isset($_POST['annee']) && isset($_POST['description'])) {
        $latitude = intval($_POST['latitude']);
        $longitude = intval($_POST['longitude']);
        $jour = intval(trim($_POST['jour']));
        $mois = intval(trim($_POST['mois']));
        $annee = intval(trim($_POST['annee']));
        //chack all inputs
        if ($latitude >= 0 && $latitude < 360 && $longitude >= 0 && $longitude < 360) {
            if (strlen($_POST['titre']) <= 40) {
                if (checkdate(intval($mois), intval($jour), intval($annee))) {
                    if (strlen($_POST['description']) <= 1500) {
                        if(hash_equals($_SESSION["aleat_nbr"], crypt($_POST["captcha"], $_SESSION["aleat_nbr"]))){                            
                            $user = json_decode($_SESSION['ident'], true);
                            //New PDO
                            try {
                                $bdd = new PDO($config["sqltype"] . ":host=" . $config["host"] . ";dbname=" . $config["dbname"], $config["username"], $config["password"], array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));
                            } catch (PDOException $e) {
                                echo "Erreur survenue : ".$e->getMessage();
                                die();
                            }
                            $username = $user['pseudo'];
                            $titre = htmlspecialchars(trim($_POST['titre']));
                            $description = htmlspecialchars(trim($_POST['description']));
                            $date = strval($annee)."-".strval($mois)."-".strval($jour);
                            
                            $req = $bdd->prepare("INSERT INTO evenements (latitude,longitude,title,author,text,date) VALUES (:latitude, :longitude, :titre, :username, :description, :date)");

                            //Try insert the event in the database
                            try {
                                $req->execute(array("latitude"=>$latitude,
                                                    "longitude"=>$longitude, 
                                                    "titre"=>$titre, 
                                                    "username"=>$username,
                                                    "description"=>$description, 
                                                    "date"=>$date));
                            }
                            catch(PDOException $e) {
                                echo "Erreur survenue : ".$e->getMessage();
                                die();
                            }
                            echo "<span id='reponseAjout'> L'ajout a bien été éffectué.<br/> Retour au <a href='profil.php' title='profil'>profil</a> ou à <a href='index.php' title='index'>l'index </a>";
                        }
                        else {
                            echo "<span id='reponseInscription'>Code de sécurité invalide. <br/><a href='profil.php' title='profil'>Cliquez ici pour retourner sur votre profil </a></span> ";
                        }
                    } else {
                        echo "<span id='reponseAjout'> Votre description ne doit pas dépasser les 1500 caractères.<br/><a href='profil.php' title='profil'>Cliquez ici pour retourner sur votre profil </a></span> ";
                    }
                } else {
                    echo "<span id='reponseAjout'> Veillez à ce que votre date soit valide.<br/><a href='profil.php' title='profil'>Cliquez ici pour retourner sur votre profil </a></span> ";
                }
            } else {
                echo "<span id='reponseAjout'> Votre titre ne peut pas dépasser 40 caractèreses<br/><a href='profil.php' title='profil'>Cliquez ici pour retourner sur votre profil </a></span> ";
            }
        } else {
            echo "<span id='reponseAjout'> Votre latitude/longitude doit être comprise entre O et 360<br/><a href='profil.php' title='profil'>Cliquez ici pour retourner sur votre profil </a></span> ";
        }
    } else {
        echo "<span id='reponseAjout'> Veuillez remplir un formulaire valide. <br/><a href='profil.php' title='inscription'>Cliquez ici pour retourner sur votre profil </a></span> ";

    }
}
echo "</div>";
echo "</div>";
?>
