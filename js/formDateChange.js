function init(){
    var jour = document.getElementById("modificationDate");

    for (var i = 29; i <= 31; i++) {
        var option = new Option(i, i);
        option.className = "dayOptions";
        jour.appendChild(option);
    }

    var Date = document.getElementsByClassName('dateChange')

    Date[0].addEventListener("change", changeDay);
    Date[1].addEventListener("change", changeDay);
}

/**
 * Give if the year is bis or not
 * @param year the year(int)
 * @returns {boolean} True if is bisextile
 */
function isBis(year) {
    if ((year%4) == 0){
        if ((year%100) == 0){
            if ((year%400) == 0){
                return true;
            }
            return false;
        }
        return true;
    }
    else{
        return false;
    }
}


/**
 * Change the nb of days which the date change
 * @param event a date change
 */
function changeDay(event){
    var Date = document.getElementsByClassName('dateChange');
    var mois = Date[0];
    var annee = Date[1];

    var choiceMois = mois.selectedIndex;
    var choiceannee = annee.selectedIndex;

    var mounths = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    var bisyears = [""]
    if(choiceMois != null) {
        var jour = document.getElementById("modificationDate");
        if (choiceMois == 0 || choiceMois == 2 || choiceMois == 4 || choiceMois == 6 ||choiceMois == 7 || choiceMois == 9 || choiceMois == 11){
            var dayoptions = document.getElementsByClassName("dayOptions");
            if (dayoptions == undefined || dayoptions.length != 0) {
                for (var i = 0; i < dayoptions.length; i) {
                    document.getElementById("modificationDate").removeChild(dayoptions[parseInt(i, 10)]);
                }
            }
            for (var i = 29; i <= 31; i++) {
                var option = new Option(i, i);
                option.className = "dayOptions";
                jour.appendChild(option);
            }
        }
        else {
            if (choiceMois == 1) {
                var dayoptions = document.getElementsByClassName("dayOptions");
                for (var i = 0; i < dayoptions.length; i) {
                    jour.removeChild(dayoptions[parseInt(i, 10)]);
                }
                if (isBis(annee.options[choiceannee].value, parseInt()) == true){
                    var option = new Option(29, 29);
                    option.className = "dayOptions";
                    jour.appendChild(option);
                }

            }

            else {
                var dayoptions = document.getElementsByClassName("dayOptions");
                if (dayoptions == undefined || dayoptions.length != 0) {
                    for (var i = 0; i < dayoptions.length; i) {
                        document.getElementById("modificationDate").removeChild(dayoptions[parseInt(i, 10)]);
                    }
                }
                for (var i = 29; i <= 30; i++) {
                    var option = new Option(i, i);
                    option.className = "dayOptions";
                    jour.appendChild(option);
                }

            }
        }
    }


}

window.addEventListener("load", init);


