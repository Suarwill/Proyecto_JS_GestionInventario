window.onload = bienvenida;
function cerrarVentanas() {
        var bienvenidaSection = document.getElementById("bienvenida");
        if (bienvenidaSection.style.display === "block") {
            bienvenidaSection.style.display = "none";
        }
        var buscadorSection = document.getElementById("buscador");
        if (buscadorSection.style.display === "block") {
            buscadorSection.style.display = "none";
        }
        var inventarioSection = document.getElementById("inventario");
        if (inventarioSection.style.display === "block") {
            inventarioSection.style.display = "none";
        }    
        var modificadorSection = document.getElementById("modificador");
        if (modificadorSection.style.display === "block") {
            modificadorSection.style.display = "none";
        }    
        var nosotrosSection = document.getElementById("nosotros");
        if (nosotrosSection.style.display === "block") {
            nosotrosSection.style.display = "none";
        }
}
function bienvenida() {
    var bienvenidaSection = document.getElementById("bienvenida");
        cerrarVentanas()
    bienvenidaSection.style.display = bienvenidaSection.style.display === "none" ? "block" : "none";
}
// Funciones de Busqueda
function buscador() {
    var buscadorSection = document.getElementById("buscador");
        cerrarVentanas()
    buscadorSection.style.display = buscadorSection.style.display === "none" ? "block" : "none";
}
function realizarBusqueda() {
    var palabraClave = document.getElementById('palabraClave').value
    var elementosGuardados = JSON.parse(localStorage.getItem('elementos')) || []
    var resultados = elementosGuardados.filter(function (elemento) {
        return (
            elemento.codigo.toLowerCase().includes(palabraClave.toLowerCase()) ||
            elemento.descripcion.toLowerCase().includes(palabraClave.toLowerCase())
        )
    })
    resultados.forEach(function (resultado) {
        console.log('Código:', resultado.codigo, 'Precio: $', resultado.precio)
    })
    var resultadosDiv = document.getElementById('resultadosBusqueda');
    resultadosDiv.innerHTML = '' // Limpiar resultados anteriores
    if (resultados.length > 0) {
    var listaResultados = document.createElement('ul')
        resultados.forEach(function (resultado) {
            var listItem = document.createElement('li')
            listItem.textContent = 'Descripción: ' + resultado.descripcion + ', Código: ' + resultado.codigo + ', Precio: $' + resultado.precio;
            listaResultados.appendChild(listItem)
        })
        resultadosDiv.appendChild(listaResultados)
    } else {
        resultadosDiv.textContent = 'No se encontraron resultados.'
    }
}
// Mostrar la Opcion de MODIFICAR, bajo Contraseña
(function() {
    var claveIngreso = 11910510810810597109;
    function modificar() {
        var clave = prompt("Ingrese la contraseña de Acceso:");
        Acceso = converterText(clave)
        if (claveIngreso == Acceso) {
            modificarInventario();
        } else {
            console.log("Acceso denegado a la modificación.");
        }
    }
    function converterText(clave) {
        var decimal = '';
        for (var i = 0; i < clave.length; i++) {
            var charCode = clave.charCodeAt(i);
            decimal += charCode.toString();
        }
        return parseInt(decimal, 10);
    }
    window.modificar = modificar;
})();
function modificarInventario() {
    var modifSection = document.getElementById("modificador");
    cerrarVentanas();
    modifSection.style.display = modifSection.style.display === "none" ? "block" : "none";
}
function nosotros() {
    var nosotrosSection = document.getElementById("nosotros");
        cerrarVentanas()
    nosotrosSection.style.display = nosotrosSection.style.display === "none" ? "block" : "none";
}
// Sistema CRUD
function createElemento() {
    var codigo = document.getElementById("codigo").value;
    var descripcion = document.getElementById("descripcion").value;
    var precio = document.getElementById("precio").value;
    var elemento = {
        codigo: codigo,
        descripcion: descripcion,
        precio: precio,
    };
    var elementosGuardados = JSON.parse(localStorage.getItem('elementos')) || [];
    elementosGuardados.push(elemento);
    localStorage.setItem('elementos', JSON.stringify(elementosGuardados));
    console.log('Elemento agregado:', elemento);
    alert("Agregado al inventario")
}
function mostrarInventario() {
    var inventarioSection = document.getElementById("inventario");
        cerrarVentanas();
    inventarioSection.style.display = inventarioSection.style.display === "none" ? "block" : "none";
    var tablaElementosSection = document.getElementById("tablaElementos");
    tablaElementosSection.style.display = "block";
    // Llenar tabla de elementos
    var tablaBody = document.getElementById("tablaBodyElementos");
    tablaBody.innerHTML = ""; // Limpiar contenido previo
    var elementosGuardados = JSON.parse(localStorage.getItem('elementos')) || [];
    //Ordenar
    elementosGuardados.sort(function(a, b) {
        var codigoA = a.codigo.toLowerCase();
        var codigoB = b.codigo.toLowerCase();
        var numeroA = parseFloat(codigoA);
        var numeroB = parseFloat(codigoB);
        if (!isNaN(numeroA) && !isNaN(numeroB)) {
            return numeroA - numeroB;
        } else {
            if (codigoA < codigoB) {
                return -1;
            } else if (codigoA > codigoB) {
                return 1;
            } else {
                return 0;
            }
        }
    });
    elementosGuardados.forEach(function (elemento) {
    var row = tablaBody.insertRow();
    var cellCodigo = row.insertCell(0);
    var cellDescripcion = row.insertCell(1);
    var cellPrecio = row.insertCell(2);
        cellCodigo.innerHTML = elemento.codigo;
        cellDescripcion.innerHTML = elemento.descripcion;
        cellPrecio.innerHTML = elemento.precio;
    })
}
function updateElemento() {
    var codigo = document.getElementById("codigoUpdate").value;
    var nuevaDescripcion = document.getElementById("nuevaDescripcion").value;
    var nuevoPrecio = document.getElementById("nuevoPrecio").value;
    var elementosGuardados = JSON.parse(localStorage.getItem('elementos')) || [];
    // BUSCAR 
    var indice = -1;
    for (var i = 0; i < elementosGuardados.length; i++) {
        if (elementosGuardados[i].codigo === codigo) {
            indice = i;
            break;
        }
    }
    // ACTUALIZAR el elemento
    if (indice !== -1) {
        elementosGuardados[indice].descripcion = nuevaDescripcion;
        elementosGuardados[indice].precio = nuevoPrecio;
        // Actualizar el array
        localStorage.setItem('elementos', JSON.stringify(elementosGuardados));
        console.log('Elemento actualizado:', elementosGuardados[indice]);
    } else {
        console.log('Elemento no encontrado:', codigo);
    }
}
function deleteElemento() {
    var codigo = document.getElementById("codigoDelete").value;
    var elementosGuardados = JSON.parse(localStorage.getItem('elementos')) || [];
    // BUSCAR 
    var indice = -1;
    for (var i = 0; i < elementosGuardados.length; i++) {
        if (elementosGuardados[i].codigo === codigo) {
            indice = i;
            break;
        }
    }
    // ELIMINAR el elemento
    if (indice !== -1) {
        elementosGuardados.splice(indice, 1);
        // Actualizar el array
        localStorage.setItem('elementos', JSON.stringify(elementosGuardados));
        console.log('Elemento eliminado:', codigo);
    } else {
        console.log('Elemento no encontrado:', codigo);
    }
}
// Importacion y Exportacion de los Datos del LocalStorage
function exportarDatosComoJSON() {
    var datos = localStorage.getItem('elementos');
    if (datos) {
        var datosObjeto = JSON.parse(datos);
        var datosJSON = JSON.stringify(datosObjeto, null, 2);
        var blob = new Blob([datosJSON], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        var nombreArchivo = 'datosAlmacenados.json';
        a.download = nombreArchivo;
        a.click();
            URL.revokeObjectURL(a.href);
    } else {
        console.log('No hay datos para exportar.');
    }
}
function seleccionarArchivo() {
    document.getElementById('inputArchivo').click();
}
function importarDatosDesdeJSON(inputFile) {
    var archivo;
    if (inputFile instanceof HTMLInputElement) {
        archivo = inputFile.files[0];
    } else {
        archivo = inputFile;
    }
    if (archivo) {
        var lector = new FileReader();
        lector.onload = function (evento) {
            try {
                var datosJSON = JSON.parse(evento.target.result);
                localStorage.setItem('elementos', JSON.stringify(datosJSON));
                console.log('Datos importados exitosamente:', datosJSON);
            } catch (error) {
                console.error('Error al analizar los datos JSON:', error);
            }
        };
        lector.readAsText(archivo);
    }
}