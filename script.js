// JavaScript logic goes here
const players = [];
let ourScore = 0;
let theirScore = 0;
let gameTotalScore = 0;
let halfScore = 0;
let currentCycle = 0;

function startGame(){
    initializeGame();
    initializePlayers();
    initializeState();
    initializeScore();
    closeSetup();
    closePopup();
}

function initializeScore(){
    const gameTo = parseInt(document.getElementById("gameTo").value);
    gameTotalScore = gameTo;
    console.log(gameTotalScore);
    halfScore = Math.ceil(gameTotalScore/2);
    console.log(halfScore);
}

function initializeState(){
    const offense = document.getElementById("offenseStart");
    const defense = document.getElementById("defenseStart");
    if(offense.checked){
        stateOffense();
    }
    else if(defense.checked){
        stateDefense();
    }
}

function closeSetup(){
    document.getElementById("setUpButton").style.display = "none";
    document.getElementById("endGame").style.display = "block";
    document.getElementById("resetPage").style.display = "block";
}


function initializeGame(){
    const singleGenderRadio = document.getElementById("singleGender");
    const mixedGenderRadio = document.getElementById("mixedGender");

    if(singleGenderRadio.checked){
        initilizeNormal();
    }
    else if(mixedGenderRadio.checked){
        initializeMixed();
    }
}

function initilizeNormal(){
    const currentScore = document.getElementById("score");
    currentScore.innerHTML = `Score: ${ourScore} - ${theirScore}`;
}

function initializeMixed(){
    initilizeNormal();
    const currentMatching = document.getElementById("genderRatio");
    const MM = document.getElementById("maleMatching");
    const FM = document.getElementById("femaleMatching");
    if(MM.checked){
        currentMatching.innerHTML = `Current Matching: Male`;
    }
    else if(FM.checked){
        currentMatching.innerHTML = `Current Matching: Female`;
    }
}


function initializePlayers() {
    // Loop through the player input fields dynamic
    for (let i = 1; i <= 7; i++) {
        const playerName = document.getElementById(`player${i}`).value;
        const playerGender = document.getElementById(`playerGender${i}`).value;

        if (playerName) {
            players.push({
                name: playerName,
                gender: playerGender,
                catches: 0,
                completions: 0,
                blocks: 0,
                goals: 0,
                assists: 0,
                callahans: 0,
            });
        }
    }
    // Push unknown player in case user misses something
    players.push({
        name: "Unknown",
        gender: '',
        catches: 0,
        completions: 0,
        blocks: 0,
    });

    console.log(players); // Check for correct functionality
}

function openMorF(){
    document.getElementById("mOrF").style.display = "block";
}

function closeMorF(){
    document.getElementById("mOrF").style.display = "none";
}

// Open Pop Up
function openPopup() {
    document.getElementById("popupOverlay").style.display = "block";
}

// Close Pop Up
function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
}

// End Game functionality
function endGame() {
    document.getElementById("endGame").style.display = "none";
}

// Reset Page by refreshing
function resetPage() {
    // document.getElementById("resetPage").style.display = "none";
    location.reload();
}

function stateOffense(){
    const playerListDiv = document.getElementById("playerList");
    document.getElementById("theirGoal").style.display = "hidden";
    playerListDiv.innerHTML = "";
    players.forEach((player) => {
        playerListDiv.innerHTML += `<div class="player">${player.name} - 
        <button>Catch</button>
        <button>Drop</button>
        <button>Throwaway</button>
        <button>Goal</button></div>`;
    });
}

function stateDefense(){
    const playerListDiv = document.getElementById("playerList");
    document.getElementById("theirGoal").style.display = "block";
    playerListDiv.innerHTML = "";
    players.forEach((player) => {
        playerListDiv.innerHTML += `<div class="player">${player.name} - 
        <button>Block</button>
        <button>Block & Score</button>`;
    });

}