// Game Logic
const gameBoard = (() => {
    const cells = document.querySelectorAll('.game-cell');
    const startGameBtn = document.querySelector('#start');
    const entrePage = document.querySelector('.front');
    const gameBoard = document.querySelector('.game-board');
    startGameBtn.addEventListener('click', () => {
        entrePage.classList.add('d-none');
        gameBoard.classList.remove('d-none');
    });
    class player {
        constructor(name, mark) {
            this.name = name;
            this.mark = mark;
            this.fields = [];
        }
    }
    let playerOne = new player('playerOne', 'x');
    let playerTwo = new player('playerTwo', 'o');
    let playerTurn = playerOne;
    function switchTurns() {
        if(playerTurn === playerOne) {
            playerTurn = playerTwo;  
        } else {
            playerTurn = playerOne;
        }
    }
    const winCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    function hoverEffect() {
        cells.forEach(cell => {
            cell.classList.remove('hover-x');
            cell.classList.remove('hover-o');
            if(cell.innerText == '') {
                cell.classList.add(`hover-${playerTurn.mark}`);
            } else {
                return;
            }
        });
    }
    function writeIntoBoard(event) {
        if(event.innerText == '') {
            event.innerText = playerTurn.mark;
        } else {
            return;
        }
    }
    function boardHandler(event) {
        writeIntoBoard(event.target);
        switchTurns();
        hoverEffect();
    }

    cells.forEach(cell => {
        cell.addEventListener('click', boardHandler);
        hoverEffect();
    });

});
gameBoard();
