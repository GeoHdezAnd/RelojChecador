import { TrabajadorModel } from "../models/Trabajadores.js";

export class TrabajadorController {
	static async getAll(req, res){
		const trabajadores = await TrabajadorModel.getAll();
		if(!trabajadores) return res.status(500).json({message: 'No se pudieron obtener los datos'})
		return res.json(trabajadores)
	}

	static async getById(req, res){
		const workerId = req.params.id
		const trabajador = await TrabajadorModel.getById({id: workerId })
		if(trabajador) return res.json(trabajador)
		res.status(404).json({ message: 'Trabajador not found'})
	}

	static async create (req, res){
		const { nombre, apellidoPaterno, apellidoMaterno, telefono, nacimiento, email, matricula, area} =  req.body
		const workerExist = await TrabajadorModel.findEmail({correo: email});
		if(workerExist) return res.status(400).json({message: 'El email está en uso'})
		const workerSave = await TrabajadorModel.create({nombre, apellidoPaterno, apellidoMaterno, telefono, nacimiento, email, matricula, area})

		if(!workerSave) return res.status(404).json({
			message: 'No se pudo guardar el dato'
		})
		res.status(200).json({
			message: 'Trabajador guardado con exito',
			name: nombre
		})
	}

	static async update(req, res){
		const workerId = req.params.id
		const data = req.body

		const updateWorker =  await TrabajadorModel.update({id: workerId, data});
		if(!updateWorker) return res.status(500).json({ message: 'Error al actualizar'})
		res.json({ message: 'Trabajador actualizado', nombre: updateWorker.nombre})
	}

	static async delete(req, res){
		const workerId = req.params.id
		const result  = await TrabajadorModel.delete({id: workerId})
		if(!result) return res.status(500).json({message: 'Error al eliminar'})
		return res.status(200).json({
			message: 'Trabajador eliminado',
			nombre: result.nombre
		})
	}
}