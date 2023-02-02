// Game Logic
const gameBoard = (() => {
    const cells = document.querySelectorAll('.game-cell');
    const startGameBtn = document.querySelector('#start');
    const entrePage = document.querySelector('.front');
    const gameBoard = document.querySelector('.game-board');
    const result = document.querySelector('.result');
    const winLine = document.querySelector('#win-line');
    let boardState = new Array(cells.length);
    boardState.fill();
    const clickSound = new Audio("src/sounds/click.wav");
    let note;
    startGameBtn.addEventListener('click', () => {
        entrePage.classList.add('d-none');
        gameBoard.classList.remove('d-none');
    });
    class player {
        constructor(name, mark) {
            this.name = name;
            this.mark = mark;
        }
    }
    let playerOne = new player('player One', 'x');
    let playerTwo = new player('player Two', 'o');
    let playerTurn = playerOne;
    function switchTurns() {
        if(playerTurn === playerOne) {
            playerTurn = playerTwo;  
        } else {
            playerTurn = playerOne;
        }
    }
    const winCombos = [
        {combo: [0,1,2] , classEvent: 'win-line-hor-1'},
        {combo: [3,4,5] , classEvent: 'win-line-hor-2'},
        {combo: [6,7,8] , classEvent: 'win-line-hor-3'},
        {combo: [0,3,6] , classEvent: 'win-line-ver-1'},
        {combo: [1,4,7] , classEvent: 'win-line-ver-2'},
        {combo: [2,5,8] , classEvent: 'win-line-ver-3'},
        {combo: [0,4,8] , classEvent: 'win-line-deg-1'},
        {combo: [2,4,6] , classEvent: 'win-line-deg-2'}
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
    function writeIntoBoard(cell) {
        if(cell.innerText == '') {
            cell.innerText = playerTurn.mark;
            clickSound.play();
            clickSound.currentTime = 0;
        } else {
            return;
        }
    }
    function checkForWinner() {
        for(const comboObj of winCombos) {
            let {combo , classEvent} = comboObj;
            let value1 = boardState[combo[0]];
            let value2 = boardState[combo[1]];
            let value3 = boardState[combo[2]];
            if(value1 !== undefined && value1 === value2 && value2 === value3) {
                winLine.classList.add(classEvent);
                return true;
            }
        }
    }
    function gameEnds() {
        if(checkForWinner()) {
            playerTurn === playerOne ? note = `GameOver Player ${playerTwo.name} Won!` : note = `GameOver Player ${playerOne.name} Won!`; 
            return true;
        } else if(boardState.every(cell => cell === 'x' || cell === 'o')) {
            note = `GameOver It\'s A Draw!`; 
            return true;   
        } else {
            return false;
        }
    }
    function boardHandler(event) {
        if(!boardState.includes(event.target.dataset.position)) {
            if(!gameEnds()) {
                writeIntoBoard(event.target);
                boardState[event.target.dataset.position] = playerTurn.mark;
                switchTurns();
                hoverEffect();
            }
            if(gameEnds()) {
                result.innerText = note;
            }
        } else {
            return;
        }
    }
    cells.forEach(cell => {
        cell.addEventListener('click', boardHandler);
        hoverEffect();
    });
});
gameBoard();