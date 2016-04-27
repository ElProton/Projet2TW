<header>
    <?php
        
        echo "<div class=\"left\"><p>Cre'events</p></div>";
        
        echo "<div class=\"right\">";
        
        if(!isset($_SESSION['ident'])){
            echo "<form id='connection_form'>";
            echo "<span id='message'></span>";
                echo "<span class=\"usericon\"> </span><input id=\"username\" type=\"text\"' />";
                echo "<span class=\"passwordincon\"> </span><input id=\"password\" type=\"password\" />";
                echo "<button id='connect' type=\"button\">Connexion</button> ";       
                echo "</form><br/><a href=\"inscription.html\">S'inscrire</a>";
                     
        }
        else {
            $user = json_decode($_SESSION['ident'], true);
            echo "<p>Bienvenue ".$user["pseudo"]." !</p>";
        }
        
        echo "</div>";
    ?>
<div class='clear'> </div>
</header>
