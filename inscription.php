<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>Inscription</title>
    <link id="main_style" type="text/css" rel="stylesheet" href="css/default.css" />
    <script src="js/verifInscription.js"></script>
    <script src="js/background.js"></script>
    <script src="js/connexion.js"></script>


</head>
<body>
<?php
            require("includes/header.php");
        ?>
    <div id="background"></div>
    
    <div id="form">
        <form method ='post' action ="traitementInscription.php" onsubmit="return verifForm(this)" id="inscription">
            <h1>Inscription au service d'évênements</h1>
            <fieldset>
                <legend><span class="number">1</span> Vos informations personnelles</legend>
                <ul>
                    <li>
                        <label for="name"> Nom d'utilisateur : </label><br />
                        <input class="input" id="name" type="text" name="username" maxlength="16" pattern="[A-Za-z0-9].{4,}" placeholder="min:4 max:16" required formnovalidate onblur="verifPseudo()">
                    </li>
                    <li>
                        <label for="MDP"> Mot de passe : </label><br />
                        <input class="input" id="MDP" type="password" name="mdp" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="min:8 1upper 1lower 1num" required formnovalidate onblur="verifMDP()">
                    </li>
                    <li>
                        <label for="mdp2"> Répéter Mot de passe : </label><br />
                        <input class="input" id="mdp2" type="password" name="mdp2" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Répéter votre mot de passe" required onblur="verifRepetition()">
                    </li>
                </ul>
                
                <legend><span class="number">2</span> Votre profil</legend>
                <label for="desciption"> Description <font size="1" >(facultative)</font> : </label><br />
                <textarea id="desciption" class="input" name="description" rows="8" cols="50" maxlength="2500" placeholder="Votre description..."></textarea><br />
                <br/>
                
                <label for="captcha">Code de sécurité:</label><br/>
                <img src="includes/captcha.php" alt="captcha" id="captcha"/><br/>
                <input class="input" id="captcha" type="text" name="captcha" required="required" placeholder="(Recopier le code ci-dessus)"/><br/><br/>
                <input id="register" type="submit" name="submit_button" value="S'inscrire">
                
            </fieldset>
        </form>
    </div>
</body>
</html>
