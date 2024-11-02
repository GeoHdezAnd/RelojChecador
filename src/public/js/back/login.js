
import { ValidacionesForm } from "../validaciones.js";

const email = document.querySelector('#email');
const form = document.querySelector('#form');
const password  = document.querySelector('#password');
const btnLogin = document.querySelector('#login');

const log ={
	email: '',
	password: ''
}
email.addEventListener('blur', validar);
password.addEventListener('blur', validar);
btnLogin.addEventListener('click', (e) =>{
	e.preventDefault();
	enviarDatos(log);
})

function validar(e){
	if(e.target.value !== ''){
		log[e.target.id] = e.target.value.trim();
	}
	if(e.target.id == 'email' && !ValidacionesForm.validarEmail(e.target.value)){
		ValidacionesForm.mostrarAlerta(`El valor de ${e.target.name} no es correcto`, form);
		log[e.target.id] = '';
		ValidacionesForm.comprobarDatos(log, btnLogin);
		return;
	}

	if(e.target.value == ''){
		ValidacionesForm.mostrarAlerta(`El valor de ${e.target.name} es necesario`, form);
		log[e.target.id] = '';
		ValidacionesForm.comprobarDatos(log, btnLogin)
		return;
	}

	ValidacionesForm.limpiarAlerta(form);
	log[e.target.id] = e.target.value.trim();
	ValidacionesForm.comprobarDatos(log, btnLogin);
	console.log(log)
}
async function enviarDatos(data) {
	try {
		const response = await fetch('api/administradores', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			const errorData = await response.json();
			ValidacionesForm.mostrarAlerta(`${errorData.message}`, form);
		} else {
			ValidacionesForm.limpiarAlerta(form);
			window.location.href = '/dashboard';
		}
	} catch (error) {
		console.log("Error en la solicitud:", error);
	}
}
