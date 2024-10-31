const btnReloj = document.querySelector('#reloj-checador');
const relojChecador  = document.querySelector('#modal-reloj');
const cerrarReloj =  document.querySelector('#cerrar-reloj');
const horaContent = document.querySelector('#horaActual');
const fechaContent = document.querySelector('#fechaActual');
const btnEntrada = document.querySelector('#entradaJornada');
const form = document.querySelector('#formulario');
const matricula =  document.querySelector('#matricula');

const asistencia = {
	usuario: '',
	fecha: new Date().toISOString().split('T')[0],
	horaEntrada: '',
	horaSalida: null
}

form.addEventListener('submit', (e) =>{
	e.preventDefault();
})

btnReloj.addEventListener('click', () =>{
	relojChecador.showModal();
	relojChecador.classList.add('mostrar')
})

cerrarReloj.addEventListener('click', () =>{
	relojChecador.classList.add('retroceder');
	setTimeout(() =>{
		relojChecador.close();
		relojChecador.classList.remove('mostrar', 'retroceder')
	}, 300);
})

// HORA
const obtenerHoraActual = () =>{
	const fecha = new Date();
	let horas = fecha.getHours();
	let minutos = fecha.getMinutes();
	let segundos = fecha.getSeconds();

	minutos = minutos < 10 ? '0' + minutos : minutos
	segundos = segundos < 10 ? '0' + segundos : segundos

	const horaActual = `${horas}:${minutos} hrs`;
	horaContent.textContent = horaActual;
}
setInterval(obtenerHoraActual, 1000)

const fechaActual = () =>{
	const fecha = new Date();
	//
	const daysWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
	const months = ['Enero', 'Febrero', 'Marzo', "Abril", "Mayo", 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

	const dayWeek = daysWeek[fecha.getDay()];
	const dia = fecha.getDate();
	const mes = months[fecha.getMonth()];
	const year = fecha.getFullYear();
	
	const date = `${dayWeek}, ${dia} de ${mes} de ${year}`
	fechaContent.textContent = date;
}
fechaActual();

matricula.addEventListener('blur', (e) =>{
	if(e.target.value.trim() == ''){
		return alert('Ingresa una matricula')
	}
	validarMatricula(e);
	console.log(asistencia);
})

btnEntrada.addEventListener('click', (e) =>{
	agregarEntrada();
})

async function validarMatricula(e){
	const matricula = e.target.value;
	try {
		const response = await fetch(`/api/trabajadores/matricula/${matricula}`)
		if (!response.ok) {
            return alert('No se encontró el usuario');
        }
        const worker = await response.json();
        alert(`Trabajador encontrado: ${worker.nombre}`);
		asistencia.usuario = worker._id;
	} catch (error){
		alert(error.message)
	}
}

function agregarEntrada(){
	const fecha = new Date();
	const hour = fecha.getHours();
	let minutes = fecha.getMinutes();
	minutes = minutes < 10 ? '0' + minutes : minutes

	const horaAsistencia = `${hour}:${minutes}`;
	asistencia.horaEntrada = horaAsistencia;
}