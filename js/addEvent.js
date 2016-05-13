window.addEventListener("load", init);
var map;
var marker;

/**
 * Initialize the differents events link to adequate buttons and
 * Construct the form in a pop-up when addButton is clicked
 */
function init(){    
    initForm();
    marker = null;
    /* Initialize the map */
    map = L.map('map-container').setView([46.46, 2.8125], 4);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '©️ <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);    
    
    var button = document.getElementById("addEventButton");
    var croix = document.getElementById("suppression");
    button.addEventListener("click", showEvent); /* Show the form to add an event */
    croix.addEventListener("click", hideEvent);  /* Hide the form */
    
    map.on("click", mapclick); /* Event when users click on the map */
}

/**
 * Function launch when user click on the map
 * 
 * Remove the marker, if any;
 * Change the lat and lng in the adequate input;
 * Add a marker where the user click
 * 
 * @param e The objet that launch the event
 */
function mapclick(e){
    removeMarker();
    var lat = document.getElementById("latitude");
    var lon = document.getElementById("longitude");
    
    lat.value = e.latlng.lat;
    lon.value = e.latlng.lng;
    
    addMarker([e.latlng.lat, e.latlng.lng]);
    
}

/**
 * Remove the marker already on the map
 */
function removeMarker() {
    if(marker != null) {
        map.removeLayer(marker);
        marker = null;
    }
}

/**
  * Add a marker to the map m at the position (positionArray[0], positionArray[1]) 
  * 
  * @param positionArray An array with two elements: x position and y position
  * @param m The Leaflet map
  * @param txt A text to bind to the popup that appear when you click on a marker
  */
function addMarker(positionArray)
{
    marker = L.marker(positionArray).addTo(map);
}

/**
 * Initialize the form to add an event;
 * 
 */
function initForm() {
        var form = document.getElementById("addEventForm");
        form.setAttribute("action", "traitementAddEvent.php");
        form.setAttribute("method", "post");
        /*   Géolocalisation */
        var mapcontainer = document.createElement('div');
        var captcha = document.createElement('img');
        captcha.setAttribute("src", "includes/captcha.php");
        captcha.setAttribute("alt", "captcha");
        captcha.setAttribute("id", "captchaEvent");
        
        var tips = document.createElement('p');
        tips.innerHTML = "Astuce: cliquez sur la carte pour choisir une position !";
        tips.setAttribute("id", "addEventTips");
        tips.setAttribute("class", "tips");
        
        mapcontainer.setAttribute("id", "map-container");
        form.appendChild(mapcontainer);
        
        var ul = document.createElement('ul');
        ul.setAttribute("id", "localisation");
        var li = document.createElement('li');
        var label = document.createElement('label');
        label.setAttribute("for", "latitude");
        label.innerHTML = "Latitude :<br />";
        var input = document.createElement("input");
        input.setAttribute("name", 'latitude');
        input.setAttribute("type", 'text');
        input.setAttribute("id", "latitude");
        input.setAttribute("class", "input");
        input.setAttribute("placeholder", "0<=latitude<360");
        li.appendChild(label);
        li.appendChild(input);
        ul.appendChild(li);
        li = document.createElement('li');
        label = document.createElement('label');
        label.setAttribute("for", "longitude");
        label.innerHTML = "Longitude :<br />";
        input = document.createElement("input");
        input.setAttribute("name", 'longitude');
        input.setAttribute("id", "longitude");
        input.setAttribute("type", 'text');
        input.setAttribute("class", "input");
        input.setAttribute("placeholder", "0<=longitude<360");
        li.appendChild(label);
        li.appendChild(input);
        ul.appendChild(li);
        form.appendChild(ul);
        /* Informations*/
        ul = document.createElement('ul');
        ul.setAttribute("id", "infosEvent");
        li = document.createElement('li');
        label = document.createElement('label');
        label.setAttribute("for", "titre");
        label.innerHTML = "Titre :<br />";
        input = document.createElement("input");
        input.setAttribute("name", 'titre');
        input.setAttribute("type", 'text');
        input.setAttribute("id", "titre");
        input.setAttribute("class", "input");
        input.setAttribute("placeholder", "max: 40");
        li.appendChild(label);
        li.appendChild(input);
        ul.appendChild(li);
        /* Date */
        li = document.createElement('li');
        label = document.createElement('label');
        label.innerHTML = "Date :<br />";
        li.appendChild(label);

        input = document.createElement("input");
        input.setAttribute("name", 'jour');
        input.setAttribute("id", "jour");
        input.setAttribute("class", "input date");
        input.setAttribute("type", 'text');
        input.setAttribute("placeholder", "jjjj");        
        li.appendChild(input);

        input = document.createElement("input");
        input.setAttribute("name", 'mois');
        input.setAttribute("id", "mois");
        input.setAttribute("type", 'text');
        input.setAttribute("class", "input date");
        input.setAttribute("placeholder", "mm");
        li.appendChild(input);
        
        input = document.createElement("input");
        input.setAttribute("name", 'annee');
        input.setAttribute("id", "annee");
        input.setAttribute("class", "input date");
        input.setAttribute("type", 'text');
        input.setAttribute("placeholder", "aaaa");
        li.appendChild(input);        
        
        ul.appendChild(li);
        /********************/
        li = document.createElement('li');
        label = document.createElement('label');
        label.innerHTML = "Description :<br />";
        label.setAttribute("for", "description");
        li.appendChild(label);
        input = document.createElement("textarea");
        input.setAttribute("name", 'description');
        input.setAttribute("id", "description");
        input.setAttribute("class", "input");
        input.setAttribute("placeholder", "Votre description ne peut pas dépasser 1500 caractères");
        input.setAttribute("rows", "8");
        input.setAttribute("cols", "50");
        li.appendChild(input);
        ul.appendChild(li);
        input = document.createElement("input");
        input.setAttribute("id", "addButton");
        input.setAttribute("type", "submit");
        input.setAttribute("name", "addButton");
        input.setAttribute("value", "Ajouter un évènement");
        form.appendChild(ul);
        
        var captchaInput = document.createElement("input");
        captchaInput.setAttribute("id", "captchaInput");
        captchaInput.setAttribute("type", "text");
        captchaInput.setAttribute("name", "captcha");
        captchaInput.setAttribute("placeholder", "Recopier ici le code de sécurité");
        
        form.appendChild(captcha);
        form.appendChild(captchaInput);
        form.appendChild(input);
        form.appendChild(tips);
}

/**
 * Hide the block that allows the user to add an event
 */
function hideEvent() {
    document.getElementById("popup").style.display = "none";
}

/**
 * Show the block that allows the user to add an event
 */
function showEvent() {
    document.getElementById("popup").style.display = "block";
}

