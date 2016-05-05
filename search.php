<?php
    header('Content-Type: application/json');
    
    require("config.php");
    
    $answer = array();
    
    if(isset($_GET['latMin']) && isset($_GET['latMax']) && isset($_GET['lonMin']) && isset($_GET['lonMax']) && trim($_GET['latMin']) != "" && trim($_GET['latMax']) != "" && trim($_GET['lonMin']) != "" && trim($_GET['lonMax']) != ""){
        $latMin = $_GET['latMin'];
        $latMax = $_GET['latMax'];
        $lonMin = $_GET['lonMin'];
        $lonMax = $_GET['lonMax'];
        
        try{
            $bdd = new PDO($config["sqltype"].":host=".$config["host"].";dbname=".$config["dbname"], $config["username"], $config["password"]);
        }
        catch (PDOException $e) {
            $answer["status"] = "error";
            $answer["results"] = array("message" => $e->getMessage());
        }
        
        $where = array();
        
        if(isset($_GET["author"]) && trim($_GET['author']) != "") {
            array_push($where, "author='".$_GET["author"]."'");
        }
        if(isset($_GET["dateMin"]) && trim($_GET['dateMin']) != ""){
            array_push($where, "date>='".$_GET["dateMin"]."'");
        }
        if(isset($_GET["dateMax"]) && trim($_GET['dateMax']) != ""){
            array_push($where, "date<='".$_GET["dateMax"]."'");
        }
        if(isset($_GET["from"]) && trim($_GET["from"]) != ""){
            array_push($where, "id>=".$_GET["from"]);
        }

        
        try {
            $sql = "SELECT * FROM evenements WHERE latitude>=:latMin and latitude<=:latMax and longitude>=:lonMin and longitude<=:lonMax";
            
            for($i = 0 ; $i < count($where) ; $i++){
                $sql .= " and ".$where[$i];
            }
            

            
            $sql .= " ORDER BY date";
	    
            if(isset($_GET['limit']) && trim($_GET['limit']) != ""){
                $sql .= " LIMIT ".$_GET["limit"];
            }        
            
            $req = $bdd->prepare($sql);
            $req->execute(array("latMin" => $latMin,
                                "latMax" => $latMax, 
                                "lonMin" => $lonMin,
                                "lonMax" => $lonMax));
            
            $datas = $req->fetch();
            
            if($datas == NULL) {
                $answer["status"] = "error";
                $answer["results"] = array("message" => "No events found with these options.");                
            }
            else {
                $answer["status"] = "ok";
                $answer["results"] = array("message" => "", "events" => array());     
                
                $nbOfEvents = 0;
                
                do {
                    $nbOfEvents++;
                    array_push($answer["results"]["events"], array("id" => $datas["id"], "lat" => $datas["latitude"], "lon" => $datas["longitude"], "date" => $datas["date"], "author" => $datas["author"], "title" => $datas["title"]));
                }while($datas = $req->fetch());
                
                $answer["results"]["message"] = $nbOfEvents." event(s) found.";
            }
        }
        catch (PDOException $e) {
            $answer["status"] = "error";
            $answer["results"] = array("message" => $e->getMessage());
        }
        
    }
    else {
        $answer["status"]  = "error";
        $answer["results"] = array("message" => "Unable to find all require datas");
    }
    
    echo json_encode($answer);
?>
