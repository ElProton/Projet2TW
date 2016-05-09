var BGS;
var index;

function init() {
    BGS = ["birthday.jpg", "candle.jpg", "city.jpg", "concert.jpg", "baloon.jpg", "cerisier.jpg", "coffee.jpg"];
    index = Math.floor((Math.random() * BGS.length));
    
    window.setInterval(changeBG, 15000);
    changeBG();
}

function changeBG() {
    index += 1;
    document.querySelector("html").style.backgroundImage = "url('img/"+BGS[index%BGS.length]+"')";
}

window.addEventListener("load", init);
