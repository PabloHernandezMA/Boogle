"use strict";

var palabrasIngles = [];
var timer;
var tiempoRestante; 
// Cargar el archivo JSON
fetch("./recursos/diccionarios/english-dictionary/palabrasIngles.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    palabrasIngles = data;
  })
  .catch(function (error) {
  });

function seleccionarLetrasAleatorias(lista, num) {
  var letras = [];
  for (var i = 0; i < num; i++) {
    var palabra = lista[Math.floor(Math.random() * lista.length)];
    letras.push(
      palabra.charAt(Math.floor(Math.random() * palabra.length)).toUpperCase()
    );
  }
  return letras;
}

// Función para limpiar la selección de celdas
function limpiarCeldaSeleccionada() {
  celdaSeleccionada.forEach((celda) => celda.classList.remove("selected"));
  celdaSeleccionada = [];
  var selectedLetters = [];
}

// Función para limpiar las palabras encontradas
function limpiarPalabrasEncontradas() {
  var wordsListElement = document.getElementById("words-list");
  if (wordsListElement) {
    wordsListElement.innerHTML = "";
  }
}

function generarTablero() {
  if (palabrasIngles.length === 0) {
    return;
  }
  var board = document.getElementById("board");
  board.innerHTML = "";
  var tablero = [];
  for (var i = 0; i < 4; i++) {
    tablero.push([]);
  }
  var letrasTablero = seleccionarLetrasAleatorias(palabrasIngles, 16);
  var index = 0;
  for (var fila = 0; fila < 4; fila++) {
    for (var col = 0; col < 4; col++) {
      var celda = document.createElement("div");
      celda.textContent = letrasTablero[index];
      celda.className = "board-celda"; 
      board.appendChild(celda);
      index++;
    }
  }
}

function actualizarTemporizador() {
  var minutos = Math.floor(tiempoRestante / 60);
  var segundos = tiempoRestante % 60;
  var timerDisplay = document.getElementById('timer-display');
  timerDisplay.textContent = 
    'Tiempo restante: ' + 
     (minutos < 10 ? '0' + minutos : minutos) + ':' + 
     (segundos < 10 ? '0' + segundos : segundos);   
  if (tiempoRestante <= 10) {
      timerDisplay.classList.add('restante');
    } else {
      timerDisplay.classList.remove('restante');
    }
}

function finalizarJuego() {
  var playerName = document.getElementById("player-name").value;
  // Guardar el puntaje total en el localStorage
  guardarPuntaje();
  mostrarMensaje("¡Juego terminado! Puntaje total: " + puntajeTotal);
  document.getElementById("start-screen").style.display = "flex";
  document.getElementById("game-screen").style.display = "none";
  if (timer) {
    clearInterval(timer);
  }
}

function iniciarTemporizador(segundos) {
  tiempoRestante = segundos;
  actualizarTemporizador();
  timer = setInterval(function () {
    tiempoRestante--;
    if (tiempoRestante <= 0) {
      clearInterval(timer);
      finalizarJuego();
    }
    actualizarTemporizador();
  }, 1000);
}  

function iniciarNuevoJuego() {
  var playerName = document.getElementById("player-name").value;
  if (playerName.length < 3) {
    mostrarMensaje("El nombre debe ser de minimo 3 letras");
    return;
  }
  reiniciarPuntaje();
  limpiarPalabrasEncontradas();
  var gameTime = parseInt(document.getElementById("game-time").value, 10);
  if (!playerName) {
    mostrarMensaje("Por favor, ingresa tu nombre.");
    return;
  }
  document.getElementById("player-name-display").value = playerName;
  document.getElementById("game-time-display").value = gameTime + " minutos";
  document.getElementById("input-word").value = "";
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "flex";
  document.getElementById("found-words").style.display = "flex";
  var wordsListElement = document.getElementById("words-list");
  if (wordsListElement) {
    wordsListElement.innerHTML = "";
  }
  var botones = document.querySelectorAll(".boggle-button");
  botones.forEach((button) => {
    button.classList.remove("selected", "last-selected", "next-selectable");
  });

  generarTablero();
  iniciarTemporizador(gameTime * 60); 
}

function cancelarJuego() {
  document.getElementById("player-name").value = "";
  document.getElementById("input-word").value = "";
  document.getElementById("words-list").innerHTML = "";
  document.getElementById("start-screen").style.display = "flex";
  document.getElementById("game-screen").style.display = "none";
  if (timer) {
    clearInterval(timer);
  }
}

function validarPalabraIngresada() {
  var inputWord = document
    .getElementById("input-word")
    .value.trim()
    .toUpperCase();
  if (!inputWord) {
    mostrarMensaje("Por favor, ingresa una palabra.");
    return;
  }
  validarPalabra(inputWord)
    .then(function (result) {
      if (result === "¡Sigue asi!") {
        var wordLength = inputWord.length;
        var wordScore = 0;
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
        sumarPuntos(wordScore);
        var wordsList = document.getElementById("words-list");
        var wordItem = document.createElement("tr");
        var wordcelda = document.createElement("td");
        var scorecelda = document.createElement("td");
        wordcelda.textContent = inputWord;
        scorecelda.textContent = wordScore;
        wordItem.appendChild(wordcelda);
        wordItem.appendChild(scorecelda);
        wordsList.appendChild(wordItem);
      }
      mostrarMensaje(result);
      document.getElementById("input-word").value = "";
      limpiarCeldaSeleccionada();
    })
    .catch(function (error) {
      mostrarMensaje("Error al validar la palabra.");
    });
}

// Eventos
document
  .getElementById("validate-word")
  .addEventListener("click", validarPalabraIngresada);
document.getElementById("start-game").addEventListener("click", function () {
  iniciarNuevoJuego();
  actualizarRanking();
});
document.getElementById("cancel-game").addEventListener("click", cancelarJuego);

window.onload(actualizarRanking());
