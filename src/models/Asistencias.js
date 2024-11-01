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
}