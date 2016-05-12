<header>
    <?php
        
        echo "<div class=\"left\"><p><a title='Cre'events' href='index.php'>Cre'events</a></p></div>";
        
        echo "<div class=\"right\">";

        //check if is'nt connected and build the connect form
        if(!isset($_SESSION['ident'])){
            echo "<form id='connection_form'>";
            echo "<span id='message_connexion'></span>";
                echo "<span class=\"usericon\"> </span><input id=\"username\" type=\"text\"' />";
                echo "<span class=\"passwordincon\"> </span><input id=\"password\" type=\"password\" />";
                echo "<button id='connect' type=\"button\">Connexion</button> ";       
                echo "</form><br/><a id=\"inscrire\" href=\"inscription.php\">S'inscrire</a>";
                     
        }
        else {
            $user = json_decode($_SESSION['ident'], true);
            echo "<p>Bienvenue <a href='profil.php'>".$user["pseudo"]." !</a> - <a href='logout.php'>Déconnexion</a></p>";
        }
        
        echo "</div>";
    ?>
<div class='clear'> </div>
</header>
