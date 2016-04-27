<?php session_start(); ?>
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
        ?>
        
        <div id="map-container">
        </div>
        <div id="search">
            <form>
                <input type="text" name="author" />
                <input type="date" name="date" />
            </form>
        </div>
        
        <div id="results">
            <span id="message"></span>
            <ul id="event_list">
            </ul>
        </div>
    </body>
</html>
