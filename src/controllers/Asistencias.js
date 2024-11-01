import { AreasModel } from "../models/Areas.js";
import { AsistenciaModel } from "../models/Asistencias.js";
import Asistencia from "../schemas/Asistencias.js";
export class AsistenciaController{

	static async create(req, res){
		try {
			const { usuario, area, fecha, horaEntrada } = req.body;

			const fechaAsistencia = new Date(`${fecha}T00:00:00Z`);

			const asistenciaIncompleta = await Asistencia.findOne({
				idUsuario: usuario,
				fecha: fechaAsistencia,
				horaSalida: '--:--'
			});

			if(asistenciaIncompleta){
				return res.status(400).json({
					message: 'Ya tienes una asistencia abierta sin salida para hoy, agrega salida.'
				})
			}
			
			// Verificar que el área exista
			const areaExist = await AreasModel.getById({ id: area });
			if (!areaExist) return res.status(404).json({ message: 'Área no encontrada' });
	
			// Determinar estado
			const entrada = areaExist.horaEntrada;
			const estado = AsistenciaController.determinarEstado(entrada, horaEntrada);
	
			// Crear y guardar asistencia
			const asistenciaSave = await AsistenciaModel.create({
				idUsuario: usuario,
				fecha,
				horaEntrada,
				estado
			});
	
			// Responder con éxito
			res.json({
				message: 'Asistencia guardada con éxito',
			});
	
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Error al ingresar datos', error: error.message });
		}
	}
	static async salidaRegistro(req, res){
		try{
			const idUsuario = req.params.id
			const {horaSalida} = req.body

			const asistenciaIncompleta = await Asistencia.findOne({
				idUsuario,
				horaSalida : "--:--"
			}).sort({ createdAt: -1});

			if(!asistenciaIncompleta) {
				return res.status(400).json({
					message : 'No tienes asistencias abiertas.'
				})
			}

			

			const asistenciaUpdate = await AsistenciaModel.updateSalida(
				{_id: asistenciaIncompleta._id, 
				horaSalida});
			res.json({
				message: 'Salida agregada',
				asistencia: asistenciaUpdate.horaSalida
			})
		} catch (error){
			res.status(500).json({
				message: error
			})
		}
	}

	static determinarEstado(entrada, horaEntrada){
		// Descomponemos la hora para conocer la cantidad exacta del tiempo de cada hora
		const [entradaHoras, entradaMinutos] =  entrada.split(':').map(Number);
		const [horaEntradaH, horaEntradaM] =  horaEntrada.split(':').map(Number);

		const tiempoEntrada = entradaHoras * 60 + entradaMinutos;
		const tiempoHoraEntrada = horaEntradaH * 60 + horaEntradaM;

		let estado;
		if(tiempoEntrada < tiempoHoraEntrada){
			estado = "Retardo";
		} else {
			estado = "Puntual";
		}
		return estado;
	}

	
}