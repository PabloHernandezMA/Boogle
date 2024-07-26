var palabrasEncontradas = [];
var APIdiccionario = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function validarPalabra(palabra) {
    if (buscarEnPalabrasEncontradas(palabra)) {
        return "Palabra ya encontrada";
    }
    
    var esPalabraValida = await buscarEnDiccionario(palabra);
    if (!esPalabraValida) {
        return "El texto ingresado no se reconoce como palabra valida";
    }

    palabrasEncontradas.push(palabra);
    return "Palabra válida y añadida a la lista";
}

function buscarEnPalabrasEncontradas(palabra) {
    return palabrasEncontradas.includes(palabra.toLowerCase());
}

async function buscarEnDiccionario(palabra) {
    try {
        var response = await fetch(APIdiccionario + palabra.toLowerCase());
        if (!response.ok) {
            throw new Error("Palabra no encontrada");
        }
        var data = await response.json();
        return data.length > 0;
    } catch (error) {
        return false;
    }
}

// Ejemplo de uso
(async () => {
    console.log(await validarPalabra("example")); // "Palabra válida y añadida a la lista"
    console.log(await validarPalabra("example")); // "Palabra ya encontrada"
    console.log(await validarPalabra("xyzabc")); // "El texto ingresado no se reconoce como palabra valida"
})();
