// module (factory in IIFE)
const gameboard = (() => {
    const board = [];
    const squares = document.querySelectorAll('.square');
    const updateBoard = (e) => {
        const square = document.getElementById(e.target.id);
        var square_type = '';
        if (board.length % 2 && square.innerText === ''){
            square_type = 'O';
            board.push(square_type);
            square.innerText = square_type;
        }
        else if (square.innerText === ''){
            square_type = 'X';
            board.push(square_type);
            square.innerText = square_type;
        }
    }
    squares.forEach(button => {
        button.addEventListener('click', updateBoard);
    });
    // return methods
    return { board }
})();
const scoreBoard = (() => {
    // current session
    const score = () => {
        gameboard.board.forEach(element => {
            console.log(element);
        });
    }
    // stored session
    const overallScore = () => {

    }

    const scoreBtn = document.querySelector('.scoreBtn');
    scoreBtn.addEventListener('click', score);
    return { score, overallScore };
})();


const displayController = (() => {
    const players = [];

    const choosePlayerTypeDiv = document.querySelector('.choosePlayerTypeDiv');
    const instruction = document.querySelector('.instruction');
    const playerBtn = document.querySelector('.playerBtn');
    const playerNameDiv = document.querySelector('.playerNameDiv');
    const playerNameBtn = document.querySelector('.playerNameBtn');
    const computerBtn = document.querySelector('.computerBtn');
    const playerNameInput = document.querySelector('.playerName');
    const gameBoard = document.querySelector('.gameBoard');
    const resetBtn = document.querySelector('.resetBtn');


    const showPlayerTypeDiv = (bool) => {
        if (bool) {
            playerNameDiv.style.display = 'none';
            choosePlayerTypeDiv.style.display = 'unset';
        }
        else {
            // display player name div and button
            playerNameDiv.style.display = 'unset';
            // hide player or computer option
            choosePlayerTypeDiv.style.display = 'none';
        }
    }
    const endOfPlayerSelection = () => {
        choosePlayerTypeDiv.style.display = 'none';
        playerNameDiv.style.display = 'none';
        instruction.innerText = `${players[0].key} VS ${players[1].key}`;
        resetBtn.style.display = 'unset';
        gameBoard.style.display = 'block';
    }
    // player vs player, player vs computer
    var select_second_player_str = "Select Second Player";
    var enter_player_name_str = "Enter Player Name";
    const select_computer_type = () => {
        if (players.length == 0){
            players.push({
                key: "Computer One",
                value: 1
            });
            instruction.innerText = enter_player_name_str;
            showPlayerTypeDiv(false);
        }
        else if (players.length == 1){
            if (players[0].key.includes("Computer")){
                instruction.innerText =  enter_player_name_str;
                showPlayerTypeDiv(false);
            }
            else{
                players.push({
                    key: "Computer Two",
                    value: 1
                });
                endOfPlayerSelection();
            }
        }
    }
    const select_player_type = () => {
        instruction.innerText = enter_player_name_str;
        showPlayerTypeDiv(false);
    }
    const enter_player_name = () => {
        var playerName = playerNameInput.value;
        if (playerName.length == 0){
            // do nothing
        }
        else{
            instruction.innerText = select_second_player_str;
            if (players.length == 0){
                players.push({
                    key: playerName,
                    value: 0
                });
                showPlayerTypeDiv(true);
            }
            else {
                players.push({
                    key: playerName,
                    value: 1
                });
                endOfPlayerSelection();
            }
        }
        playerNameInput.value = '';
    }

    const refreshPage = () => {
        location.reload();
    };

    playerBtn.addEventListener('click', select_player_type);
    computerBtn.addEventListener('click', select_computer_type);
    playerNameBtn.addEventListener('click', enter_player_name);
    resetBtn.addEventListener('click', refreshPage);

    return { players }
})();


// player
const Player = (name) => {
    let score = 0;
    // instruction for which player's turn

    // method for player's move

    // method to update score

    // return methods
    return { name, score };
};
// player
const Computer = (name) => {
    let score = 0;
    // instruction for which player's turn

    // method for player's move

    // method to update score

    // return methods
    return { name, score };
};

