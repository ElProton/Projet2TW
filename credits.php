<?php session_start(); ?>
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <title>Bienvenue sur Cre'events !</title>
        <link id="main_style" type="text/css" rel="stylesheet" href="css/default.css" />
        <link type="text/css" rel="stylesheet" href="css/leaflet.css" />
        <script src="js/connexion.js"></script>
        <script src="js/background.js"></script>
    </head>
    <body>

    <?php
        require("includes/header.php");
    ?>
    <div id="background"></div>
    <div id="credits">
    <div id="content">
    <ul>
        <li>
            Toutes les images visibles sur le site sont libre de droits. Retrouvez les sur <a href="https://pixabay.com/fr/">Pixabay</a>
        </li>
        <li>
            Bibliothèque <a href="http://leafletjs.com/index.html">Leaflet</a>
        </li>
        <li>
            Le fond de map est fournit par <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>
        </li>
    </ul>
    </div>
    </div>
    <?php
        require("includes/footer.php"); 
    ?>    
    </body>
    </html>
