<?php
    require("config.php");
    
    header('Content-Type: application/json');
    $answer = array();
    
    if(isset($_GET['username']) && isset($_GET['password'])) {
        $username = htmlspecialchars($_GET['username']);
        $password = $_GET['password'];
    
        try{
            $bdd = new PDO($config["sqltype"].":host=".$config["host"].";dbname=".$config["dbname"], $config["username"], $config["password"]);
        }
        catch (PDOException $e) {
            $answer["status"] = "error";
            $answer["message"] = $e->getMessage();
        }
        
        $req = $bdd->prepare("SELECT * FROM users WHERE pseudo=:pseudo");
        $req->exec(array("pseudo"=>$username));
        $req->fetch();
        
        if($req == NULL) {
            $answer["status"] = "error";
            $answer["message"] = "Wrong username or password";
        }
        
        
    }
    else
    {
        $answer["status"] = "error";
        $answer["message"] = "Unable to find require datas";
    }
    
    echo json_encode($answer);
    
?>
