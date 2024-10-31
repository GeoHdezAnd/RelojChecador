import { ValidacionesForm } from "../validaciones.js";
/* ==== VARIABLES =========*/
const inputNombre = document.querySelector('#nombre');
const inputApellido = document.querySelector('#apellido');
const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');
const inputPasswordCon = document.querySelector('#password2');
const btnCrearCuenta = document.querySelector('#crear-cuenta')
const btnReset = document.querySelector('#limpiar')
const formulario = document.querySelector('#formulario');

const admin = {
	nombre: '',
	apellido: '',
	email: '',
	password:''
}

inputNombre.addEventListener('blur', validar);
inputApellido.addEventListener('blur', validar);
inputEmail.addEventListener('input', validar);
inputPassword.addEventListener('blur', validar);
inputPasswordCon.addEventListener('blur', validar);
btnReset.addEventListener('click',  function (e) {
	e.preventDefault();
	ValidacionesForm.resetFormulario(admin, formulario, btnCrearCuenta);
});
formulario.addEventListener('submit', function (e){
	e.preventDefault();
	//enviarDatos();
});

// FUNCIONES
function validar(e) {
	if(e.target.value.trim() === ''){
		ValidacionesForm.mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement.parentElement.parentElement );
		admin[e.target.name] = '';
		ValidacionesForm.comprobarDatos(admin, btnCrearCuenta);
		return;
	}

	if(e.target.id === 'email' && !ValidacionesForm.validarEmail(e.target.value)){
		ValidacionesForm.mostrarAlerta('El email no es valido', e.target.parentElement.parentElement.parentElement);
		admin[e.target.name] = '';
		ValidacionesForm.comprobarDatos(admin. btnCrearCuenta);
		return;
	}

	if(e.target.id === 'password2'){
		ValidacionesForm.mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement.parentElement.parentElement );
		ValidacionesForm.comprobarDatos(admin, btnCrearCuenta);
		return;
	}

	if(inputPassword.value != inputPasswordCon.value){
		ValidacionesForm.mostrarAlerta('Las contraseña deben coincidir', e.target.parentElement.parentElement.parentElement);
		admin[e.target.name] = '';
		ValidacionesForm.comprobarDatos(admin, btnCrearCuenta);
		return;
	}
	
	ValidacionesForm.limpiarAlerta(e.target.parentElement.parentElement.parentElement);
	admin[e.target.name] = e.target.value.trim().toLowerCase();
	ValidacionesForm.comprobarDatos(admin, btnCrearCuenta);

	console.log(admin);
}

