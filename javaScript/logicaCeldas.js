// Variables globales para gestionar el estado de la selección
let selectedCells = [];
let selectedLetters = [];

// Función para manejar el clic en una celda
function handleCellClick(event) {
    const cell = event.target;

    if (cell.classList.contains('board-cell')) {
        // Añadir o quitar la celda de la selección
        if (selectedCells.includes(cell)) {
            deselectCell(cell);
        } else {
            selectCell(cell);
        }
    }
}

// Función para seleccionar una celda
function selectCell(cell) {
    cell.classList.add('selected');
    selectedCells.push(cell);
    selectedLetters.push(cell.textContent);

    // Actualizar el campo de texto con las letras seleccionadas
    document.getElementById('input-word').value = selectedLetters.join('');

    // Pintar las celdas continuas
    paintContinuousCells(cell);
}

// Función para deseleccionar una celda
function deselectCell(cell) {
    cell.classList.remove('selected');
    const index = selectedCells.indexOf(cell);
    if (index !== -1) {
        selectedCells.splice(index, 1);
        selectedLetters.splice(index, 1);
    }

    // Actualizar el campo de texto con las letras restantes
    document.getElementById('input-word').value = selectedLetters.join('');
}

// Función para pintar las celdas continuas
function paintContinuousCells(cell) {
    // Resetear el color de las celdas antes de pintar las nuevas
    document.querySelectorAll('.board-cell').forEach(c => c.classList.remove('continuous'));

    // Obtener la posición de la celda seleccionada
    const index = Array.from(cell.parentElement.children).indexOf(cell);
    const row = Math.floor(index / 4);
    const col = index % 4;

    // Función recursiva para buscar celdas continuas
    function searchCells(r, c) {
        const currentIndex = r * 4 + c;
        const currentCell = document.querySelector(`.board-cell:nth-child(${currentIndex + 1})`);
        if (!currentCell || currentCell.classList.contains('continuous')) return;

        currentCell.classList.add('continuous');
        selectedCells.forEach(selectedCell => {
            const selectedIndex = Array.from(selectedCell.parentElement.children).indexOf(selectedCell);
            const sr = Math.floor(selectedIndex / 4);
            const sc = selectedIndex % 4;

            // Verificar si la celda está adyacente
            if (Math.abs(sr - r) <= 1 && Math.abs(sc - c) <= 1) {
                searchCells(sr, sc);
            }
        });
    }

    searchCells(row, col);
}

// Función para inicializar el juego
function initializeGame() {
    const board = document.getElementById('board');
    board.addEventListener('click', handleCellClick);
}

// Inicializar el juego
initializeGame();
