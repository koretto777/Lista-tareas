/* referencias al documento del DOM */

const tareaEntrada = document.getElementById("tareaEntrada");
const botonAgregar = document.getElementById("botonAgregar");
const contenedorTareas = document.getElementById("contenedorTareas");

/* función para crear el elemento tarea */

function crearElementoTarea (){
    // crear los elementos de la tarea
    const tareaContenedor = document.createElement("div");
    const tareaTexto = document.createElement("p");
    const iconosContenedor = document.createElement("div");
    const iconoCompletada = document.createElement("i");
    const iconoEliminar = document.createElement("i");

    // crear la structura de la tarea
    iconosContenedor.append(iconoCompletada, iconoEliminar);
    tareaContenedor.append(tareaTexto, iconosContenedor);

    // agregamos las clases a los elementos de la tarea
    tareaContenedor.classList.add("tarea");
    tareaTexto.classList.add("tarea-texto");
    iconosContenedor.classList.add("tarea-iconos");
    iconoCompletada.classList.add("bi", "bi-check-circle");
    iconoEliminar.classList.add("bi", "bi-trash2");

    // agregamos al texto del usuario
    tareaTexto.innerText = tareaEntrada.value;

    // retornamos la estructura de la tarea
    return tareaContenedor;
}

/* escuchador */
botonAgregar.addEventListener("click", agregarTarea);

/* función para agragar la tarea */

function agregarTarea() {
    // traemos el elemento retornado por la funcion crearElementoTarea
    const elementoTarea = crearElementoTarea();
    contenedorTareas.append(elementoTarea);

    // reiniciar el value del input 
    tareaEntrada.value  = "";
}

