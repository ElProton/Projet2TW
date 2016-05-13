var map;
var limit = 10;
var page = 1;
var nb_events;
var allMarkers;

window.addEventListener("load", init);

function init() {
    /* Initialize the map */
    map = L.map('map-container').setView([47, 3], 5);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '©️ <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    /* Get the different inputs in the DOM */
    var author = document.querySelector("input[name='author']");
    var dateMin = document.querySelector("input[name='dateMin']");
    var dateMax = document.querySelector("input[name='dateMax']");
    
    allMarkers = []; /* Store all the markers on the map */
    
    /* Add the events when inputs change, and when the user have finished to move the map*/
    author.addEventListener("change", eventsChange);
    dateMin.addEventListener("change", eventsChange);
    dateMax.addEventListener("change", eventsChange);
    map.addEventListener("moveend", eventsChange);
    eventsChange();
    
    document.getElementById("popup").addEventListener("click", hideEvent);
}

/**
 * Hide the popup
 */
function hideEvent() {
    document.getElementById("popup").style.display = "none";
}

/**
 * When a data is changed, we launch this function to display again in function to the filters
 * of the user.
 */
function eventsChange() {
    var xhr = new XMLHttpRequest();
    
    if(this.name == "author" || this.name == "date" || this.id == "map-container"){
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
    var dateMin = document.querySelector("input[name=\"dateMin\"]").value;
    var dateMax = document.querySelector("input[name=\"dateMax\"]").value;
    
    xhr.open("GET", "search.php?latMin="+latMin+"&latMax="+latMax+"&lonMin="+lonMin+"&lonMax="+lonMax+"&author="+author+"&dateMin="+dateMin+"&dateMax="+dateMax);
    xhr.send(null);
    
}

/**
 * Function launch when the user click to the number of a page under the event list
 */
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

/**
 * Put the informations of the event to the popup and show this one
 */
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
                        popup.innerHTML = "<p id=\"eventHeader\">"+obj.results[0].author+" <time id=\"eventTime\" datetime=\""+obj.results[0].date+"\">le "+transformDate(obj.results[0].date)+"</time></p>";
                        popup.innerHTML += "<h1 id=\"eventTitle\">"+obj.results[0].title+"<h1>";
                        popup.innerHTML += "<p id=\"eventText\">"+obj.results[0].text+"<br/><p>";
                        
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

/**
 * Remove all Markers of the map
 */
function removeAllMarkers() {
    for(var i = 0 ; i < allMarkers.length ; i++)
        map.removeLayer(allMarkers[i]);
    
    allMarkers = [];
}

/**
 * Transform a date format "AAAA-MM-JJ" in french like "JJ MM YYYY" where MM is in plain text
 * 
 * @param date The String date in format "AAAA-MM-JJ"
 * @return french date like "JJ MM YYYY" where MM is in plain text
 */
function transformDate(date) {
    var MOUNTH = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    
    return date.substring(8, 11)+" "+MOUNTH[parseInt(date.substring(6, 9))-1]+" "+date.substring(0, 4);
}
