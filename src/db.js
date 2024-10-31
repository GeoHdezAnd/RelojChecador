import { connect } from "mongoose";

export const connectDB = async () =>{
	try {
		await connect('mongodb://localhost:27017/reloj-db-app');
		console.log('conectado a la base');
	} catch (error) {
		console.log('No se conecto');
	}
	
}