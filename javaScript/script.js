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
document.getElementById('validate-word').addEventListener('click', validateWord);
document.getElementById('start-game').addEventListener('click', function() {
    startGame();
    updateRanking(); // Mover esta llamada si también se usa en el inicio del juego
});

document.getElementById('cancel-game').addEventListener('click', cancelGame);


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
    document.getElementById('game-screen').style.display = 'flex';
    document.getElementById('found-words').style.display = 'flex';

    generateBoard(); // Generar el tablero después de comenzar el juego

    // Iniciar el temporizador
    iniciarTemporizador(gameTime * 60); // Convertir minutos a segundos
}

function finalizarJuego() {
    // Guardar el puntaje y actualizar el ranking al finalizar el juego
    saveScore();

    // Mostrar mensaje de fin de juego y reiniciar el estado del juego
    mostrarMensaje('¡El tiempo se ha acabado!');
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
    
    // Reiniciar puntaje total
    puntajeTotal = 0;
    document.getElementById('puntaje-total').querySelector('p').textContent = 'Puntaje total: 0';
}

// Asegúrate de llamar a finalizarJuego en el temporizador
function iniciarTemporizador(segundos) {
    tiempoRestante = segundos;
    actualizarTemporizador();
    timer = setInterval(function() {
        tiempoRestante--;
        if (tiempoRestante <= 0) {
            clearInterval(timer);
            finalizarJuego(); // Llama a finalizarJuego cuando el tiempo se acabe
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
            var wordLength = inputWord.length;
            var wordScore = 0;

            // Asignar puntaje según la longitud de la palabra
            if (wordLength === 3 || wordLength === 4) {
                wordScore = 1;
            } else if (wordLength === 5) {
                wordScore = 2;
            } else if (wordLength === 6) {
                wordScore = 3;
            } else if (wordLength === 7) {
                wordScore = 5;
            } else if (wordLength >= 8) {
                wordScore = 11;
            }

            // Llamar a la función de puntaje en puntaje.js
            addScore(wordScore);

            var wordsList = document.getElementById('words-list');
            var wordItem = document.createElement('tr');
            var wordCell = document.createElement('td');
            var scoreCell = document.createElement('td');

            wordCell.textContent = inputWord;
            scoreCell.textContent = wordScore;

            wordItem.appendChild(wordCell);
            wordItem.appendChild(scoreCell);
            wordsList.appendChild(wordItem);
        }
        mostrarMensaje(result);
        
        // Limpiar el campo de texto después de la validación
        document.getElementById('input-word').value = '';

        // Limpiar la selección de celdas
        clearSelectedCells();
    }).catch(function(error) {
        console.error('Error al validar la palabra:', error);
        mostrarMensaje('Error al validar la palabra.');
    });
}


// Dentro de la función finalizarJuego
function finalizarJuego() {
    // Guardar el puntaje y actualizar el ranking al finalizar el juego
    saveScore();

    // Mostrar mensaje de fin de juego y reiniciar el estado del juego
    mostrarMensaje('¡El tiempo se ha acabado!');
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
    
    // Reiniciar puntaje total
    resetScore();
}


    // Función para limpiar la selección de celdas
    function clearSelectedCells() {
        selectedCells.forEach(cell => cell.classList.remove('selected'));
        selectedCells = [];
        selectedLetters = [];
    }
