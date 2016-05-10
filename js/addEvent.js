window.addEventListener("load", init);

function init(){
    var button = document.getElementById("addEventButton");
    button.addEventListener("click", initForm);
}

function initForm() {
    var form = document.getElementById("addEventForm");
    form.setAttribute("action", "traitementAddEvent");
    form.setAttribute("method", "post");
        /*   Géolocalisation */
    var ul = document.createElement('ul');
    ul.setAttribute("id", "localisation");
    var li = document.createElement('li');
    var label = document.createElement('label');
    label.setAttribute("for", "latitude");
    label.innerHTML = "Latitude :<br />";
    var input = document.createElement("input");
    input.setAttribute("name", 'latitude');
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
    input.setAttribute("id", "titre");
    input.setAttribute("class", "input");
    li.appendChild(label);
    li.appendChild(input);
    ul.appendChild(li);
            /* Date */
    li = document.createElement('li');
    label = document.createElement('label');
    label.innerHTML = "Date :<br />";
    li.appendChild(label);
    input = document.createElement("input");
    input.setAttribute("name", 'annee');
    input.setAttribute("id", "annee");
    input.setAttribute("class", "input");
    input.setAttribute("placeholder", "aaaa");
    li.appendChild(input);
    input = document.createElement("input");
    input.setAttribute("name", 'mois');
    input.setAttribute("id", "mois");
    input.setAttribute("class", "input");
    input.setAttribute("placeholder", "mm");
    li.appendChild(input);
    input = document.createElement("input");
    input.setAttribute("name", 'jour');
    input.setAttribute("id", "jour");
    input.setAttribute("class", "input");
    input.setAttribute("placeholder", "jjjj");
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
    input.setAttribute("value", "Ajouter");
    ul.appendChild(input);
    form.appendChild(ul);
    document.getElementById("popup").style.display = "block";
}

