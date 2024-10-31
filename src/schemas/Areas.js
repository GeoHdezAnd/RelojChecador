import {Schema, model} from 'mongoose';

const areaSchema =  new Schema({
	nombre: {
		type: String,
		require: true,
		unique: true,
		trim: true
	},
	horaEntrada: {
		type: String,
		require: true,
		trim: true
	},
	horaSalida: {
		type: String,
		require: true,
		trim: true
	}
},{
	timestamps: true,  // Crea automáticamente los campos createdAt y updatedAt
	collection: 'area'
});

const Area =  model('Area', areaSchema);
export default Area;