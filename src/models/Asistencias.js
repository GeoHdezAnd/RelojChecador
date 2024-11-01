import Asistencia from "../schemas/Asistencias.js";

export class AsistenciaModel{
	static async create({idUsuario, fecha, horaEntrada, estado}){
		const asistenciaNueva = Asistencia ({
			idUsuario,
			fecha,
			horaEntrada,
			estado
		})
		const asistencia = await asistenciaNueva.save();
		return asistencia
	}

	static async updateSalida({_id, horaSalida}){
		const asistenciaUpdate = await Asistencia.findByIdAndUpdate(
			_id, 
			{horaSalida} ,
			{ new: true}
		);
		return asistenciaUpdate
	}
}