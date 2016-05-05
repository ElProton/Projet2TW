<?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Bienvenue sur Cre'events !</title>
    <link id="main_style" type="text/css" rel="stylesheet" href="css/default.css" />
    <link type="text/css" rel="stylesheet" href="css/leaflet.css" />
    <script src="js/connexion.js"></script>
    <script src="js/index.js"></script>
    <script src="js/leaflet-src.js"></script>

</head>
<body>
<?php
    require("includes/header.php");
    require("includes/gestionProfil.php"); ?>
</body>