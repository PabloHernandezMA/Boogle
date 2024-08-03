// utils.js
function mostrarMensaje(mensaje) {
    var modal = document.getElementById('message-modal');
    var modalMessage = document.getElementById('modal-message');

    modalMessage.textContent = mensaje;
    modal.style.display = 'block'; 

    // Configura el tiempo para cerrar el modal automáticamente 
    var tiempoAutomatico = 2000; // 2 segundos
    setTimeout(function() {
        modal.style.display = 'none'; // Oculta el modal
    }, tiempoAutomatico);

    // Cierra el modal si se hace clic fuera del contenido del modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
