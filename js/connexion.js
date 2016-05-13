/**
 * Initialize the listeners
 */
function init() {
    var button = document.querySelector("#connect");
    
    if(button !== null) {
        button.addEventListener("click", connect);
    }
}

/**
 * Check if the user's data connection are correct, change the header if they are. 
 * If not, show the error message.
 */
function connect() {
    var xhr = new XMLHttpRequest();
    var username = document.querySelector("input[id=username]").value;
    var password = document.querySelector("input[id=password]").value;
    
    xhr.addEventListener('readystatechange', function(){
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var answer = xhr.responseText;
                var obj = JSON.parse(answer);
                
                /* There is an error, we show the message */
                if(obj.status == "error") {
                    document.querySelector("#message_connexion").innerHTML = "Erreur :"+obj.message;
                }
                /* The user is connected, change the header */
                else if(obj.status == "ok") {
                    document.querySelector("#message_connexion").innerHTML = obj.message;
                    document.querySelector("header div.right").innerHTML = "<p>Bienvenue <a href='profil.php'>"+obj.pseudo+" !</a> - <a href='logout.php'>Déconnexion</a></p>";
                }
            }
        
        });
        
    xhr.open("GET", "http://webtp.fil.univ-lille1.fr/~vamour/projet2/webconnect.php?username="+username+"&password="+password);
    xhr.send(null); // La requête est prête, on envoie tout !
}

window.addEventListener("load", init);
