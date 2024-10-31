import Area from "../schemas/Areas.js";

export class AreasModel {
	static async getAll(){
		const areas = await Area.find()
		return areas;
	}

	static async getById({id}){
		const area = await Area.findById(id)
		return area
	}

	static async findOne({name}){
		const area  = await Area.findOne({name});
		return area
	}

	static async create({nombre, horaEntrada, horaSalida}){
		const nuevaArea = new Area ({
			nombre,
			horaEntrada,
			horaSalida
		})
		const area = await nuevaArea.save()
		return area
	}
	

	static async update({id, data}){
		const area = await Area.findByIdAndUpdate(id, data, {
			new: true
		});
		return area
	}

	static async delete({id}){
		const areaRes = await Area.findByIdAndDelete(id);
		return areaRes
	}
}