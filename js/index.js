var map;
var limit = 10;
var page = 1;
var nb_events;
var allMarkers;

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
    
    allMarkers = [];
    
    author.addEventListener("change", eventsChange);
    date.addEventListener("change", eventsChange);
    map.addEventListener("moveend", eventsChange);
    eventsChange();
    
    document.getElementById("popup").addEventListener("click", hideEvent);
}

function hideEvent() {
    document.getElementById("popup").style.display = "none";
}

function eventsChange() {
    var xhr = new XMLHttpRequest();
    
    if(this.name == "author" || this.name == "date"){
        page = 1;
    }
    
    xhr.addEventListener("readystatechange", function(){
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var obj = JSON.parse(xhr.responseText);
                
                if(obj.status == "error") {
                    document.querySelector("#message_search").innerHTML = obj.results.message;
                    var events_list = document.getElementById("events_list");
                    var pages = document.getElementById("pages");
 
                    events_list.innerHTML = "";
                    pages.innerHTML = "";                   
                    page = 1;
                    removeAllMarkers();
                }
                else if(obj.status == "ok") {
                    
                    if(page == 1) {
                        nb_events = obj.results.events.length;
                    }
                    
                    document.querySelector("#message_search").innerHTML = "<span class=\"underline\">Displayed "+Math.min(limit, obj.results.events.length)+" events. ("+Math.floor(nb_events/limit)+" pages)</span>";
                    
                    var events_list = document.getElementById("events_list");
                    var pages = document.getElementById("pages");
                    
                    var auteur, titre, date, lon, lat, id;
                    var start = (Math.min(limit, obj.results.events.length)*(page-1));
                    events_list.innerHTML = "";
                    
                    for(var i = start ; i < Math.min(limit, obj.results.events.length)+start ; i++){
                        date = obj.results.events[i].date;
                        titre = obj.results.events[i].title;
                        auteur = obj.results.events[i].author;
                        lon =  obj.results.events[i].lon;
                        lat = obj.results.events[i].lat;
                        id= obj.results.events[i].id;
                        if(i == start){
                            removeAllMarkers();
                        }
                        
                        events_list.innerHTML += "<li data-lon=\""+lon+"\" data-lat=\""+lat+"\">"+date+": "+titre+" par "+auteur+"<button id=\"seeevent_"+id+"\">Voir</button></li>";
                        addMarker([lat, lon], date+": "+titre+" par "+auteur);
                        

                    }
                    if(page == 1){
                        pages.innerHTML = "";
                        for(var i = 1 ; i < Math.floor(nb_events/limit) ; i++){
                            if(i == page){
                                pages.innerHTML += "<li id=\"page_"+i+"\" class=\"active\">"+i+"</li>";
                            }
                            else {
                                pages.innerHTML += "<li id=\"page_"+i+"\">"+i+"</li>";
                            }
                        }
                        
                        for(var i = 1 ; i < Math.floor(nb_events/limit) ; i++){
                                document.querySelector("#page_"+i).addEventListener("click", changePage);                                
                        }
                    }
                    
                    var allSee = document.querySelectorAll("button[id^=\"seeevent\"");
                    for(var i = 0 ; i < allSee.length ; i++){
                        allSee[i].addEventListener("click", loadEvent);                            
                    }                                      
                }
            }
        
        });
    
    var latMin = Number(map.getBounds().getSouth().toFixed(3));
    var latMax = Number(map.getBounds().getNorth().toFixed(3));
    var lonMin = Number(map.getBounds().getWest().toFixed(3));
    var lonMax = Number(map.getBounds().getEast().toFixed(3));
    var author = document.querySelector("input[name=\"author\"").value;
    var date = document.querySelector("input[name=\"date\"").value;
    
    xhr.open("GET", "search.php?latMin="+latMin+"&latMax="+latMax+"&lonMin="+lonMin+"&lonMax="+lonMax+"&author="+author+"&date="+date);
    xhr.send(null);
    
}

function changePage(){
    var id;
    
    try {
        id = this.id;
        page= parseInt(id.split("_")[1]);
        
        var pages = document.querySelectorAll("li[id^=\"page\"]");
        
        for(var i = 0 ; i < pages.length ; i++){
            if((i+1) == page){
                pages[i].className = "active";
            }
            else {
                pages[i].className = "";
            }
        }
    }
    catch(e){
        page = 1;
    }
    finally {
        eventsChange();
    }
}

function loadEvent() {
    var id;
    try {
        id = this.id;
        id = parseInt(id.split("_")[1]);
    }
    catch(e){
        id = 1;
    }
    finally {
        var xhr = new XMLHttpRequest();
                
        xhr.addEventListener("readystatechange", function(){
                if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    
                    var obj = JSON.parse(xhr.responseText);
                    
                    if(obj.status == "ok"){
                        var popup = document.getElementById("popup_content");
                        
                        popup.innerHTML = "<h1>"+obj.results[0].title+"<h1>";
                        popup.innerHTML += "<p>"+obj.results[0].text+"<br/><p>";
                        popup.innerHTML += "<p>Par "+obj.results[0].author+", le "+obj.results[0].date+"<p>";
                        
                        document.getElementById("popup").style.display = "block";
                    }
                }
            });

        xhr.open("GET", "getevent.php?id="+id);
        xhr.send(null);
    }    
}

/**
  * Add a marker to the map m at the position (positionArray[0], positionArray[1]) 
  * 
  * @param positionArray An array with two elements: x position and y position
  * @param m The Leaflet map
  * @param txt A text to bind to the popup that appear when you click on a marker
  * @return A marker
  */
function addMarker(positionArray, txt)
{
    var marker = L.marker(positionArray).addTo(map)
    .bindPopup(txt);
    allMarkers.push(marker);
    return marker;    
}

function removeAllMarkers() {
    for(var i = 0 ; i < allMarkers.length ; i++)
        map.removeLayer(allMarkers[i]);
    
    allMarkers = [];
}
