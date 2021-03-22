// module (factory in IIFE)
const gameboard = (()=>{
    const board = [];
    const displayBoard = document.querySelectorAll('.square');
    const fillBoard = displayBoard.forEach(button => {
        button.innerText = 'X';
    })
    // return methods
    return {fillBoard};
})();

const scoreBoard = (()=> {
    const score = () => {

    }
    const overallScore = () => {

    }
    return {score, overallScore};
})();

const playerNames = [];
const displayController = (() => {

    const choosePlayerTypeDiv = document.querySelector('.choosePlayerTypeDiv');
    const instruction = document.querySelector('.instruction');
    const startBtn = document.querySelector('.startBtn');
    const playerBtn = document.querySelector('.playerBtn');
    const playerNameDiv = document.querySelector('.playerNameDiv');
    const playerNameBtn = document.querySelector('.playerNameBtn');
    const computerBtn = document.querySelector('.computerBtn');
    const playerNameInput = document.querySelector('.playerName');
    const gameBoard = document.querySelector('.gameBoard');
    const resetBtn = document.querySelector('.resetBtn');

    const showPlayerSelection = (sequence) => {
        if (sequence != 'Second')
            sequence = 'First';
        startBtn.style.display = 'none';

        choosePlayerTypeDiv.style.display = 'flex';

        instruction.innerText = `Select ${sequence} Contender`;
        instruction.style.display = 'flex';
    }
    startBtn.addEventListener('click', showPlayerSelection);

    const showPlayerNameDiv = () => {

        playerNameDiv.style.display = 'unset';
        choosePlayerTypeDiv.style.display = 'none';
        playerNameInput.value = '';
    }
    playerBtn.addEventListener('click', showPlayerNameDiv);

    const getPlayerName = () => {
        if (playerNameInput.value != ""){
            if (playerNames.length < 1){
                playerNames.push(playerNameInput.value);
                showPlayerSelection('Second');
            }
            else{
                playerNames.push(playerNameInput.value);
                instruction.style.display = 'none';
                gameBoard.style.display = 'block';
                resetBtn.style.display = 'unset';
            }
            playerNameDiv.style.display = 'none';
        }
    }
    playerNameBtn.addEventListener('click', getPlayerName);

    const getComputerName = () => {
        if (playerNames.length < 1){
            playerNames.push('ComputerOne');
            showPlayerSelection('Second');
            computerBtn.style.display = 'none';
        }
        else{
            playerNames.push('ComputerTwo');
            choosePlayerTypeDiv.style.display = 'none';
            instruction.style.display = 'none';
            gameBoard.style.display = 'block';
            resetBtn.style.display = 'unset';
        }
    }
    computerBtn.addEventListener('click', getComputerName);

    // return methods 
    return {};
})();

// player
const Player = (name) => {
    let score = 0;

    // method to update score

    // return methods
    return {};
};

// computer to inherit player's methods
const computer = (name) => {
    // methods that I want to inherit inside {}
    const {} = Player(name);

    // return methods
    return {}
}