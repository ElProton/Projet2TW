var BGS;
var index;

function init() {
    BGS = ["birthday.jpg", "candle.jpg", "city.jpg", "concert.jpg", "baloon.jpg", "cerisier.jpg", "coffee.jpg"];
    index = Math.floor((Math.random() * BGS.length));
    
    window.setInterval(hideBG, 15000);
    window.setInterval(changeBG, 16000);
    changeBG();
}

function changeBG() {
    index += 1;
    document.querySelector("#background").style.backgroundImage = "url('img/"+BGS[index%BGS.length]+"')";
    document.querySelector("#background").style.opacity = "1";
}

function hideBG() {
    document.querySelector("#background").style.opacity = "0";
}

window.addEventListener("load", init);