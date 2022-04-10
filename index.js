// module (factory in IIFE)
const gameboard = (() => {
    const winning_board = [
        [1,2,3], [4,5,6], [7,8,9],
        [1,4,7], [2,5,8], [3,6,9],
        [1,5,9], [3,5,7]
    ]
    let board = [];
    const check_winner = () => {
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
    const clear_gameboard = () => {
        board = [];
        displayController.squares_enabled(true);

    }
    const computer_move = (player) => {
        const o_square = 'O';
        const x_square = 'X';
        // generate random number and check if square is filled
        let random_no = 0;
        while (true){
            // random number between 1-9
            random_no = Math.floor(Math.random() * 9) + 1;
            if (!board.includes(random_no)){
                break;
            }
        }
        const random_square = document.getElementById(random_no.toString());
        if (player === player_one){
            random_square.innerText = x_square;
        }else{
            random_square.innerText = o_square;
        }
        board.push(random_no);
        player.updatePlayerMove(random_no);
    }
    const updateBoard = (e) => {
        const square = document.getElementById(e.target.id);
        const o_square = 'O';
        const x_square = 'X';
        // second player
        if (board.length % 2 && square.innerText === '') {
            board.push(parseInt(e.target.id));
            player_two.updatePlayerMove(e.target.id);
            square.innerText = o_square;
            
            if (player_one.getName().includes("Computer")){
                computer_move(player_one);
            }
        }
        // first player
        else if (square.innerText === '') {
            board.push(parseInt(e.target.id));
            player_one.updatePlayerMove(e.target.id);
            square.innerText = x_square;

            if (player_two.getName().includes("Computer")){
                computer_move(player_two);
            }
        }
        // check winning condition after every turn
        result = check_winner();
        if (result.game_complete) {
            if (result.winner.includes("DRAW")){
                displayController.instruction.innerText = result.winner;
                scoreBoard.current_score();
            }else{
                scoreBoard.updateScore(result.winner);
                displayController.instruction.innerText = result.winner + " IS THE WINNER!";
            }
            displayController.squares_enabled(false);
            displayController.show_end_game_controllers(true);

        };
    };
    const squares = document.querySelectorAll('.square');
    squares.forEach(button => {
        button.addEventListener('click', updateBoard);
    });
    return { board, clear_gameboard, computer_move }
})();
const scoreBoard = (() => {
    let score = [];
    // retrieve stored session
    const loadScores = () => {
        if (localStorage.getItem('Score') !== null){
            score = JSON.parse(localStorage.getItem('Score'));
        }
    }
    // need to fix this issue
    const updateScore = (p_name) => {
        loadScores();
        console.log(score);
        if (score.length == 0 || score.find(x => x.name  === p_name)){
            score[score.findIndex(x => x.name === p_name)].score += 1;
        }
        else
        {
            score.push({
                name: p_name,
                score: 1,
            })
        }
        localStorage.setItem('Score', JSON.stringify(score));
        current_score();
    }

    const current_score = () => {
        p1_score_index = score.findIndex(x=>x.name === player_one.getName());
        p1_score = 0;
        if (p1_score_index !== -1){
            p1_score = score[p1_score_index].score;
        }
        else{
            p1_score = 0;
        }
        p2_score_index = score.findIndex(x=>x.name === player_two.getName());
        p2_score = 0;
        if (p2_score_index !== -1){
            p2_score = score[p2_score_index].score;
        }
        else{
            p2_score = 0;
        }
        displayController.scoreBoard.innerText = player_one.getName() + ": " + p1_score + 
                                        " VS " + player_two.getName() + ": " + p2_score;
    }

    const scoreBtn = document.querySelector('.scoreBtn');
    scoreBtn.addEventListener('click', score);
    return { score, loadScores, updateScore, current_score };
})();


// player
const Player = () => {
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
    const clearPlayerMoves = () => {
        playerMoves = [];
    }
    // return methods
    return {
        getName, setName,
        get_player_moves, updatePlayerMove, clearPlayerMoves
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
    const gameBoardDiv = document.querySelector('.gameBoard');
    const resetBtn = document.querySelector('.resetBtn');
    const restartBtn = document.querySelector('.restartBtn');
    const scoreBoard = document.querySelector('.score');
    const scoreBtn = document.querySelector('.scoreBtn');
    const squares = document.querySelectorAll('.square');

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
        gameBoardDiv.style.display = 'block';
        if (player_one.getName().includes("Computer")){
            gameboard.computer_move(player_one);
        }
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
    
    const show_end_game_controllers = (bool) => {
        if (bool){
            scoreBtn.style.display = 'unset';
            restartBtn.style.display = 'unset';
        }else{
            scoreBtn.style.display = 'none';
            restartBtn.style.display = 'none';
        }
    }
    
    const squares_enabled = (bool) => {
        if (bool){
            squares.forEach(btn => {
                btn.innerText = '';
                btn.disabled = false;
            })
        }else{
            squares.forEach(btn => {
                btn.disabled = true;
            })
        }
    }

    const restartGame = () => {
        show_end_game_controllers(false);
        // clear gameboard
        gameboard.clear_gameboard();
        squares_enabled(true);
        // hide score text and instruction
        scoreBoard.innerText = '';
        instruction.innerText = '';
        player_one.clearPlayerMoves();
        player_two.clearPlayerMoves();
    }

    playerBtn.addEventListener('click', select_player_type);
    computerBtn.addEventListener('click', select_computer_type);
    playerNameBtn.addEventListener('click', enter_player_name);
    resetBtn.addEventListener('click', refreshPage);
    restartBtn.addEventListener('click', restartGame);


    return { restartBtn, instruction, scoreBoard, squares, show_end_game_controllers, squares_enabled }
})();



