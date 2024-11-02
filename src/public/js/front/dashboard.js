const btnReloj = document.querySelector('#reloj-checador');
const relojChecador  = document.querySelector('#modal-reloj');
const cerrarReloj =  document.querySelector('#cerrar-reloj');
const horaContent = document.querySelector('#horaActual');
const fechaContent = document.querySelector('#fechaActual');
const btnEntrada = document.querySelector('#entradaJornada');
const btnSalida = document.querySelector('#salidaJornada');
const form = document.querySelector('#formulario');
const matricula =  document.querySelector('#matricula');

const asistencia = {
	usuario: '',
	area: '',
	fecha: new Date().toISOString().split('T')[0],
	horaEntrada: '',
	horaSalida: ''
}

form.addEventListener('submit', (e) =>{
	e.preventDefault();
})

async function checkAuthentication() {
    const token = localStorage.getItem('token');
    console.log('Token obtenido:', token); // Log para verificar el token
    const authResponse = await fetch('/dashboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log('Response Status:', authResponse.status); // Log para verificar el estado de la respuesta
    return authResponse.ok; // Devuelve true si la respuesta es 2xx
}



document.addEventListener('DOMContentLoaded', async () => {
	
    try {
        // Verifica la autenticación antes de cargar la vista
        const isAuthenticated = await checkAuthentication();
        if (!isAuthenticated) {
            window.location.href = '/login'; // Redirige si no está autenticado
            return;
        }


		const [asistencias, areas] = await Promise.all([cargarAsistencias(), cargarAreas()]);
		if(asistencias && areas){
			showData(asistencias, areas)
		} else{
			console.log('no se obtuvieron los datos')
		}
	} catch(error){
		console.log(error);
	}
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
})

btnEntrada.addEventListener('click', (e) =>{
	agregarEntrada();
	
})

btnSalida.addEventListener('click', () =>{
	agregarSalida();
})

async function cargarAsistencias(){
	try {
		const response = await fetch('/api/asistencias');
		if(!response.ok){
			return console.log('No se obtuvieron los datos')
		} 
		const asistencias = await response.json();
		return asistencias

	} catch(error){
		console.log(error)
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


function showData(data, areas){
	let contador = 1;
	
	data.forEach(asistencia =>{
		const asistenciaContainer = document.querySelector('#contenido-asistencias');
		const area = areas.find(area => area._id === asistencia.idUsuario.area);
		const areaNombre = area ? area.nombre : 'Área desconocida';
		const asistenciaData = document.createElement('TR');
		asistenciaData.innerHTML = `
			<th>${contador++}</th>
			<th>${asistencia.idUsuario.nombre} ${asistencia.idUsuario.apellidoPaterno}</th>
			<th>${asistencia.idUsuario.matricula}</th>
			<th>${areaNombre}</th>
			<th>${asistencia.idUsuario.telefono}</th>
			<th>${asistencia.estado}</th>
			<th>${asistencia.horaEntrada}</th>
			<th>${asistencia.horaSalida}</th>
		`;
		asistenciaContainer.appendChild(asistenciaData)
	})
}

function resetAsistencia(){
	return {
        usuario: '',
        area: '',
        fecha: new Date().toISOString().split('T')[0],
        horaEntrada: '',
        horaSalida: ''
    };
}

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
		asistencia.area = worker.area;
	} catch (error){
		alert(error.message)
	}
}

function generarHora(){
	const fecha = new Date();
	const hour = fecha.getHours();
	let minutes = fecha.getMinutes();
	minutes = minutes < 10 ? '0' + minutes : minutes

	const horaAsistencia = `${hour}:${minutes}`;
	return horaAsistencia;
}

async function agregarEntrada(){
	const horaAsistencia = generarHora();
	asistencia.horaEntrada = horaAsistencia;
	try{
		const response = await fetch('/api/asistencias/nueva-asistencia', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(asistencia)
		});

		const data = await response.json();
		if(!response.ok){
			return  alert(`${data.message}`)
		}
		alert(`${data.message}`);
		form.reset();
		asistencia = resetAsistencia();
	} catch(error){
		console.log('No se cargaron datos')
	}
}

async function agregarSalida(){
	const horaSalida = generarHora();
	asistencia.horaSalida = horaSalida;
	try {
		const response = await fetch (`/api/asistencias/${asistencia.usuario}`,{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ horaSalida })
		}) 
		const data =  await response.json();
		if(!response.ok){
			return alert(`${data.message}`)
		}
		return alert(`${data.message}, ${data.asistencia}`)

	} catch(error){
		alert('Error: ', error.message)
	}
}