// module (factory in IIFE)
const gameboard = (() => {
    const winning_board = [
        [1,2,3], [4,5,6], [7,8,9],
        [1,4,7], [2,5,8], [3,6,9],
        [1,5,9], [3,5,7]
    ]
    const board = [];
    const squares = document.querySelectorAll('.square');
    const check_winner = () => {
        console.log("player one: " + player_one.get_player_moves());
        console.log("player two: "+player_two.get_player_moves());
        let winner = "";
        let game_complete = false; 
        winning_board.forEach(board => {
            if (board.every(pos => player_one.get_player_moves().includes(pos.toString()))){
                winner = player_one.getName();
                game_complete = true;
            }
            else if (board.every(pos => player_two.get_player_moves().includes(pos.toString()))){
                winner = player_two.getName();
                game_complete = true;
            }
            else if (player_one.get_player_moves().length == 5 && game_complete == false){
                winner = "DRAW";
                game_complete = true;
            }
        });
        
        return {game_complete, winner};
    };

    const updateBoard = (e) => {
        const square = document.getElementById(e.target.id);
        var square_type = '';
        if (board.length % 2 && square.innerText === '') {
            square_type = 'O';
            board.push(square_type);
            player_two.updatePlayerMove(e.target.id);
            square.innerText = square_type;
        }
        else if (square.innerText === '') {
            square_type = 'X';
            board.push(square_type);
            player_one.updatePlayerMove(e.target.id);
            square.innerText = square_type;
        }
        // check winning condition after every turn
        result = check_winner();
        if (result.game_complete) {
            if (result.winner.includes("DRAW")){
                displayController.instruction.innerText = result.winner;
            }else{
                displayController.instruction.innerText = result.winner + " IS THE WINNER!";
            }
            squares.forEach(btn => {
                btn.disabled = true;
            })
            displayController.restartBtn.style.display = 'unset';
        };
    };
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


// player
const Player = () => {
    let total_score;
    let playerMoves = [];
    let name;
    const getName = () => name;
    const setName = (player_name) => {
        name = player_name;
    }
    const get_player_moves = () => playerMoves;
    const updatePlayerMove = (move) => {
        playerMoves.push(move);
    }
    const getScore = () => total_score;
    const updatePlayerScore = (score) => {
        total_score += score;
    }
    // return methods
    return {
        getName, setName,
        get_player_moves, updatePlayerMove,
        getScore, updatePlayerScore
    };
};

const player_one = Player();
const player_two = Player();

const displayController = (() => {
    let no_players = 0;
    const choosePlayerTypeDiv = document.querySelector('.choosePlayerTypeDiv');
    const instruction = document.querySelector('.instruction');
    const playerBtn = document.querySelector('.playerBtn');
    const playerNameDiv = document.querySelector('.playerNameDiv');
    const playerNameBtn = document.querySelector('.playerNameBtn');
    const computerBtn = document.querySelector('.computerBtn');
    const playerNameInput = document.querySelector('.playerName');
    const gameBoard = document.querySelector('.gameBoard');
    const resetBtn = document.querySelector('.resetBtn');
    const restartBtn = document.querySelector('.restartBtn');

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
        instruction.innerText = `${player_one.getName()} VS ${player_two.getName()}`;
        resetBtn.style.display = 'unset';
        gameBoard.style.display = 'block';
    }
    // player vs player, player vs computer
    var select_second_player_str = "Select Second Player";
    var enter_player_name_str = "Enter Player Name";
    const select_computer_type = () => {
        if (no_players == 0) {
            no_players += 1;
            player_one.setName("Computer One");
            instruction.innerText = enter_player_name_str;
            showPlayerTypeDiv(false);
        }
        else if (no_players == 1) {
            if (player_one.getName().includes("Computer")) {
                instruction.innerText = enter_player_name_str;
                showPlayerTypeDiv(false);
            }
            else {
                no_players += 1;
                player_two.setName("Computer Two");
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
        if (playerName.length == 0) {
            // do nothing
        }
        else {
            instruction.innerText = select_second_player_str;
            if (no_players == 0) {
                player_one.setName(playerName);
                showPlayerTypeDiv(true);
            }
            else {
                player_two.setName(playerName);
                endOfPlayerSelection();
            }
            no_players += 1;
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

    return { restartBtn, instruction }
})();



