const btnReloj = document.querySelector('#reloj-checador');
const relojChecador  = document.querySelector('#modal-reloj');
const cerrarReloj =  document.querySelector('#cerrar-reloj');
const horaContent = document.querySelector('#horaActual');
const fechaContent = document.querySelector('#fechaActual');



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
	const dia = fecha.getDate();
	const mes = fecha.getMonth() + 1;
	const year = fecha.getFullYear();
	
	const date = `${dia}-${mes}-${year}`
	fechaContent.textContent = date;
}
fechaActual();