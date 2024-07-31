var palabrasIngles = [];
var timer;
var tiempoRestante; // Tiempo restante en segundos

// Cargar el archivo JSON
fetch('./recursos/diccionarios/english-dictionary/palabrasIngles.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        palabrasIngles = data;
    })
    .catch(function(error) {
        console.error('Error al cargar el archivo JSON:', error);
    });

// Eventos
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('cancel-game').addEventListener('click', cancelGame);
document.getElementById('validate-word').addEventListener('click', validateWord);

function startGame() {
    var playerName = document.getElementById('player-name').value;
    var gameTime = parseInt(document.getElementById('game-time').value, 10);

    if (!playerName) {
        mostrarMensaje('Por favor, ingresa tu nombre.');
        return;
    }

    document.getElementById('player-name-display').value = playerName;
    document.getElementById('game-time-display').value = gameTime + ' minutos';

    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';

    generateBoard(); // Generar el tablero después de comenzar el juego

    // Iniciar el temporizador
    iniciarTemporizador(gameTime * 60); // Convertir minutos a segundos
}

function iniciarTemporizador(segundos) {
    tiempoRestante = segundos;
    actualizarTemporizador();
    timer = setInterval(function() {
        tiempoRestante--;
        if (tiempoRestante <= 0) {
            clearInterval(timer);
            mostrarMensaje('¡El tiempo se ha acabado!');
            // Aquí puedes agregar lógica para finalizar el juego
        }
        actualizarTemporizador();
    }, 1000);
}

function actualizarTemporizador() {
    var minutos = Math.floor(tiempoRestante / 60);
    var segundos = tiempoRestante % 60;
    document.getElementById('timer-display').textContent = 
        'Tiempo restante: ' + 
        (minutos < 10 ? '0' + minutos : minutos) + ':' + 
        (segundos < 10 ? '0' + segundos : segundos);
}

function cancelGame() {
    document.getElementById('player-name').value = '';
    document.getElementById('input-word').value = '';
    document.getElementById('words-list').innerHTML = '';

    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';

    // Detener el temporizador
    if (timer) {
        clearInterval(timer);
    }
}

function generateBoard() {
    if (palabrasIngles.length === 0) {
        console.error('Las palabras no están cargadas.');
        return;
    }

    var board = document.getElementById('board');
    board.innerHTML = '';

    // Crear un tablero 4x4
    var tablero = [];
    for (var i = 0; i < 4; i++) {
        tablero.push([]);
    }

    // Seleccionar letras aleatorias para el tablero
    var letrasTablero = seleccionarLetrasAleatorias(palabrasIngles, 16);
    var index = 0;
    for (var fila = 0; fila < 4; fila++) {
        for (var col = 0; col < 4; col++) {
            var cell = document.createElement('div');
            cell.textContent = letrasTablero[index];
            cell.className = 'board-cell'; // Agregar una clase para estilizar
            board.appendChild(cell);
            index++;
        }
    }
}

function seleccionarLetrasAleatorias(lista, num) {
    var letras = [];
    for (var i = 0; i < num; i++) {
        var palabra = lista[Math.floor(Math.random() * lista.length)];
        letras.push(palabra.charAt(Math.floor(Math.random() * palabra.length)).toUpperCase());
    }
    return letras;
}

function validateWord() {
    var inputWord = document.getElementById('input-word').value.trim().toUpperCase();
    if (!inputWord) {
        mostrarMensaje('Por favor, ingresa una palabra.');
        return;
    }

    // Aquí debes llamar a la función de validación de palabra con la API
    validarPalabra(inputWord).then(function(result) {
        if (result === 'Palabra válida y añadida a la lista') {
            var wordsList = document.getElementById('words-list');
            var wordItem = document.createElement('tr');
            var wordCell = document.createElement('td');
            var scoreCell = document.createElement('td');

            wordCell.textContent = inputWord;
            scoreCell.textContent = inputWord.length; // Simple scoring by length

            wordItem.appendChild(wordCell);
            wordItem.appendChild(scoreCell);
            wordsList.appendChild(wordItem);
        }
        mostrarMensaje(result);
        document.getElementById('input-word').value = '';
    }).catch(function(error) {
        console.error('Error al validar la palabra:', error);
        mostrarMensaje('Error al validar la palabra.');
    });
}
