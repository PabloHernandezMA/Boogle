var palabrasEncontradas = [];
var APIdiccionario = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function validarPalabra(palabra) {
    // Convertir la palabra a minúsculas para la consistencia
    var palabraLower = palabra.toLowerCase();

    if (palabra.length < 3) {
        return "Recuerda: La palabra debe tener al menos 3 letras";
    }

    // Verificar si la palabra ya ha sido encontrada
    if (buscarEnPalabrasEncontradas(palabraLower)) {
        return "Palabra ya encontrada";
    }
    
    // Verificar si la palabra es válida mediante la API del diccionario
    var esPalabraValida = await buscarEnDiccionario(palabraLower);
    if (!esPalabraValida) {
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
