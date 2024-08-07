"use strict";

var puntajeTotal = 0; 

function reiniciarPuntaje() {
    puntajeTotal = 0;
    var puntajeTotalElement = document.getElementById('puntaje-total').querySelector('p');
    if (puntajeTotalElement) {
        puntajeTotalElement.textContent = 'Puntaje total: 0';
    }
}

function sumarPuntos(wordScore) {
    puntajeTotal += wordScore;
    var puntajeTotalElement = document.getElementById('puntaje-total').querySelector('p');
    if (puntajeTotalElement) {
        puntajeTotalElement.textContent = 'Puntaje total: ' + puntajeTotal;
    } else {
        
    }
}

// Función para guardar el puntaje en el localStorage
function guardarPuntaje() {
    var playerName = document.getElementById('player-name-display').value;
    var fecha = new Date().toISOString().split('T')[0];
    var puntajes = JSON.parse(localStorage.getItem('puntajes')) || [];

    puntajes.push({ name: playerName, date: fecha, score: puntajeTotal });
    puntajes.sort((a, b) => b.score - a.score);

    localStorage.setItem('puntajes', JSON.stringify(puntajes));
    actualizarRanking();
}

// Función para actualizar el ranking en la interfaz
function actualizarRanking() {
    var puntajes = JSON.parse(localStorage.getItem('puntajes')) || [];
    var tbody = document.querySelector('#historial-tab tbody');
    tbody.innerHTML = '';

    puntajes.forEach(function(score) {
        var fila = document.createElement('tr');
        var namecelda = document.createElement('td');
        var datecelda = document.createElement('td');
        var scorecelda = document.createElement('td');

        namecelda.textContent = score.name;
        datecelda.textContent = score.date;
        scorecelda.textContent = score.score;

        fila.appendChild(namecelda);
        fila.appendChild(datecelda);
        fila.appendChild(scorecelda);
        tbody.appendChild(fila);
    });
}

// Inicializar el ranking al cargar la página
window.onload = actualizarRanking;