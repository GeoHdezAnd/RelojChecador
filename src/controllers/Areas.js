import { AreasModel } from "../models/Areas.js"

export class AreaController {
	static async getAll(req, res){
		const areas = await AreasModel.getAll();
		res.json(areas)
	}

	static async getById(req, res){
		const id = req.params.id
		const area = await AreasModel.getById({ id })
		if(area) return res.json(area)
		res.status(404).json({ message: 'Area not found'})
	}

	static async create (req, res){
		const {nombre, horaEntrada, horaSalida} = req.body
		const areaExist = await AreasModel.findOne({name: nombre});
		if(areaExist) return res.status(400).json({message: 'Area ya existente'})
		const areaSave = await AreasModel.create({nombre, horaEntrada, horaSalida})
		return res.status(200).json({
			message: 'area agregada',
			nombre: nombre
		})

	}

	static async update(req, res){
		const areaId = req.params.id
		const data = req.body

		const updateArea =  await AreasModel.update({id: areaId, data});
		return res.json({ message: 'Area actualizada', area: updateArea.nombre})
	}

	static async delete(req, res){
		const areaId = req.params.id
		const result  = await AreasModel.delete({id: areaId})
		console.log(result)
		if(!result) return res.status(500).json({message: 'Error al eliminar'})
		return res.status(200).json({
			message: 'Area elimianda',
			area: result.nombre
		})
	}
}