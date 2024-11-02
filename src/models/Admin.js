import Admin from "../schemas/Admin.js";

export class AdminModel{
	static async log({email, password}){
		const admin = await Admin.findOne({email});
		
	}
}