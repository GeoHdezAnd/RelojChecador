import { ValidacionesForm } from "../validaciones.js";

/* VARIABLES FORMULARIO MODAL */
const inputNombre =  document.querySelector('#name');
const inputApellidoPa = document.querySelector('#apellidoPa');
const inputApellidoMa = document.querySelector('#apellidoMa');
const inputPhone = document.querySelector('#phone');
const inputNacimiento = document.querySelector('#nacimiento');
const inputEmail = document.querySelector('#email');
const inputMatricula = document.querySelector('#matricula');
const inputArea = document.querySelector('#area');
const btnCrear = document.querySelector('#btnCrear');
const btnLimpiar = document.querySelector('#btnLimpiar');
const spaceAlert = document.querySelector('#alertas');
const formulario = document.querySelector('#usuario-formulario');



// FORMULARIO MODAL
const trabajador = {
	nombre: '',
	apellidoPaterno: '',
	apellidoMaterno: '',
	telefono: '',
	nacimiento: '',
	email: '',
	matricula: '',
	area: ''
}


// AGREGAR USUARIO
formulario.addEventListener('submit', (e) =>{
	e.preventDefault();
})
inputNombre.addEventListener('blur', validar);
inputApellidoPa.addEventListener('blur', validar);
inputApellidoMa.addEventListener('blur', validar);
inputPhone.addEventListener('input', validar);
inputNacimiento.addEventListener('blur', validar);
inputEmail.addEventListener('blur', validar);
inputMatricula.addEventListener('mousedown', (e) =>{
	crearMatricula(e);
	validar(e);
});
inputArea.addEventListener('blur', validar);

btnCrear.addEventListener('click', (e) => {
	e.preventDefault();
	if(btnCrear.textContent == 'Agregar'){
		enviarDatos(trabajador);
	}
	else {
		sendUpdate(trabajador);
	}
});

btnLimpiar.addEventListener('click', e => {
	e.preventDefault();
	ValidacionesForm.resetFormulario(trabajador, formulario, btnCrear);
})

// EDITAR
formulario.addEventListener('click', () =>{
	if(tituloModal.textContent.includes('Editar')){
		llenarObjeto(trabajador);
		console.log(trabajador);
	}
})

// FUNCIONES AGREGAR 
function validar(e) {
	if(e.target.value !== ''){
		trabajador[e.target.name] = e.target.value.trim().toLowerCase();
	}

	if(e.target.id === 'matricula' && e.target.value === ''){
		ValidacionesForm.mostrarAlerta('La matricula necesita que completes campos para generarse', spaceAlert);
		trabajador[e.target.name] = '';
		ValidacionesForm.comprobarDatos(trabajador, btnCrear);
		return
	}

	if(e.target.id === 'phone' && !ValidacionesForm.validarNumero(e.target.value)){
		ValidacionesForm.mostrarAlerta('El telefono debe contener solo numeros', spaceAlert);
		trabajador[e.target.name] = '';
		ValidacionesForm.comprobarDatos(trabajador, btnCrear);
		return
	}

	if(e.target.value.trim() === ''){
		ValidacionesForm.mostrarAlerta(`El campo ${e.target.name} es obligatorio`, spaceAlert);
		trabajador[e.target.name] = '';
		ValidacionesForm.comprobarDatos(trabajador, btnCrear);
		return 
	}
	if(e.target.id === 'email' && !ValidacionesForm.validarEmail(e.target.value)){
		ValidacionesForm.mostrarAlerta('El correo no tiene formato correcto', spaceAlert);
		trabajador[e.target.name] = '';
		ValidacionesForm.comprobarDatos(trabajador, btnCrear);
		return
	}

	ValidacionesForm.limpiarAlerta(spaceAlert);
	trabajador[e.target.name] = e.target.value.trim();
	ValidacionesForm.comprobarDatos(trabajador, btnCrear);
}

function crearMatricula (e){
	const inicalNombre = trabajador.nombre.charAt(0).toUpperCase();
	const incialApellidoPa = trabajador.apellidoPaterno.slice(0, 2).toUpperCase();
	const inicialApelllidoMa = trabajador.apellidoMaterno.charAt(0).toUpperCase();
	// Formatear fecha
	const fechaNac = new Date(trabajador.nacimiento);
	const mes = ('0' + (fechaNac.getMonth() + 1)).slice(-2);
	const year = fechaNac.getFullYear().toString().slice(-2);
	
	const matriculaGenerada = `${inicalNombre}${incialApellidoPa}${inicialApelllidoMa}-${mes}${year}`
	trabajador[e.target.name] = matriculaGenerada;

	
	if(matriculaGenerada.includes('NaN')){
		return;
	}
	ValidacionesForm.limpiarAlerta(spaceAlert);
	e.target.value = matriculaGenerada;
}


async function enviarDatos(dato){
	try {
		const response = await fetch('/api/trabajadores/nuevo-trabajador',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(dato)
		});

		if(!response.ok){
			const errorData = await response.json();
			alert(`Error: ${errorData.message}`)
		} else {
			const data = await response.json();
			alert(`${data.message} ${data.name}`);
			ValidacionesForm.resetFormulario(trabajador, formulario, btnCrear);
		}
	} catch (error) {
		alert('Hubo un error al agregar el trabajador. Intentalo de nuevo');
	}
}

// ACTUALIZAR
function llenarObjeto(obj){
	const nombre = document.getElementById('name').value;
    const apellidoPaterno = document.getElementById('apellidoPa').value;
    const apellidoMaterno = document.getElementById('apellidoMa').value;
    const telefono = document.getElementById('phone').value;
	const nacimiento = document.getElementById('nacimiento').value;
    const email = document.getElementById('email').value;
	const matricula = document.getElementById('matricula').
	value;
    const area = document.getElementById('area').value;

	obj.nombre = nombre;
    obj.apellidoPaterno = apellidoPaterno;
    obj.apellidoMaterno = apellidoMaterno;
    obj.telefono = telefono;
    obj.nacimiento = nacimiento;
    obj.email = email;
    obj.matricula = matricula;
    obj.area = area;
	console.log(obj)
	return obj;

}

async function sendUpdate(data){
	const workerId = btnEditar.dataset.id;
	try{
		const response = await fetch(`/api/trabajadores/${workerId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		if(response.ok){
			const data = await response.json();
			alert(`${data.message},  ${data.nombre}`)
			ValidacionesForm.resetFormulario(trabajador, formulario, btnCrear);
		} else {
			alert('Error al actualizar los datos');
		}
	} catch(error){
		alert('Error: ', error);
	}
}