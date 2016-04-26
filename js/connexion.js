function init() {
    var button = document.querySelector("#connect");
    
    if(button !== null) {
        button.addEventListener("click", connect);
    }
}

function connect() {
    var xhr = new XMLHttpRequest();
    var username = document.querySelector("input[id=username]").value;
    var password = document.querySelector("input[id=password]").value;
    
    xhr.addEventListener('readystatechange', function(){
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var answer = xhr.responseText;
                var obj = JSON.parse(answer);
                
                if(obj.status == "error") {
                    document.querySelector("#message").innerHTML = "Erreur :"+obj.message;
                }
                else if(obj.status == "ok") {
                    document.querySelector("#message").innerHTML = obj.message;
                    document.querySelector("header div.right").innerHTML = "<p>Bienvenue "+obj.pseudo+" !</p>";
                }
            }
        
        });
        
    xhr.open("GET", "http://webtp.fil.univ-lille1.fr/~vamour/projet2/webconnect.php?username="+username+"&password="+password);
    xhr.send(null); // La requête est prête, on envoie tout !
}

window.addEventListener("load", init);
