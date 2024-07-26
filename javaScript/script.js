document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('cancel-game').addEventListener('click', cancelGame);
document.getElementById('validate-word').addEventListener('click', validateWord);

const boardLetters = [
    'A', 'B', 'C', 'D',
    'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P'
];

function startGame() {
    const playerName = document.getElementById('player-name').value;
    const gameTime = document.getElementById('game-time').value;

    if (!playerName) {
        alert('Por favor, ingresa tu nombre.');
        return;
    }

    document.getElementById('player-name-display').value = playerName;
    document.getElementById('game-time-display').value = `${gameTime} minutos`;

    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';

    generateBoard();
}

function cancelGame() {
    document.getElementById('player-name').value = '';
    document.getElementById('input-word').value = '';
    document.getElementById('words-list').innerHTML = '';

    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';
}

function generateBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';

    boardLetters.forEach(letter => {
        const cell = document.createElement('div');
        cell.textContent = letter;
        board.appendChild(cell);
    });
}

function validateWord() {
    const inputWord = document.getElementById('input-word').value.trim().toUpperCase();
    if (!inputWord) {
        alert('Por favor, ingresa una palabra.');
        return;
    }

    const wordsList = document.getElementById('words-list');
    const wordItem = document.createElement('tr');
    const wordCell = document.createElement('td');
    const scoreCell = document.createElement('td');

    wordCell.textContent = inputWord;
    scoreCell.textContent = inputWord.length; // Simple scoring by length

    wordItem.appendChild(wordCell);
    wordItem.appendChild(scoreCell);
    wordsList.appendChild(wordItem);

    document.getElementById('input-word').value = '';
}
