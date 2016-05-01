<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>Inscription</title>
    <link id="main_style" type="text/css" rel="stylesheet" href="css/inscription.css" />
    <script src="js/verifInscription.js"></script>


</head>
<body>
<?php
            require("includes/header.php");
        ?>

    <h1>Inscription au service d'évênements</h1>

    <form method ='post' action ="inscription.php" onsubmit="return verifForm(this)">
        <ul class="gauche">
            <li>
                <label> Nom d'utilisateur : </label><br />
                <input type="text" name="username" maxlength="16" pattern="[A-Za-z0-9].{4,}" placeholder="min:4 max:16" required formnovalidate onblur="verifPseudo()">
            </li>
            <li>
                <label> Mot de passe : </label><br />
                <input id="MDP" type="password" name="mdp" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="min:8 1upper 1lower 1num" required formnovalidate onblur="verifMDP()">
            </li>
            <li>
                <label> Répéter Mot de passe : </label><br />
                <input type="password" name="mdp2" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Répéter votre mot de passe" required onblur="verifRepetition()">
            </li>
        </ul>
        <div class="droite">
            <label> Description <font size="1" >(facultative)</font> : </label><br />
            <textarea name="description" rows="8" cols="100" maxlength="2500" placeholder="Votre description..."></textarea><br />
            <input type="submit" name="submit_button" value="S'inscrire">
        </div>
    </form>
</body>
</html>
