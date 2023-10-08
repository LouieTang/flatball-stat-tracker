// JavaScript logic goes here
const players = [];
let ourScore = 0;
let theirScore = 0;
let gameTotalScore = 0;
let halfScore = 0;
let currentState = 0; // 0 - offense, 1 - defense
let startGender = 0; // 0 - female, 1 - male
let startState = 0; // 0 - offense, 1 - defense

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
    updateScore();
}

function updateScore(){
    const currentScore = document.getElementById("score");
    currentScore.innerHTML = `Score: ${ourScore} - ${theirScore}`;
}

function initializeState(){
    const offense = document.getElementById("offenseStart");
    const defense = document.getElementById("defenseStart");
    if(offense.checked){
        stateOffense();
        currentState = 0;
        startState = 0;
    }
    else if(defense.checked){
        stateDefense();
        currentState = 1;
        startState = 1;

    }
}

function updateStateOurScore(){
    currentState = 1; //set to defense
    ourScore++;
    updateGender();
    updateScore();
    if(ourScore == gameTotalScore || theirScore == gameTotalScore){
        finishGame();
        console.log("here7");

    }
    if(ourScore == halfScore && theirScore < halfScore){
        initHalfTime();
    }
    else{
        stateDefense();
    }
}
function updateStateTheirScore(){
    currentState = 0; //set to still offense
    theirScore++;
    updateGender();
    updateScore();
    if(theirScore == gameTotalScore || ourScore == gameTotalScore){
        finishGame();
        console.log("here6");
    }
    if(theirScore == halfScore && ourScore < halfScore){
        initHalfTime();
    }
    else{
        stateOffense();
    }
}

function finishGame(){
    console.log("here");
    alert(`Final Score: ${ourScore} - ${theirScore}`);
    resetPage();
}

function initHalfTime(){
    alert("HalfTime");
    if(startState == 0){
        stateDefense();
    }
    else{
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
        initilizeSingle();
    }
    else if(mixedGenderRadio.checked){
        initializeMixed();
    }
}

function initilizeSingle(){
    document.getElementById("genderRatio").style.display = "none";
}

function initializeMixed(){
    const currentMatching = document.getElementById("genderRatio");
    const MM = document.getElementById("maleMatching");
    const FM = document.getElementById("femaleMatching");
    if(MM.checked){
        currentMatching.innerHTML = `Current Matching: Male`;
        startGender = 1;
    }
    else if(FM.checked){
        currentMatching.innerHTML = `Current Matching: Female`;
        startGender = 0;
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
                hasDisc: false,
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
        hasDisc: false,
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
    finishGame();
    document.getElementById("endGame").style.display = "none";
}

// Reset Page by refreshing
function resetPage() {
    // document.getElementById("resetPage").style.display = "none";
    location.reload();
}

function stateOffense(){
    const playerListDiv = document.getElementById("playerList");
    document.getElementById("theirGoal").style.display = "none";
    playerListDiv.innerHTML = "";
    let i = 0;
    players.forEach((player) => {
        playerListDiv.innerHTML += `<div class="player" id="player${i}"><span onclick="hasDisc(${i})">${player.name}</span></div>`;
        i++
    });
}

function stateDefense(){
    const playerListDiv = document.getElementById("playerList");
    document.getElementById("theirGoal").style.display = "block";
    playerListDiv.innerHTML = "";
    let i = 0;
    players.forEach((player) => {
        playerListDiv.innerHTML += `<div class="player" id="player${i}"><span>${player.name}</span> - 
        <button onclick="stateOffense()">Block</button>
        <button onclick="updateStateOurScore()">Block & Score</button>`;
        i++;
    });

}

function hasDisc(playerNumber){
    console.log("here?");
    const playerListDiv = document.getElementById("playerList");
    document.getElementById("theirGoal").style.display = "none";
    playerListDiv.innerHTML = "";
    let i = 0;
    players.forEach((player) => {
        if(i != playerNumber){
            playerListDiv.innerHTML += `<div class="player" id="player${i}"><span">${player.name}</span> - 
            <button onclick="hasDisc(${i})">Catch</button>
            <button onclick="stateDefense()">Drop</button>
            <button onclick="stateDefense()">Throwaway</button>
            <button onclick="updateStateOurScore()">Goal</button></div>`;
        }
        else{
            playerListDiv.innerHTML += `<div class="player" id="player${i}"><span>${player.name}</span></div>`;
        }
        i++
    });
}


function updateGender(){
    const currentMatching = document.getElementById("genderRatio");
    if(startGender == 0){
        let sumScore = ourScore + theirScore;
        if(sumScore % 4 == 1 || sumScore % 4 == 2){
            currentMatching.innerHTML = `Current Matching: Male`;
        }
        else{
            currentMatching.innerHTML = `Current Matching: Female`;
        }
    }
    else if(startGender == 1){
        let sumScore = ourScore + theirScore;
        if(sumScore % 4 == 1 || sumScore % 4 == 2){
            currentMatching.innerHTML = `Current Matching: Female`;
        }
        else{
            currentMatching.innerHTML = `Current Matching: Male`;
        }
    }
}

