let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");




window.addEventListener("keydown", spacebarPressed)

function spacebarPressed(e){
    if(e.key === " ") {
     e.preventDefault();
     window.removeEventListener("keydown", spacebarPressed);
     startGame();
    }
}

let highScoreDiv = document.getElementById("highscore");
let lastScoreDiv = document.getElementById("lastscore");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src="/images/bird.png";
bg.src="/images/bg.png";
fg.src="/images/fg.png";
pipeNorth.src="/images/pipeNorth.png";
pipeSouth.src="/images/pipeSouth.png";

let birdSound = new Audio();
let scoreSound = new Audio();

birdSound.src="/sounds/fly.mp3";
scoreSound.src="/sounds/score.mp3";

let score=0;

//The birds coordinates at the start of the game
let bX=10;
let bY=150;

//g is the gravity constant and speed is a variable which constantly increases with the given gravity
let g = 0.1;
let speed = 0;

//draws the back- and foreground onto the canvas on load
window.onload( _ =>{
    c.drawImage(bg,0,0);
    c.drawImage(fg,0,canvas.height-fg.height);
});

let storedName = window.localStorage.getItem("name");
let lastScore = window.localStorage.getItem("lastScore");
let highscore = window.localStorage.getItem("highScore")

lastScoreDiv.innerHTML += `<br> ${storedName}: ${lastScore}<br>`;
highScoreDiv.innerHTML += `<br> ${storedName}: ${highscore}<br>`;






function startGame() {

}