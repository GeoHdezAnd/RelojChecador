import Admin from "../schemas/Admin.js";
import  bcrypt  from "bcrypt";
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'MIBFMV';

export class AdminController {
	static async log(req, res){
		const {email, password} = req.body;
		const admin = await Admin.findOne({email});
		if(!admin){
			return res.status(400).json({message: 'Correo no encontrado '});
		}

		const isMatch = await bcrypt.compare(password, admin.password);
		if(!isMatch){
			return res.status(400).json({message: 'La contraseña no coincide'})
		}

		const token = jwt.sign({id: admin._id}, SECRET_KEY, { expiresIn: '1h'});
		console.log('TOken: ', token);
		res.json({
			success: true, 
			message: 'Inicio exitoso',
			token
		})
	}
}