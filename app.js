//variables

const formulario = document.querySelector('#form-tareas');
const listaTareas = document.querySelector('.collection');
const BtnBorrar = document.querySelector('.borrar-tareas');
const filtro = document.querySelector('#filtrar');
const tareaInput = document.querySelector('#tarea');

cargaEventListeners();

function cargaEventListeners() {

    document.addEventListener('DOMContentLoaded', obtenerTareas);
	formulario.addEventListener('submit', agregarTarea);
	listaTareas.addEventListener('click', borrarTarea);
	BtnBorrar.addEventListener('click', borrarTodas);
	filtro.addEventListener('keyup', filtrarTareas);
}

function almacenarLocalStorage(tarea) {
	let tareas;
	if (localStorage.getItem('tareas') === null) {
		tareas = [];
	} else {
		tareas = JSON.parse(localStorage.getItem('tareas'));
    }
    
    tareas.push(tarea)
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function agregarTarea(e) {
	if (tareaInput.value === '') {
		alert('Agregar tarea');
	}

	const li = document.createElement('li');
	li.className = 'collection-item'; //clase materilize

	//

	li.appendChild(document.createTextNode(tareaInput.value));

	const link = document.createElement('a');
	link.className = 'delete-item secondary-content';
	link.innerHTML = '<i class="fa fa-remove"></i>';

	li.appendChild(link);

	listaTareas.appendChild(li);
	//almacenar en locla storage
	almacenarLocalStorage(tareaInput.value);

	tareaInput.value = '';

	e.preventDefault();
}

function borrarTarea(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		console.log(e.target);
		if (confirm('¿Estas seguro?')) {
		
        e.target.parentElement.parentElement.remove();
        
        //borrar de localstorage
        borrarDeLocalStorage( e.target.parentElement.parentElement);

    }

	}
}

function borrarDeLocalStorage(itemtarea){
    let tareas;
	if (localStorage.getItem('tareas') === null) {
		tareas = [];
	} else {
		tareas = JSON.parse(localStorage.getItem('tareas'));
    }
    
tareas.forEach(function(tarea,index){

    if(itemtarea.textContent === tarea){
        tareas.splice(index,1);


    }


});

localStorage.setItem('tareas', JSON.stringify(tareas))
    



}

function borrarTodas() {
	while (listaTareas.firstChild) {
		listaTareas.removeChild(listaTareas.firstChild);
    }
    borrarTodasLocalStorage();

}


function  borrarTodasLocalStorage(){

    localStorage.clear();


}
function filtrarTareas(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(function(tarea) {
		const item = tarea.firstChild.textContent;

		if (item.toLowerCase().indexOf(text) != -1) {
			tarea.style.display = 'block';
		} else {
			tarea.style.display = 'none';
		}
	});
}


function  obtenerTareas(){
    let tareas;
	if (localStorage.getItem('tareas') === null) {
		tareas = [];
	} else {
		tareas = JSON.parse(localStorage.getItem('tareas'));
    }
    
    tareas.forEach(function(tarea){

        
        const li = document.createElement('li');
        li.className = 'collection-item'; //clase materilize
    
        //
    
        li.appendChild(document.createTextNode(tarea));
    
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
    
        li.appendChild(link);
    
        listaTareas.appendChild(li);



    });



}