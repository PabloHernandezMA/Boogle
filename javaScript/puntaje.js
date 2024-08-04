// Variables para manejar el puntaje
var puntajeTotal = 0; // Puntaje total del jugador

// Función para reiniciar el puntaje al finalizar el juego
function resetScore() {
    puntajeTotal = 0;
    var puntajeTotalElement = document.getElementById('puntaje-total').querySelector('p');
    if (puntajeTotalElement) {
        puntajeTotalElement.textContent = 'Puntaje total: 0';
    }
}

// Función para agregar puntaje
function addScore(wordScore) {
    // Actualizar el puntaje total
    puntajeTotal += wordScore;

    // Asegurarse de que el puntaje total se actualiza correctamente en el DOM
    var puntajeTotalElement = document.getElementById('puntaje-total').querySelector('p');
    if (puntajeTotalElement) {
        puntajeTotalElement.textContent = 'Puntaje total: ' + puntajeTotal;
    } else {
        console.error('Elemento para puntaje total no encontrado.');
    }
}

// Función para guardar el puntaje en el localStorage
function saveScore() {
    var playerName = document.getElementById('player-name-display').value;
    var fecha = new Date().toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
    var scores = JSON.parse(localStorage.getItem('scores')) || [];

    scores.push({ name: playerName, date: fecha, score: puntajeTotal });
    scores.sort((a, b) => b.score - a.score); // Ordenar por puntaje de mayor a menor

    localStorage.setItem('scores', JSON.stringify(scores));
    updateRanking();
}

// Función para actualizar el ranking en la interfaz
function updateRanking() {
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    var tbody = document.querySelector('#historial-tab tbody');
    tbody.innerHTML = '';

    scores.forEach(function(score) {
        var row = document.createElement('tr');
        var nameCell = document.createElement('td');
        var dateCell = document.createElement('td');
        var scoreCell = document.createElement('td');

        nameCell.textContent = score.name;
        dateCell.textContent = score.date;
        scoreCell.textContent = score.score;

        row.appendChild(nameCell);
        row.appendChild(dateCell);
        row.appendChild(scoreCell);
        tbody.appendChild(row);
    });
}

/* // Función para iniciar un nuevo juego
function startNewGame() {
    // Reiniciar el puntaje total
    resetScore();

    // Limpiar palabras de la partida jugada
    var wordsListElement = document.getElementById('words-list');
    if (wordsListElement) {
        wordsListElement.innerHTML = '';
    }

    // Limpiar las selecciones del tablero
    var buttons = document.querySelectorAll('.boggle-button');
    buttons.forEach(button => {
        button.classList.remove('selected', 'last-selected', 'next-selectable');
    });

    generateBoard(document.getElementById('board'), palabrasIngles);

    // Reiniciar la palabra actual y los botones seleccionados
    palabraActual = '';
    selectedButtons = [];
} */

// Inicializar el ranking al cargar la página
window.onload = updateRanking;
