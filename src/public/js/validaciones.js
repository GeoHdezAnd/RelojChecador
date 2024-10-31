export class ValidacionesForm {
	static validarEmail(email){
		const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
		const resultado = regex.test(email);
		return resultado;
	}

	static mostrarAlerta(mensaje, referencia){
		this.limpiarAlerta(referencia);

		// Generar el html
		const error = document.createElement('P');
		error.textContent = mensaje;
		error.classList.add('error');
		referencia.appendChild(error); // O prepend() para agregar al inicio del contenido
	}

	static limpiarAlerta(referencia){
		const alerta = document.querySelector('.error');
		if(alerta){
			alerta.remove();
		}
	}

	static comprobarDatos(obj, btn){
		if(Object.values(obj).includes('')){
			btn.classList.add('opacidad-50');
			btn.disabled = true;
			return
		}
		btn.classList.remove('opacidad-50');
		btn.disabled = false;
	}

	static resetFormulario (obj, form, btn){
		Object.keys(obj).forEach(key => {
			obj[key] = '';
		});

		form.reset();
		this.comprobarDatos(obj, btn);
	}
	static validarNumero (input){
		const regexNum = /^[0-9]{10}$/;
		if(regexNum.test(input)){
			return true
		} return false
	}
}