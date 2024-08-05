// Variables globales para gestionar el estado de la selección
var selectedCells = [];
var lastSelectedCell = null;

// Función para manejar el clic en una celda
function handleCellClick(event) {
  var cell = event.target;
  
  // Asegurarse de que solo se ejecuta si se hace clic en una celda
  if (!cell.classList.contains("board-cell")) {
    return;
  }

  var idx = Array.from(cell.parentElement.children).indexOf(cell);

  // Verificar si la celda ya está seleccionada para deseleccionarla
  if (selectedCells.includes(cell)) {
    cell.classList.remove("selected");
    cell.classList.remove("last-selected");
    selectedCells = selectedCells.filter(function (selectedCell) {
      return selectedCell !== cell;
    });
    lastSelectedCell =
      selectedCells.length > 0 ? selectedCells[selectedCells.length - 1] : null;

    if (lastSelectedCell) {
      lastSelectedCell.classList.add("last-selected");
    }
    updateSelectableCells(idx);
    updateCurrentWord();
    return;
  }

  // Verificar si la celda es seleccionable
  if (selectedCells.length > 0 && !cell.classList.contains("selectable")) {
    return;
  }

  cell.classList.add("selected");
  selectedCells.push(cell);

  if (lastSelectedCell) {
    lastSelectedCell.classList.remove("last-selected");
  }

  cell.classList.add("last-selected");
  lastSelectedCell = cell;

  updateSelectableCells(idx);
  updateCurrentWord();

  // Verificar si las celdas seleccionadas son adyacentes
  if (!areCellsAdjacent(selectedCells)) {
    mostrarMensaje("Las celdas seleccionadas no son adyacentes.", true, 3000);
    clearSelectedCells(); // Limpiar selección
  }
}

// Función para actualizar las celdas seleccionables
function updateSelectableCells(lastSelectedIdx) {
  var SIZE = 4;
  document.querySelectorAll(".board-cell").forEach(function (cell) {
    cell.classList.remove("selectable");
  });

  if (!lastSelectedCell) {
    document.querySelectorAll(".board-cell").forEach(function (cell) {
      cell.classList.add("selectable");
    });
    return;
  }

  var row = Math.floor(lastSelectedIdx / SIZE);
  var col = lastSelectedIdx % SIZE;

  var positions = [
    { row: row - 1, col: col },
    { row: row + 1, col: col },
    { row: row, col: col - 1 },
    { row: row, col: col + 1 },
    { row: row - 1, col: col - 1 },
    { row: row - 1, col: col + 1 },
    { row: row + 1, col: col - 1 },
    { row: row + 1, col: col + 1 },
  ];

  positions.forEach(function (pos) {
    if (pos.row >= 0 && pos.row < SIZE && pos.col >= 0 && pos.col < SIZE) {
      var adjacentIdx = pos.row * SIZE + pos.col;
      var adjacentCell = document.querySelectorAll(".board-cell")[adjacentIdx];
      if (!selectedCells.includes(adjacentCell)) {
        adjacentCell.classList.add("selectable");
      }
    }
  });
}

// Función para actualizar la palabra actual en el campo de texto
function updateCurrentWord() {
  var selectedLetters = selectedCells.map(function (cell) {
    return cell.textContent;
  });
  document.getElementById("input-word").value = selectedLetters.join("");
}

// Función para inicializar el juego
function initializeGame() {
  var board = document.getElementById("board");
  board.addEventListener("click", handleCellClick);
}

// Inicializar el juego
initializeGame();
