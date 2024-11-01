import  { Schema, model, mongoose } from "mongoose";
import Trabajador from "./Trabajadores.js";

const asistenciaSchema = new Schema({
	idUsuario: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Trabajador',
		require: true,
	},
	fecha: { type: Date, required: true },
	horaEntrada: { type: String, required: true },
	estado: { type: String, default: "Pendiente" }
},{
	timestamps: true,  // Crea automáticamente los campos createdAt y updatedAt
	collection: 'asistencia'
})

const Asistencia = model('Asistencia', asistenciaSchema);
export default Asistencia;