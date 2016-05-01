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
        <script src="js/leaflet.js"></script>
        
    </head>
    <body>
        <?php
            require("includes/header.php");
        ?>
        
        <div id="map-container">
        </div>
        <div id="search">
            <h3>Taper vos filtres de recherches</h3>
            <form>
                <label for="author">Auteur</label><input class="input" type="text" name="author" /><br/>
                <label for="date">Date (format AAA-MM-JJ)</label><input class="input" type="date" name="date" />
            </form>
        </div>
        <div class="clear"></div>
        
        <div id="results">
            <span id="message"></span>
            <ul id="event_list">
            </ul>
        </div>
        <div id="popup">
            <div id="popup_content">
            
            </div>
        </div>
    </body>
</html>
