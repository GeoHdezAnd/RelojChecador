import Admin from "../schemas/Admin.js";
import  bcrypt  from "bcrypt";

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

		req.session.userId = admin._id;  // o cualquier identificador único del usuario
		res.json({
			success: true, 
			message: 'Inicio exitoso',
		})
	}
}