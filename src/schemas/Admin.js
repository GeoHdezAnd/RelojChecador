import { Schema, model, trusted } from "mongoose";

const adminSchema = new Schema ({
	email:{
		type: String,
		trim: true
	},
	nombre: {
		type: String,
		trim: true
	},
	password: {
		type: String,
		trim: true
	}
},{
	collection: 'administrador'
});

const Admin =  model('Admin', adminSchema);
export default Admin;