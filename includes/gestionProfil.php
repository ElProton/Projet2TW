<?php
session_start();
require("config.php");

echo "<div id=\"profil\">";
echo "<div id=\"content\">";
if(!isset($_SESSION['ident'])){
    echo "<span class='erreur'> Veuillez vous connectez (en haut à droite) afin d'accéder à votre profil";
}
else{
    $user = json_decode($_SESSION['ident'], true);
    echo " <h1>Vos évênements déjà partagés</h1><br />";
    echo "<table>";
    echo "<tr><th>id</th><th>titre</th><th>date</th></tr>";
    try{
        $bdd = new PDO($config["sqltype"].":host=".$config["host"].";dbname=".$config["dbname"], $config["username"], $config["password"]);
    }
    catch (PDOException $e) {
        $answer["status"] = "error";
        $answer["message"] = $e->getMessage();
    }

    $req = $bdd ->prepare("SELECT * FROM evenements WHERE evenements.author =:author  ORDER BY evenements.id DESC ");
    $req->execute(array("author" => $user['pseudo']));
    $req->setFetchMode(PDO::FETCH_ASSOC);

    while($ligne = $req->fetch()){
        echo "<tr><td>{$ligne['id']}</td><td>{$ligne['title']}</td><td>{$ligne['date']}</td>";
    }
    echo "</table>";
    echo "<button name='addEventButton' id='addEventButton'>Ajouter</button>";

}
echo "</div>";
echo "</div>";
?>
