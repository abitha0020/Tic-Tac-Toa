function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        player1: params.get('player1'),
        player2: params.get('player2')
    };
}

const { player1, player2 } = getQueryParams();
const playerNamesElement = document.getElementById('playerNames');
playerNamesElement.textContent = `Player 1: ${player1} (X), Player 2: ${player2} (O)`;

const boardElement = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const statusElement = document.getElementById('status');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = player1;
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.innerText = currentPlayer;

    if (checkWin()) {
        statusElement.innerText = `Player ${currentPlayer} wins!`;
        isGameActive = false;
    } else if (board.every(cell => cell !== '')) {
        statusElement.innerText = `It's a draw!`;
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        statusElement.innerText = `Player ${currentPlayer}'s turn`;
    }
};

const checkWin = () => {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return board[index] === currentPlayer;
        });
    });
};

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = player1;
    isGameActive = true;
    statusElement.innerText = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.innerText = '');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
statusElement.innerText = `Player ${currentPlayer}'s turn`;
