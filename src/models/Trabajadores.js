import Trabajador from "../schemas/Trabajadores.js";

export class TrabajadorModel {

	static async getAll(){
		const trabajadores = await Trabajador.find()
		return trabajadores
	}
	static async getById({id}){
		const worker =  await Trabajador.findById(id);
		return worker
	}

	static async getByMatricula({matricula}){
		const worker =  await Trabajador.findOne({matricula: matricula});
		return worker
	}

	static async findEmail({correo}){
		const worker = await Trabajador.findOne({email: correo})
		return worker
	}
	
	static async create ({nombre, apellidoPaterno, apellidoMaterno, telefono, nacimiento, email, matricula, area}){
		const nuevoTrabajador = new Trabajador({
			nombre, 
			apellidoPaterno,
			apellidoMaterno,
			telefono,
			nacimiento,
			email,
			matricula,
			area
		});

		const trabajadorSave = await nuevoTrabajador.save();
		return trabajadorSave
	}

	static async update({id, data}){
		const worker = await Trabajador.findByIdAndUpdate(id, data, { new: true});
		return worker
	}

	static async delete({id}){
		const workerRes = await Trabajador.findByIdAndDelete(id);
		return workerRes
	}
}