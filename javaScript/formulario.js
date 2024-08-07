"use strict";

// Variables para almacenar los IDs de los elementos
var idFormulario = 'formularioContacto';
var idNombre = 'nombre';
var idCorreo = 'correo';
var idMensaje = 'mensaje';
var idErrorNombre = 'errorNombre';
var idErrorCorreo = 'errorCorreo';
var idErrorMensaje = 'errorMensaje';
var idBtnRegresar = 'btnRegresar';

// Obtener referencias a los elementos del formulario
var formulario = document.getElementById(idFormulario);
var campoNombre = document.getElementById(idNombre);
var campoCorreo = document.getElementById(idCorreo);
var campoMensaje = document.getElementById(idMensaje);
var errorNombre = document.getElementById(idErrorNombre);
var errorCorreo = document.getElementById(idErrorCorreo);
var errorMensaje = document.getElementById(idErrorMensaje);
var btnRegresar = document.getElementById(idBtnRegresar);

// Función para limpiar el formulario y los mensajes de error
function limpiarFormulario() {
    formulario.reset();
    limpiarMensajesDeError();
}

// Función para limpiar los mensajes de error
function limpiarMensajesDeError() {
    errorNombre.innerText = '';
    errorCorreo.innerText = '';
    errorMensaje.innerText = '';
}

// Función para mostrar mensajes de error
function mensajeDeError(idCampoError, valor) {
    document.getElementById(idCampoError).innerText = valor;
}

// Función para validar que el campo no esté vacío
function validarCampoLleno(campo, idCampoError) {
    if (campo.trim() === "") {
        mensajeDeError(idCampoError, "Este campo es obligatorio.");
        return false;
    }
    mensajeDeError(idCampoError, "");
    return true;
}

// Función para validar que el campo sea alfanumérico
function validarAlfanumerico(campo, idCampoError) {
    var regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(campo)) {
        mensajeDeError(idCampoError, "El campo debe ser alfanumerico.");
        return false;
    }
    return true;
}

// Función para validar el formato del correo electrónico
function validarCorreo(campo, idCampoError) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(campo)) {
        mensajeDeError(idCampoError, "El formato del correo es incorrecto.");
        return false;
    }
    return true;
}

// Función para validar la longitud del mensaje
function validarLargo(campo, idCampoError, largoEsperado) {
    if (campo.length < largoEsperado) {
        mensajeDeError(idCampoError, `El mensaje debe tener más de ${largoEsperado} letras.`);
        return false;
    }
    return true;
}

// Función para validar todo el formulario
function validarFormularioContacto(event) {
    event.preventDefault(); // Evitar que se envíe el formulario antes de la validación

    // Obtener los valores del formulario
    var nombre = campoNombre.value.trim();
    var correo = campoCorreo.value.trim();
    var mensaje = campoMensaje.value.trim();

    // Limpiar mensajes de error previos
    limpiarMensajesDeError();

    // Validar campos
    var valido = true;
    valido &= validarCampoLleno(nombre, idErrorNombre);
    valido &= validarAlfanumerico(nombre, idErrorNombre);
    valido &= validarCorreo(correo, idErrorCorreo);
    valido &= validarLargo(mensaje, idErrorMensaje, 5);

    // Si todo es válido, puedes proceder con el envío del formulario
    if (valido) {
        formulario.submit();
    }
}

// Función para redirigir al índice
function regresarAlIndex() {
    window.location.href = "../index.html";
}

// Asignar los manejadores de eventos
formulario.addEventListener("submit", validarFormularioContacto);
btnRegresar.addEventListener("click", regresarAlIndex);
