"use strict";

var celdaSeleccionada = [];
var ultimaCeldaSeleccionada = null;
var tamañoTablero = 4;

document.addEventListener("DOMContentLoaded", iniciarJuego);

function actualizarCeldasSeleccionables(ultimaCeldaIdx) {
  document.querySelectorAll(".board-celda").forEach(function (celda) {
    celda.classList.remove("selectable");
  });

  if (!ultimaCeldaSeleccionada) {
    document.querySelectorAll(".board-celda").forEach(function (celda) {
      celda.classList.add("selectable");
    });
    return;
  }

  var fila = Math.floor(ultimaCeldaIdx / tamañoTablero);
  var col = ultimaCeldaIdx % tamañoTablero;
  var posicionesAdyacentes = [
    { fila: fila - 1, col: col },
    { fila: fila + 1, col: col },
    { fila: fila, col: col - 1 },
    { fila: fila, col: col + 1 },
    { fila: fila - 1, col: col - 1 },
    { fila: fila - 1, col: col + 1 },
    { fila: fila + 1, col: col - 1 },
    { fila: fila + 1, col: col + 1 },
  ];

  posicionesAdyacentes.forEach(function (pos) {
    if (pos.fila >= 0 && pos.fila < tamañoTablero && pos.col >= 0 && pos.col < tamañoTablero) {
      var adjacentIdx = pos.fila * tamañoTablero + pos.col;
      var celdaAdyacente = document.querySelectorAll(".board-celda")[adjacentIdx];
      if (!celdaSeleccionada.includes(celdaAdyacente)) {
        celdaAdyacente.classList.add("selectable");
      }
    }
  });
}

function actualizarPalabraActual() {
  var letrasSeleccionadas = celdaSeleccionada.map(function (celda) {
    return celda.textContent;
  });
  document.getElementById("input-word").value = letrasSeleccionadas.join("");
}

function iniciarJuego() {
  var board = document.getElementById("board");
  board.addEventListener("click", manejarClickCeldas);
}

function manejarClickCeldas(event) {
  var celda = event.target;
  if (!celda.classList.contains("board-celda")) {
    return;
  }
  var idx = Array.from(celda.parentElement.children).indexOf(celda);

  if (celda === ultimaCeldaSeleccionada) {
    celda.classList.remove("selected", "last-selected");
    celdaSeleccionada.pop();
    ultimaCeldaSeleccionada = celdaSeleccionada.length > 0 ? celdaSeleccionada[celdaSeleccionada.length - 1] : null;
    if (ultimaCeldaSeleccionada) {
      ultimaCeldaSeleccionada.classList.add("last-selected");
    }
    actualizarCeldasSeleccionables(idx);
    actualizarPalabraActual();
    return;
  }

  if (celdaSeleccionada.length > 0 && !celda.classList.contains("selectable")) {
    return;
  }

  celda.classList.add("selected", "last-selected");
  celdaSeleccionada.push(celda);
  if (ultimaCeldaSeleccionada) {
    ultimaCeldaSeleccionada.classList.remove("last-selected");
  }
  ultimaCeldaSeleccionada = celda;
  actualizarCeldasSeleccionables(idx);
  actualizarPalabraActual();

  if (!sonCeldasAdyacentes(celdaSeleccionada)) {
    mostrarMensaje("Las celdas seleccionadas no son adyacentes.", true, 3000);
    limpiarceldaSeleccionada();
  }
}

function sonCeldasAdyacentes(celdas) {
  for (var i = 0; i < celdas.length - 1; i++) {
    var idx1 = Array.from(celdas[i].parentElement.children).indexOf(celdas[i]);
    var idx2 = Array.from(celdas[i + 1].parentElement.children).indexOf(celdas[i + 1]);
    if (!sonAdyacentes(idx1, idx2)) {
      return false;
    }
  }
  return true;
}

function sonAdyacentes(idx1, idx2) {
  var fila1 = Math.floor(idx1 / tamañoTablero);
  var col1 = idx1 % tamañoTablero;
  var fila2 = Math.floor(idx2 / tamañoTablero);
  var col2 = idx2 % tamañoTablero;
  var filaDiff = Math.abs(fila1 - fila2);
  var colDiff = Math.abs(col1 - col2);
  return (filaDiff <= 1 && colDiff <= 1);
}

function limpiarceldaSeleccionada() {
  celdaSeleccionada.forEach(function (celda) {
    celda.classList.remove("selected", "last-selected");
  });
  celdaSeleccionada = [];
  ultimaCeldaSeleccionada = null;
  actualizarCeldasSeleccionables();
}
