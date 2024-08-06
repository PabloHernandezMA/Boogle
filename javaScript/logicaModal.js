"use strict";

function mostrarMensaje(mensaje) {
    var modal = document.getElementById('message-modal');
    var modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = mensaje;
    modal.style.display = 'block'; 
    var tiempoAutomatico = 2000; 
    setTimeout(function() {
        modal.style.display = 'none'; 
    }, tiempoAutomatico);
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
