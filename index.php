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
        <script src="js/background.js"></script>
        
    </head>
    <body>
        <?php
            require("includes/header.php");
        ?>
        <div id="background"></div>
        <div id="map-container">
        </div>
        <div id="search">
            <h3>Taper vos filtres de recherches</h3>
            <form id="search_form">
                <label for="author">Auteur</label><input class="input" type="text" name="author" /><br/><br/>
                <label for="dateMin">Date Min.(format AAAA-MM-JJ)</label><input class="input" type="date" name="dateMin" /><br/><br/>
                <label for="dateMax">Date Max.(format AAAA-MM-JJ)</label><input class="input" type="date" name="dateMax" />
            </form>
        </div>
        
        
        <div id="results">
            <span id="message_search"></span>
            <ul id="events_list">
            </ul>
            
            <ul id="pages">
            </ul>
        </div>
        <div id="popup">
            <div id="popup_content">
            
            </div>
        </div>
        
        <div class="clear"></div>
    </body>
</html>
