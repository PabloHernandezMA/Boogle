// Función para validar el nombre
function validarNombre(nombre) {
    var errorNombre = document.getElementById('errorNombre');
    errorNombre.textContent = '';

    if (!/^[a-zA-Z0-9 ]+$/.test(nombre)) {
        errorNombre.textContent = 'El nombre debe ser alfanumérico.';
        return false;
    }
    return true;
}

// Función para validar el correo electrónico
function validarCorreo(correo) {
    var errorCorreo = document.getElementById('errorCorreo');
    errorCorreo.textContent = '';

    if (!/\S+@\S+\.\S+/.test(correo)) {
        errorCorreo.textContent = 'El email no es válido.';
        return false;
    }
    return true;
}

// Función para validar el mensaje
function validarMensaje(mensaje) {
    var errorMensaje = document.getElementById('errorMensaje');
    errorMensaje.textContent = '';

    if (mensaje.length <= 5) {
        errorMensaje.textContent = 'El mensaje debe tener más de 5 caracteres.';
        return false;
    }
    return true;
}

// Función principal para manejar el submit
function manejarSubmit(event) {
    event.preventDefault();

    var nombre = document.getElementById('nombre').value;
    var correo = document.getElementById('correo').value;
    var mensaje = document.getElementById('mensaje').value;

    var esValido = validarNombre(nombre) && validarCorreo(correo) && validarMensaje(mensaje);

    if (esValido) {
        // Abrir la herramienta de envío de emails predeterminada del sistema operativo
        var enlaceMailto = `mailto:?subject=Contacto&body=Nombre: ${nombre}%0A%0AMensaje:%0A${mensaje}`;
        window.location.href = enlaceMailto;
    }
}

// Escuchar el evento submit del formulario
document.getElementById('formularioContacto').addEventListener('submit', manejarSubmit);
