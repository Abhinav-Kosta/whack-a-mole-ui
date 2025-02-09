//Initializing Game
let level = 0;
let lives = 5;
let h2 = document.querySelector("h2");
let body = document.querySelector("body");
let gameStarted = false;

//Tracking user clickes
let userClicked = false;

let moles = ["one", "two", "three", "four", "five",
     "six", "seven", "eight", "nine"];

document.addEventListener("keypress", function(){
    if(!gameStarted){
        h2.innerHTML = `<b>Level: ${level}</b><br><br><i>Lives: ${lives}</i>`;
        gameStarted = true;

        startGame();
    }
})

function startGame(){
    let ranIdx = Math.floor(Math.random() * 9);
    let ranMole = moles[ranIdx];

    showMole(ranMole);
}

function showMole(ranMole){
    let moleImage = document.querySelector(`#${ranMole} img`);

    // The div holding the mole image
    let moleDiv = document.getElementById(ranMole);  

    moleImage.classList.remove("hide");

    // Temporarily disable clicking on mole until it's hidden again
    // moleDiv.style.pointerEvents = "none";

    setTimeout(function(){
        moleImage.classList.add("hide");

        // Enable clicking on mole again after it hides
        // moleDiv.style.pointerEvents = "auto";

    }, 1000);
}

let allMoles = document.querySelectorAll(".subDiv");

for(mole of allMoles){
    mole.addEventListener("click", userClick);
}


let hitSound = new Audio("hitting.wav");
let missSound = new Audio("missing.wav");

function userClick() {
    let pressDig = this; // 'this' is the clicked div

    // Get the corresponding mole div
    let dig = document.getElementById(pressDig.id);
    // Find the img element within the div
    let moleImage = dig.querySelector("img");

    // Check if the mole is visible
    if (!moleImage.classList.contains("hide")) {
        // Increase level if mole is visible
        level++; 

        //Playing hitting sound and resetting it with each click
        hitSound.currentTime = 0;
        hitSound.play();

        //Tracking if user clicked or not
        userClicked = true;

    } else {
        // Decrease lives if mole is hidden
        lives--;

        missSound.currentTime = 0;
        missSound.play();

        //Tracking if user clicked or not
        userClicked = true;
        
        //Resetting user click in case he misses to hit mole
        setTimeout(function(){
            userClicked = false;
        }, 2000)
    }

    // Update the game display
    h2.innerHTML = `<b>Level: ${level}</b><br><br><i>Lives: ${lives}</i>`;

    // Check game state
    if (lives > 0) {
        startGame(); // Show the next mole
    } else {
        h2.innerHTML = `<b>Game Over! You reached Level: ${level}</b><br><br>
        Press any key to restart the game`;
        level = 0;  // Reset level
        lives = 5;  // Reset lives
        gameStarted = false;  // Reset game state

        //Flashing red color Game Over
        body.style.backgroundColor = "red";
        setTimeout(function(){
            body.style.backgroundColor = "rgb(173, 216, 230)";
        }, 2000);
    }
}

//Resetting user click in case he misses to hit mole
setInterval(function(){
    if(userClicked){
        userClicked = false;
    }
}, 2000);

setInterval(function(){
    if(!userClicked && gameStarted){
        startGame();
    }
}, 2000);