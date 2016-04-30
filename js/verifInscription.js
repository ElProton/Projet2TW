function surligne(champ, erreur)
{

    if(erreur)

        champ.style.backgroundColor = "#fba";

    else

        champ.style.backgroundColor = "";

}

function verifPseudo(champ)
{

    if(champ.value.length < 4 || champ.value.length > 16)
    {

        surligne(champ, true);

        return false;

    }

    else
    {

        surligne(champ, false);

        return true;

    }
}

function verifMDP(champ)
{
    var isUpper, isLower, isNumber;

    if(champ.value.length < 8)
    {
        surligne(champ, true);
        return false;
    }
    else
    {
        for(c in champ.value){
            if(a<=c && c<=z){
                isLower = true;
            }

            if(A<=c && c<=Z){
                isUpper = true;
            }

            if(0<=c && c<=9){
                isNumber = true;
            }
        }
        if(isUpper && isLower && isNumber){
            surligne(champ, false);
            return true;
        }
        else{
            surligne(champ,true);
            return false;
        }
    }

}

function verifRepetition(champ){
    var motDePasse = document.getElementById("MDP");
    if (champ.value == motDePasse.value){
        surligne(champ, false);
        return true;
    }

    surligne(champ, true);
    return false;
}

function verifForm(f)
{
    var pseudoOk = verifPseudo(f.username);
    var mdpOk = verifMDP(f.mdp);
    var repeatOk = verifRepetition(f.mdp2);

    if(pseudoOk && mdpOk && repeatOk)
        return true;

    else
    {

        alert("Veuillez remplir correctement tous les champs");
        return false;
    }

}

