// function mostrarMensaje(mensaje) {
//     var messageContainer = document.getElementById('message-container');
//     messageContainer.textContent = mensaje;
// }

// utils.js
function mostrarMensaje(mensaje) {
    var modal = document.getElementById('message-modal');
    var modalMessage = document.getElementById('modal-message');
    var closeButton = document.querySelector('.close-button');

    modalMessage.textContent = mensaje;
    modal.style.display = 'block'; // Muestra el modal

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none'; // Oculta el modal
    });

    // Cierra el modal si se hace clic fuera del contenido del modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

