var palabrasEncontradas = [];
var APIdiccionario = "https://api.dictionaryapi.dev/api/v2/entries/en/";

function buscarEnPalabrasEncontradas(palabra) {
    return palabrasEncontradas.includes(palabra);
}
async function buscarEnDiccionario(palabra) {
    try {
        // Hacer la solicitud a la API del diccionario
        var respuesta = await fetch(APIdiccionario + palabra);
        if (!respuesta.ok) {
            throw new Error("Palabra no encontrada");
        }
        var data = await respuesta.json();
        return data.length > 0;
    } catch (error) {
        return false;
    }
}

function penalizarTiempo() {
    tiempoRestante -= 2;
    if (tiempoRestante < 0) {
        tiempoRestante = 0;
    }
    actualizarTemporizador();
    var timerDisplay = document.getElementById('timer-display');
    timerDisplay.classList.add('penalizado');
    setTimeout(function() {
        timerDisplay.classList.remove('penalizado');
    }, 2000);
}

async function validarPalabra(palabra) {
    var palabraLower = palabra.toLowerCase();
    if (palabra.length < 3) {
        penalizarTiempo()
        limpiarceldaSeleccionada()
        return "Recuerda: La palabra debe tener al menos 3 letras";
    }
    if (buscarEnPalabrasEncontradas(palabraLower)) {
        penalizarTiempo() 
        limpiarceldaSeleccionada()
        return "Palabra ya encontrada";
    }
    var esPalabraValida = await buscarEnDiccionario(palabraLower);
    if (!esPalabraValida) {
        penalizarTiempo()
        limpiarceldaSeleccionada()
        return "Esa palabra no existe";
    }
    palabrasEncontradas.push(palabraLower);
    limpiarceldaSeleccionada()
    return "¡Sigue asi!";
}

