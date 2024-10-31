
/* VARIABLES MODAL */
const modal = document.querySelector('#modal');
const abrirBtn = document.querySelector('#modalAgregar');
const cerrarBtn =  document.querySelector('#cerrar-modal');
const dataContainer = document.querySelector('#show-data');
const tituloModal =  document.querySelector('#titulo-modal');
const btnEditar =  document.querySelector('#btnCrear');
const dashboardContent = document.querySelector('.dashboard-contenedor');
const formulario = document.querySelector('#usuario-formulario');
const selectArea = document.querySelector('#area');
const filtros = document.querySelector('#area-filtros');
const activFiltro = document.querySelector('#activFiltro');


// ACCIONES EN TRABAJADORES
const editButtons = document.querySelectorAll('.action-edit');
const deleteButtons = document.querySelectorAll('.action-delete');

// DIALOGOS
// Abrir el dialogo
abrirBtn.addEventListener('click', () => {
	tituloModal.textContent = 'Agregar usuario';
	btnEditar.textContent = 'Agregar';
	modal.showModal();
	modal.classList.add('mostrar');
});

// Cerrar modal
cerrarBtn.addEventListener('click', () => {
	modal.classList.add('retroceder');
	setTimeout(() =>{
		modal.close();
		modal.classList.remove('mostrar', 'retroceder');
	}, 300);
	if(tituloModal.textContent == 'Editar datos de trabajador'){
		btnEditar.setAttribute('data-id', '');
		formulario.reset();
	}
});

activFiltro.addEventListener('click', () =>{
	showFilters();
})

// CARGA DE DATOS DE EMPLEADOS
document.addEventListener('DOMContentLoaded', async () => {
	try {
		// Usa Promise.all para esperar ambas promesas
		const [trabajadores, areas] = await Promise.all([cargarTrabajadores(), cargarAreas()]);
		
		if (trabajadores && areas) {
			showData(trabajadores, areas);
		} else {
			console.error('No se pudieron obtener los datos de trabajadores o áreas');
		}
	} catch (error) {
		console.error('Error al cargar los datos: ', error);
	}
});

// Cargar empleados
async function cargarTrabajadores() {
	try {
		const response = await fetch('/api/trabajadores');
		if (!response.ok) {
			console.log('No se pudieron obtener los datos');
			return [];
		}

		const trabajadores = await response.json();
		return trabajadores;
	} catch (error) {
		console.log('Error al cargar los trabajadores: ', error.message);
		return [];
	}
}

// Cargar áreas
async function cargarAreas() {
	try {
		const response = await fetch('/api/areas');
		if (!response.ok) {
			console.log('No se pudieron obtener los datos de áreas');
			return [];
		}

		const areas = await response.json();
		return areas;
	} catch (error) {
		console.log('Error al cargar las áreas: ', error.message);
		return [];
	}
}

// FUNCION PARA MOSTRAR DATOS
function showData(data, areas, id = null) {
	let contador = 1;

	// Limpia el contenedor de datos antes de agregar nuevos
	dataContainer.innerHTML = '';

	// Verifica si 'areas' es un array válido
	if (areas && areas.length > 0) {
		const filtrosExistentes = new Set(Array.from(filtros.children).map(filtro => filtro.dataset.areaId));

		areas.forEach(area => {
			if (!filtrosExistentes.has(area._id)) {
				const opcion = document.createElement('option');
				opcion.value = area._id;
				opcion.textContent = area.nombre;
				selectArea.appendChild(opcion);

				const filtro = document.createElement('button');
				filtro.classList.add('boton-usuario');
				filtro.textContent = area.nombre;
				filtro.dataset.areaId = area._id; // Añadir el ID del área al botón
				filtros.appendChild(filtro);

				filtro.addEventListener('click', e => {
					const idArea = area._id;
					// Comprobar si el botón ya está activado
					if (filtro.classList.contains('active')) {
						filtro.classList.remove('active'); // Quita el estilo de "presionado"
						showData(data, areas); // Muestra todos los datos nuevamente
					} else {
						filtro.classList.add('active'); // Añadir estilo de "presionado"
						showData(data, areas, idArea); // Filtra por el área seleccionada
					}
				});
			}
		});
	} else {
		console.error('No hay áreas para mostrar');
	}

	if (id) {
		data = data.filter(worker => worker.area === id);
	}

	// Verifica si 'data' es un array válido
	if (data && data.length > 0) {
		data.forEach(worker => {
			const area = areas.find(area => area._id === worker.area);
			const areaNombre = area ? area.nombre : 'Área desconocida';
			const workerContainer = document.createElement('TR');
			workerContainer.innerHTML = `
				<th>${contador++}</th>
				<th>${worker.nombre} ${worker.apellidoPaterno} ${worker.apellidoMaterno}</th>
				<th>${worker.matricula}</th>
				<th>${worker.telefono}</th>
				<th>${worker.email}</th>
				<th>${areaNombre}</th>
				<th> 
					<button data-id="${worker._id}" class="action-edit"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg> </button>
					<button data-id="${worker._id}" class="action-delete"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-trash-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg> </button> 
				</th>
			`;
			dataContainer.appendChild(workerContainer);
		});
	} else {
		console.error('No hay trabajadores para mostrar');
	}

	// Agregar los eventos después de que los botones hayan sido agregados al DOM
	document.querySelectorAll('.action-edit').forEach(button => {
		button.addEventListener('click', (e) => {
			handleEditClick(e);
		});
	});

	document.querySelectorAll('.action-delete').forEach(button => {
		button.addEventListener('click', handleDeleteClick);
	});
}



function showAreas(data){
	data.forEach(area =>{
		const opcion = document.createElement('option');
		opcion.value = area._id;
		opcion.textContent = area.nombre;

		selectArea.appendChild(opcion);
	})
}

function showFilters(){
	const oculto = filtros.classList;
	if(oculto.contains('oculto')){
		filtros.classList.remove('oculto');
		filtros.style.display = 'flex';
	} else {
		filtros.classList.add('oculto');
		filtros.style.display = 'none';
	}
}

function showDataFilter(id){
	getDataFilter(id);
}

// Funciones para manejar los eventos
async function handleEditClick(event) {
    const workerId = event.target.closest('button').dataset.id;
	try{
		// Solicitud
		const response = await fetch(`/api/trabajadores/${workerId}`);
		const workerData = await response.json();
		// Rellenar el formulario
		fillEditForm(workerData);
		tituloModal.textContent = 'Editar datos de trabajador';
		btnEditar.textContent = 'Actualizar';
		btnEditar.setAttribute('data-id', workerId);
		modal.showModal();
		modal.classList.add('mostrar');
	} catch(error){
		alert('No se pudo encontar el usuario');
	}
	
}

async function handleDeleteClick(event) {
    const workerId = event.target.closest('button').dataset.id;
	try{
		const response = await fetch(`/api/trabajadores/${workerId}`);
		const workerData = await response.json();
		modalConfirmation(workerId, workerData.nombre, workerData.matricula);
	} catch(error){
		alert('No se encontro el usuario')
	}
	
}

function fillEditForm(data){
	const fechaNacimieto = new Date(data.nacimiento).toISOString().split('T')[0];
	// Selecciona los campos del formulario y rellénalos con los datos
    document.querySelector('#name').value = data.nombre;
    document.querySelector('#apellidoPa').value = data.apellidoPaterno;
    document.querySelector('#apellidoMa').value = data.apellidoMaterno;
    document.querySelector('#phone').value = data.telefono;
	document.querySelector('#nacimiento').value = fechaNacimieto;
    document.querySelector('#email').value = data.email;
	document.querySelector('#matricula').value = data.matricula;
    document.querySelector('#area').value = data.area;

}

function modalConfirmation(id, nombre, matricula){
	 // Crear el modal
	const modal = document.createElement('div');
	modal.id = 'modal-confirmacion';
	modal.classList.add('modal-confirmacion');

	 // Crear contenido del modal
	const modalContent = document.createElement('div');
	modalContent.classList.add('modal-content');

	const titulo = document.createElement('h2');
	titulo.textContent = 'Confirmar eliminación';

	const mensaje = document.createElement('p');
	mensaje.textContent = `¿Estás seguro que deseas eliminar al usuario ${nombre}? con matricula ${matricula}`;

	const confirmarBtn = document.createElement('button');
	confirmarBtn.textContent = 'Confirmar';
	confirmarBtn.classList.add('confirmar-button')
	confirmarBtn.addEventListener('click', function() {
		deleteWorker(id);
		dashboardContent.removeChild(modal);  // Cerrar modal
	});

	const cancelarBtn = document.createElement('button');
	cancelarBtn.textContent = 'Cancelar';
	cancelarBtn.classList.add = 'cancelar-button'
	cancelarBtn.addEventListener('click', function() {
		 dashboardContent.removeChild(modal);  // Cerrar modal
	});

	 // Agregar contenido al modal
	modalContent.appendChild(titulo);
	modalContent.appendChild(mensaje);
	modalContent.appendChild(confirmarBtn);
	modalContent.appendChild(cancelarBtn);
	modal.appendChild(modalContent);

	 // Agregar el modal al body
	dashboardContent.appendChild(modal);

	 // Hacer visible el modal
	modal.style.display = 'flex';

}

async function deleteWorker(id){
	console.log(`Eliminando el usuario con id: ${id}`);
	try{
		const response =  await fetch(`/api/trabajadores/delete/${id}`, {
			method: 'DELETE'
		});
		const data = await response.json();
		if (response.ok){
			alert(`${data.message} ${data.nombre}`);
		} else{
			alert(data.message)
		}
	} catch (error){
		alert('Error al eliminar trabajador');
	}
}