// module (factory in IIFE)
const gameboard = (()=>{
    const board = [];
    const displayBoard = document.querySelectorAll('.square');
    const fillBoard = displayBoard.forEach(button => {
        button.innerText = 'X';
    })
    // return methods
    return {fillBoard, score, scoreBoard};
})();
const scoreBoard = (()=> {
    const score = () => {

    }
    const overallScore = () => {

    }
    return {score, overallScore};
})();

const displayController = (() => {
    
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