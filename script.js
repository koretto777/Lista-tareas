/* referencias al documento del DOM */

const tareaEntrada = document.getElementById("tareaEntrada");
const botonAgregar = document.getElementById("botonAgregar");
const contenedorTareas = document.getElementById("contenedorTareas");
const contadorTotales = document.getElementById("contadorTotales");
const contadorTerminadas = document.getElementById("contadorTerminadas");
const mensaje = document.getElementById('mensaje');
const botonOcultar = document.getElementById("botonOcultar")
const botonEliminar = document.getElementById("botonEliminar");

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

  // Agregamos el texto del usuario
  tareaTexto.innerText = tareaEntrada.value;

  // Escuchadores de los ìconos
  iconoCompletada.addEventListener('click', (e) => {
    // codigo que se ejecuta
    const tareaElemento = e.target.parentNode.parentNode;
    const esCompletada = tareaElemento.classList.contains('tarea-completada');

    tareaElemento.classList.toggle('tarea-completada');

    if(esCompletada) {
      e.target.classList.remove('bi-dash-circle');
      e.target.classList.add('bi-check-circle');
    } else {
      e.target.classList.remove('bi-check-circle');
      e.target.classList.add('bi-dash-circle');
    }

    //actualizamos los contadores
    actualizarContadores();

  })
  
  iconoEliminar.addEventListener('click', (e) => {
    // codigo que se ejecuta
    const tareaElemento = e.target.parentNode.parentNode;
    tareaElemento.remove();

    //actualizamos los contadores
    actualizarContadores();
  })

  // Retornamos la estructura de la tarea
  return tareaContenedor;
}

/* Funcion actualizar contenedores */
function actualizarContadores() {
    //contamos los elementos con la clase tarea
    const tareasTotales = document.querySelectorAll(".tarea");
    const tareasCompletadas = document.querySelectorAll(".tarea-completada");

    //actualizamos los contadores en el DOM
    contadorTotales.textContent = tareasTotales.length;
    contadorTerminadas.textContent = tareasCompletadas.length;
}

/* Función mostrar y ocultar las tareas completadas */
let tareasOcultas = false;
function toggleOcultarCompletadas() {

    //contamos los elementos con la clase tarea-completada
    const tareasCompletadas = document.querySelectorAll(".tarea-completada")

    //ejecutamos una funcion por cada elemento de la lsita de nodos con forEach()
    tareasCompletadas.forEach((tarea) => {
        //codigo que se ejecuta por cada una de las tareas
        if(tareasOcultas) {
        // asignar un dasply flex
        tarea.style.display="flex"; 
        } else {
            //asignar un display none, hace que se oculten
            tarea.style.display="none"; 
        }
    });

    //cambiamos el estado de la variable tareas ocultas
    tareasOcultas = !tareasOcultas;

    //cambiamos el textodel boton

    if(tareasOcultas){
        botonOcultar.textContent = "Mostrar Completadas"
    } else {
        botonOcultar.textContent ="ocultar Completadas"
    }

}

toggleOcultarCompletadas()

/* funcion eliminar todas las tareas completadas */
function eliminarCompletadas() {
    //Contar las tareas con la clase tarea-completada
    const tareasCompletadas = document.querySelectorAll(".tareas-completadas");

    //eliminar cada tarea completada
    tareasCompletadas.forEach((tarea) => {tarea.remove()})

    //actualizamos los contadores
    actualizarContadores();
}

/* Escuchadores Botones */
botonAgregar.addEventListener('click', agregarTarea);
botonOcultar.addEventListener('click', toggleOcultarCompletadas)
botonEliminar.addEventListener('click', eliminarCompletadas)

/* Función Agregar el Elemento Tarea */

function agregarTarea() {
  // Generar la constante para evaluar si hay texto o no
  const texto = tareaEntrada.value.trim();
  
  // Evaluar la constante de texto
  if (texto) {
    
    // Traemos el elemento retornado por la función crearElementoTarea
    const elementoTarea = crearElementoTarea();
    contenedorTareas.append(elementoTarea);

    // Reiniciar el value del input
    tareaEntrada.value = '';

    // Mostrar el mensaje de tarea creada satifactoriamente
    mensaje.textContent = 'Tarea creada satisfactoriamente!';

    //actualizamos los contadores
    actualizarContadores();

  } else {
    // Ejecutas esto otro
    mensaje.textContent = 'No escribiste nada chamaco!';
  }

}

/* Hacemos que al presionar la tecla Enter en el Input se agregue la tarea */

tareaEntrada.addEventListener('keydown', (e) => {
// Evaluamos la tecla presionada
  if(e.key == "Enter") {
    // Esto ocurre
    agregarTarea();
  }
})

/* Mostrar un mensaje al escribir */

tareaEntrada.addEventListener('input', () => {

  // Evaluamos si el valor del input esta vacío
 if(tareaEntrada.value.trim() === ""){

  mensaje.textContent = 'Escribe tu próxima tarea!';

 } else {

  mensaje.textContent = 'Al finalizar presiona enter!';

 }

})