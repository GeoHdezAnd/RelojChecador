/* Variables*/
const fichaAgregar = document.querySelector('#ficha-agregar') ;
const dashboardContent = document.querySelector('.dashboard-contenedor');


// Evento agregar
fichaAgregar.addEventListener('click', (e) =>{
	crearModal();
});

document.addEventListener('DOMContentLoaded', () =>{
	cargarAreas();
})


// funcion crear modal
function crearModal(data){
	const modal = document.createElement('DIV');
	modal.classList.add("modal-area");
	modal.innerHTML = `
		<div class="area-form">
			<h1>Agregar nueva area</h1>
            <span class="close">
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1.1" viewBox="0 0 32 32">
				<g transform="scale(2)">
				<circle style="fill:#f44336" cx="8" cy="8" r="7"/>
				<rect style="fill:#ffffff" width="2" height="10" x="-.98" y="-16.29" transform="rotate(135)"/>
				<rect style="fill:#ffffff" width="2" height="10" x="-12.29" y="-5.01" transform="rotate(-135)"/>
				</g>
				</svg>
			</span>
            <form id="formulario-area">
                <label for="nombre">Nombre del área:</label>
                <input type="text" id="nombre" name="nombre">
				<label for="horaEntrada">Hora inicio de jornada:</label>
				<input type="time" id="horaEntrada" name="horaEntrada"> </input>
				<label for="horaSalida">Hora fin de jornada:</label>
				<input type="time" id="horaSalida" name="horaSalida"> </input>
                <div class="botones">
					<button id="btnCrear" class="crear" type="submit"> Agregar </button>
					<button id="btnLimpiar" class="limpiar" type="reset"> Limpiar formulario</button>
				</div>
            </form>
        </div>
	`;
	document.body.appendChild(modal);

	const area = {
		nombre: '',
		horaEntrada: '',
		horaSalida: ''
	}

	modal.querySelector('.close').addEventListener("click", function () {
		modal.remove();
	});

	modal.querySelector('#formulario-area').addEventListener("submit", e =>{
		e.preventDefault();
	});

	modal.querySelector('#nombre').addEventListener('blur', e =>{
		validar(e);
	});

	modal.querySelector('#horaEntrada').addEventListener('blur', e =>{
		validar(e);
	});

	modal.querySelector('#horaSalida').addEventListener('blur', e =>{
		validar(e);
	});

	modal.querySelector('#btnCrear').addEventListener('click', e =>{
		e.preventDefault();
		if(data){
			updateData();
			modal.remove();
			return;
		}
		sendData();
	})
	modal.querySelector('#btnLimpiar').addEventListener('click', e =>{
		e.preventDefault();
		resetForm();
	})

	if(data){
		modal.querySelector('#nombre').value = data.nombre; 
		modal.querySelector('#horaEntrada').value = data.horaEntrada;
		modal.querySelector('#horaSalida').value = data.horaSalida;

		area.nombre = data.nombre;
		area.horaEntrada = data.horaEntrada;
		area.horaSalida = data.horaSalida;
	}

	const formularioContent = modal.querySelector('#formulario-area');
	const btnCrear = modal.querySelector('#btnCrear');

	function validar(e){
		if(e.target.value === ''){
			showAlert(`El campo ${e.target.name} no puede estar vacio`);
			area[e.target.name] = '';
			comprobarDatos();
			return;
		}
		eraseAlert();
		area[e.target.name] = e.target.value.trim();
		comprobarDatos();
		console.log(area);
	}

	function showAlert(message){
		eraseAlert();

		// Generar el HTML
		const error = document.createElement('P');
		error.textContent = message;
		error.classList.add('error');
		formularioContent.insertBefore(error, formularioContent.firstChild);
	}

	function eraseAlert(){
		const alerta =  document.querySelector('.error');
		if(alerta){
			alerta.remove();
		}
	}

	function comprobarDatos(){
		if(Object.values(area).includes('')){
			btnCrear.classList.add('opacidad-50')
			btnCrear.disabled =  true;
			return
		}
		btnCrear.classList.remove('opacidad-50');
		btnCrear.disabled = false;
	}

	function resetForm(){
		Object.keys(area).forEach(key =>{
			area[key] = '';
		});

		formularioContent.reset();
		comprobarDatos();
	}

	async function sendData(){
		try{
			const response = await fetch('/api/areas/nueva-area',{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(area)
			});

			if(!response.ok){
				const errorData = await response.json();
				alert(`Error: ${errorData.message}`)
			} else {
				const data = await response.json();
				alert(`${data.message} ${data.nombre}`);
				formularioContent.reset();
			}
		} catch(error) {
			alert('No se pudo agregar el area')
		}
	}

	async function updateData(){
		try{
			const response = await fetch(`/api/areas/${data._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(area)
			});
			if(response.ok){
				const data = await response.json();
				alert(`${data.message} ${data.area}`)
			} else{
				alert('Error al actualizar datos');
			}
		} catch (error){
			alert('Error', error);
		}
	}
}

async function cargarAreas(){
	try {
		const response = await fetch('/api/areas');
		if(!response.ok){
			console.log('No se pudieron obtener los datos')
		}
		const areas = await response.json();
		showData(areas);
	} catch(error){
		console.log(`${error.message}`);
	}
}

function showData(data){
	data.forEach(area =>{
		const contenedorFicha = document.querySelector('.contenedor-fichas');
		const ficha = document.createElement('DIV');
		ficha.classList.add('ficha');
		ficha.classList.add('ficha-area')
		ficha.setAttribute('data-id', area._id);
		ficha.innerHTML = `
			<svg data-id=${area._id} xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="btnEliminar icon icon-tabler icons-tabler-filled icon-tabler-trash-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg>
			<div class="ficha-info" id="areaDato" >
				<span>${area.nombre}</span>
				<p>Hora entrada: ${area.horaEntrada} HRS</p>
				<p>Hora salida: ${area.horaSalida} HRS</p>
			</div>
		`;
		contenedorFicha.appendChild(ficha);

		// editar
		document.querySelectorAll('.ficha-area').forEach( ficha =>{
			ficha.removeEventListener('click', handleEditClick);
			ficha.addEventListener('click',	handleEditClick);
		});

		// Eliminar
		document.querySelectorAll('.btnEliminar').forEach(btnEliminar => {
			// Remueve cualquier listener previo para asegurar que no haya duplicados
			btnEliminar.removeEventListener('click', handleDeleteClick);

			// Agrega el evento solo una vez usando { once: true }
			btnEliminar.addEventListener('click', handleDeleteClick);
		});
	});
}

async function handleEditClick(e){
	const areaId = e.currentTarget.getAttribute('data-id');
	console.log(areaId);
	try {
		const response = await fetch(`api/areas/${areaId}`);
		const areaData = await response.json();
		
		crearModal(areaData);
		changeForm(areaId);
		console.log(areaData);
	} catch(error){
		alert('No se pudieron obtener los datos');
	}
} 

function changeForm(id){
	const titulo = document.querySelector('.area-form H1');
	const btnCrear = document.querySelector('#btnCrear');
	titulo.textContent = 'Editar area';
	btnCrear.textContent = 'Actualizar';
	btnCrear.setAttribute('data-id', id);
}

async function handleDeleteClick(e){
	e.stopPropagation();
	const areaId = e.currentTarget.getAttribute('data-id');
	try {
		const response = await fetch(`/api/areas/${areaId}`);
		const areaData = await response.json();
		modalConfirmation(areaId, areaData.nombre);
	} catch(error){
		alert('No se encontro el usuario')
	}
}

function modalConfirmation(id, nombre){
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
	mensaje.textContent = `¿Estás seguro que deseas eliminar al area ${nombre}?`;

	const confirmarBtn = document.createElement('button');
	confirmarBtn.textContent = 'Confirmar';
	confirmarBtn.classList.add('confirmar-button')
	confirmarBtn.addEventListener('click', function() {
		deleteArea(id);
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

async function deleteArea(id){
	try {
		const response = await fetch(`/api/areas/delete/${id}`, {
			method: 'DELETE'
		});
		const data = await response.json();
		if (response.ok){
			alert(`${data.message} ${data.area}`);
		} else {
			alert(`${data.message}`)
		}
	} catch(error){
		alert('Error al actualizar');
	}
}
