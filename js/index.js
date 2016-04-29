var map;
window.addEventListener("load", init);

function init() {
    /* On initialise la map */
    map = L.map('map-container').setView([47, 3], 5);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '©️ <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    /* On ajoute les évènements de changement de champs */
    var author = document.querySelector("input[name='author']");
    var date = document.querySelector("input[name='date']");
    
    
    author.addEventListener("change", eventsChange);
    date.addEventListener("change", eventsChange);
    map.addEventListener("moveend", eventsChange);
    eventsChange();    
}

function eventsChange() {
    var xhr = new XMLHttpRequest();
    
    xhr.addEventListener("readystatechange", function(){
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var obj = JSON.parse(xhr.responseText);
                
                if(obj.status == "error") {
                    document.querySelector("#message").innerHTML = obj.results.message;
                }
                else if(obj.status == "ok") {
                    document.querySelector("#message").innerHTML = obj.results.message;
                }
            }
        
        });
    
    var latMin = Number(map.getBounds().getSouth().toFixed(3));
    var latMax = Number(map.getBounds().getNorth().toFixed(3));
    var lonMin = Number(map.getBounds().getWest().toFixed(3));
    var lonMax = Number(map.getBounds().getEast().toFixed(3));
    
    xhr.open("GET", "search.php?latMin="+latMin+"&latMax="+latMax+"&lonMin="+lonMin+"&lonMax="+lonMax);
    xhr.send(null);   
    
}
