var palabrasEncontradas = [];
var APIdiccionario = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function validarPalabra(palabra) {
    // Convertir la palabra a minúsculas para la consistencia
    var palabraLower = palabra.toLowerCase();

    if (palabra.length < 3) {
        penalizarTiempo() 
        return "Recuerda: La palabra debe tener al menos 3 letras";
    }

    // Verificar si la palabra ya ha sido encontrada
    if (buscarEnPalabrasEncontradas(palabraLower)) {
        penalizarTiempo() 
        return "Palabra ya encontrada";
    }
    
    // Verificar si la palabra es válida mediante la API del diccionario
    var esPalabraValida = await buscarEnDiccionario(palabraLower);
    if (!esPalabraValida) {
        penalizarTiempo() 
        return "Esa palabra no existe";
    }

    // Agregar la palabra a la lista de palabras encontradas
    palabrasEncontradas.push(palabraLower);
    return "¡Sigue asi!";
}

function buscarEnPalabrasEncontradas(palabra) {
    // Comprobar si la palabra está en el array
    return palabrasEncontradas.includes(palabra);
}

async function buscarEnDiccionario(palabra) {
    try {
        // Hacer la solicitud a la API del diccionario
        var response = await fetch(APIdiccionario + palabra);
        if (!response.ok) {
            throw new Error("Palabra no encontrada");
        }
        var data = await response.json();
        // Devolver true si se encuentran resultados
        return data.length > 0;
    } catch (error) {
        // Devolver false en caso de error
        return false;
    }
}

function penalizarTiempo() {
    tiempoRestante -= 2;
    if (tiempoRestante < 0) {
        tiempoRestante = 0;
    }
    actualizarTemporizador();

    // Cambiar el color del temporizador a rojo
    var timerDisplay = document.getElementById('timer-display');
    timerDisplay.classList.add('penalizado');

    // Quitar el color rojo después de 2 segundos
    setTimeout(function() {
        timerDisplay.classList.remove('penalizado');
    }, 2000);
}

