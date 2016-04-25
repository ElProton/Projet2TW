<?php
    session_start();
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
        $req->execute(array("pseudo"=>$username));
        $data = $req->fetch();
        
        if($data == NULL) {
            $answer["status"] = "error";
            $answer["message"] = "Wrong username or password";
        }
        else {
            $passBDD = $data["mdp"];
            
            if(hash_equals($passBDD, crypt($password, $passBDD))){
                $answer["status"] = "ok";
                $answer["message"] = "Connected !";
                $answer["pseudo"] = $data["pseudo"];
                $answer["description"] = $data["description"]; 
                $answer["email"] = $data["email"];
                
                $_SESSION["ident"] = json_encode($answer);
            }
            else {
                $answer["status"] = "error";
                $answer["message"] = "Wrong username or password";     
            }
        }
        
        
    }
    else {
        $answer["status"] = "error";
        $answer["message"] = "Unable to find require datas";
    }
    
    echo json_encode($answer);
    
?>
