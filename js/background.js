var BGS; /* List of the different backgrounds */
var index; /* The index%(BGS.length) of the choosen background */

/**
 * Initialize the index value with a random one, and list the different backgrounds in BGS
 * 
 * Also, change the Background
 */
function init() {
    BGS = ["birthday.jpg", "candle.jpg", "city.jpg", "concert.jpg", "baloon.jpg", "cerisier.jpg", "coffee.jpg"];
    index = Math.floor((Math.random() * BGS.length));

    changeBG();
}

/**
 * Change the background and set a countdown to fade out again the background
 */
function changeBG() {
    index += 1;
    document.querySelector("#background").style.backgroundImage = "url('img/"+BGS[index%BGS.length]+"')";
    document.querySelector("#background").style.opacity = "1";
    window.setTimeout(hideBG, 15000);
    
}

/**
 * Fade out the background and set a countdown to change the background
 */
function hideBG() {
    document.querySelector("#background").style.opacity = "0";
    window.setTimeout(changeBG, 1000);
}

/* Add an event and launch init() when the page is fully load */
window.addEventListener("load", init);
