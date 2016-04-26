<?php
    header('Content-Type: application/json');
    
    require("config.php");
    
    $answer = array();

    if(isset($_GET['id'])) {
        try{
            $bdd = new PDO($config["sqltype"].":host=".$config["host"].";dbname=".$config["dbname"], $config["username"], $config["password"]);
        }
        catch (PDOException $e) {
            $answer["status"] = "error";
            $answer["results"] = array("message" => $e->getMessage());
        }
        
        $req = $bdd->prepare("SELECT * FROM evenements WHERE id=:id");
        $req->execute(array("id" => $_GET['id']));
        
        $datas = $req->fetch();
        
        $answer["status"] = "ok";
        $answer["results"] = array();
        
        if($datas == NULL) {
            $req = $bdd->query("SELECT * FROM evenements WHERE id=1");
            $datas = $req->fetch();
        }
        
        array_push($answer["results"], array("id" => $datas["id"], "lat" => $datas["latitude"], "lon" => $datas["longitude"], "date" => $datas["date"], "author" => $datas["author"], "title" => $datas["title"], "text" => $datas["text"]));
        
    }
    else {
        $answer["status"]  = "error";
        $answer["results"] = array("message" => "Unable to find all require datas");
    }
    
    echo json_encode($answer);
?>
