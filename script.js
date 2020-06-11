window.addEventListener("click", play);

function play() {
    var movingBar = document.getElementById("moving-bar");
    var movingBarWidth = movingBar.offsetWidth;
    var movingBarLeft = movingBar.offsetLeft ;
    var stoppedBars = this.document.getElementsByClassName("stopped-bar");
    var staitcBar = document.getElementById("static-bar");   
    var previousBar = (stoppedBars.length == 0)? staitcBar: stoppedBars[stoppedBars.length-1];
    var previousBarWidth = previousBar.offsetWidth;
    var previousBarLeft = previousBar.offsetLeft-(previousBarWidth/2);
    var gameOver = false;
    var newStoppedBarWidth;
    var score = document.getElementById("score").innerHTML;

    if(movingBarLeft + movingBarWidth < previousBarLeft || movingBarLeft > previousBarLeft+movingBarWidth) { 
        gameOver = true;        
    }
    else if((movingBarLeft - previousBarLeft < 16 && movingBarLeft - previousBarLeft >= 0) || (previousBarLeft - movingBarLeft < 16 && previousBarLeft - movingBarLeft  >= 0)) {
        newStoppedBarWidth = previousBarWidth;
        score = score-0 + 2;
    }
    else if(movingBarLeft < previousBarLeft) {
        newStoppedBarWidth = previousBarWidth - (previousBarLeft-movingBarLeft);
        score = score-0+1;
    }
    else if(movingBarLeft > previousBarLeft) {
        newStoppedBarWidth = previousBarWidth + (previousBarLeft-movingBarLeft);
        score = score-0+1;
    }
    movingBar.removeAttribute("id");
    movingBar.style.animation = null;
    movingBar.removeAttribute("class");
    if(gameOver || newStoppedBarWidth < 8) {
        var flag = document.createElement("div");
        flag.setAttribute("id", "flag");
        var flagBar = document.createElement("div");
        flagBar.setAttribute("id", "flag-bar");
        movingBar.setAttribute("id", "end-sign");
        movingBar.style.width = 40+"px";
        movingBar.appendChild(flag);
        movingBar.appendChild(flagBar);
        movingBar.style.top = movingBar.offsetTop+25+"px";
    }
    else {
        movingBar.setAttribute("class", "stopped-bar");
        staitcBar.style.top = staitcBar.offsetTop+50+"px";
        document.getElementById("score").innerHTML = score;
        for(var i = 0; i<stoppedBars.length-1; i++){              
            stoppedBars[i].style.top =  stoppedBars[i].offsetTop+50+"px";
        }
        movingBar.style.top = stoppedBars[stoppedBars.length-1].offsetTop+75+"px";
        movingBar.style.width = newStoppedBarWidth+"px";
        start();
    }
    
}

function start() {
    var gameArea = document.getElementById("game-area");
    var staitcBar = document.getElementById("static-bar");
    var stoppedBars = document.getElementsByClassName("stopped-bar");
    var movingBar = document.createElement("div");
    var previousBarWidth = 500;
    var numberStones;
    movingBar.setAttribute("id", "moving-bar");
    movingBar.style.position = "absolute";
   
    if (stoppedBars.length == 0)
        movingBar.style.width = staitcBar.offsetWidth+"px";
    else {
        previousBarWidth =  stoppedBars[stoppedBars.length-1].offsetWidth;
        movingBar.style.width = previousBarWidth+"px";
    }
    numberStones = (previousBarWidth > 100)? previousBarWidth/72 : 1;      

    for( var i = 1; i<=numberStones; i++) {
        var transform = (i%2 == 0)? "rotateZ(-1.5deg)": "rotateZ(1.5deg)";
        var stone = document.createElement("div");
        stone.style.transform = transform;
        movingBar.appendChild(stone);
    }
    
    if(stoppedBars.length<6) {
        movingBar.style.animation =  "move 3s linear infinite";
    }
    else if(stoppedBars.length<12) {
        movingBar.style.animation = "move 2.5s linear infinite";
    }
    else if(stoppedBars.length<21) {
        movingBar.style.animation = "move 2s linear infinite";
    }
    else if(stoppedBars.length<31) {
        movingBar.style.animation = "move 1.5s linear infinite";
    }
    else if(stoppedBars.length<41) {
        movingBar.style.animation = "move 1s linear infinite";
    }
    if(stoppedBars.length>4){
       document.getElementById("game-area").style.height = (stoppedBars.length-4)*50 + 600+"px";
    }
    if(stoppedBars.length>0){
        movingBar.style.top = stoppedBars[stoppedBars.length-1].offsetTop-75+"px";
    }
    else {
        movingBar.style.top = staitcBar.offsetTop-75+"px";
    }
    movingBar.setAttribute("class", "moving-bar")
    gameArea.appendChild(movingBar);
}