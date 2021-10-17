let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");




window.addEventListener("keydown", spacebarPressed)

function spacebarPressed(e){
    if(e.key === " ") {
     e.preventDefault();
     window.removeEventListener("keydown", spacebarPressed);
     draw();
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

//An easily changeable gap
let gapConst = 90;
let gap = pipeNorth.height-gapConst;

//g is the gravity constant and speed is a variable which constantly increases with the given gravity
let g = 0.1;
let speed = 0;

let pipe=[];
pipe[0] = {
    x:canvas.width,
    y:0
}

//draws the back- and foreground onto the canvas on load
window.onload( _ =>{
    c.drawImage(bg,0,0);
    c.drawImage(fg,0,canvas.height-fg.height);
});

let storedName = window.localStorage.getItem("name");
let lastScore = window.localStorage.getItem("lastScore");
let highScore = window.localStorage.getItem("highScore")

lastScoreDiv.innerHTML += `<br> ${storedName}: ${lastScore}<br>`;
highScoreDiv.innerHTML += `<br> ${storedName}: ${highScore}<br>`;


//When the spacebar is pressed after the first time, this function runs, which makes the
//bird move upwards, or fly if you want
window.onkeydown(e => {
    if(e.key === " ") {
        e.preventDefault();
        speed=-3;
        birdSound.play();
    }
});




function draw() {
    //Not sure why its needed inside here as well as outside but
    //its not frustrating me enough to fix it
    c.drawImage(bg,0,0);
    c.drawImage(fg,0,canvas.height-fg.height);

    //updates the position of the bird
    c.drawImage(bird,bX, bY);
    speed += g;
    bY += speed;

    //This is where the pipes are drawn and moved
    for (let i=0;i<pipe.length;i++){
        c.drawImage(pipeNorth, pipe[i].x,pipe[i].y);
        c.drawImage(pipeSouth, pipe[i].x,pipe[i].y+gap);
        pipe[i].x--;

        //When a pipe has moved far enough to the left a new one is spawned in
        if(pipe[i].x===100){
            pipe.push({
                x:canvas.width,
                y:Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            })
        }

        //if a pipe has gotten all the way to x=5, a point is added to the total score
        if(pipe[i].x === 5){
            scoreSound.play();
            score++;
        }



        //Checks collision between the bird and the things the bird can hit to end the game
        if(bX+bird.width>=pipe[i].x && bX<=pipe[i].x+pipeNorth.width &&
            (bY<=pipe[i].y+pipeNorth.height || bY+bird.height>=pipe[i].y+gap)
            || bY+bird.height >=canvas.height-fg.height){

            //Saves the score as last score
            window.localStorage.setItem("lastScore",JSON.stringify(score));

            //if the current score was higher than the stored high score, high score is updated
            if(Number(window.localStorage.getItem("highScore")) < score ){
                window.localStorage.setItem("highScore", JSON.stringify(score));
            }

            //page is reloaded and the game can start again
            location.reload();
        }

    }

    //Writes the score in real time to the canvas
    c.fillStyle("#000");
    c.font = "20px Helvetica";
    c.fillText(`Score: ${score}`, 15, canvas.height-20);
    requestAnimationFrame(draw);


}