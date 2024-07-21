document.getElementById('formularioContacto').addEventListener('submit', function(event) {
    event.preventDefault();

    var nombre = document.getElementById('nombre').value;
    var correo = document.getElementById('correo').value;
    var mensaje = document.getElementById('mensaje').value;

    var errorNombre = document.getElementById('errorNombre');
    var errorCorreo = document.getElementById('errorCorreo');
    var errorMensaje = document.getElementById('errorMensaje');

    errorNombre.textContent = '';
    errorCorreo.textContent = '';
    errorMensaje.textContent = '';

    var esValido = true;

    // Validación del nombre (alfanumérico)
    if (!/^[a-zA-Z0-9 ]+$/.test(nombre)) {
        errorNombre.textContent = 'El nombre debe ser alfanumérico.';
        esValido = false;
    }

    // Validación del email
    if (!/\S+@\S+\.\S+/.test(correo)) {
        errorCorreo.textContent = 'El email no es válido.';
        esValido = false;
    }

    // Validación del mensaje (más de 5 caracteres)
    if (mensaje.length <= 5) {
        errorMensaje.textContent = 'El mensaje debe tener más de 5 caracteres.';
        esValido = false;
    }

    if (esValido) {
        // Abrir la herramienta de envío de emails predeterminada del sistema operativo
        var enlaceMailto = `mailto:?subject=Contacto&body=Nombre: ${nombre}%0A%0AMensaje:%0A${mensaje}`;
        window.location.href = enlaceMailto;
    }
});
