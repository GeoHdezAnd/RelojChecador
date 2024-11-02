import jwt from 'jsonwebtoken';

const SECRET_KEY = 'MIBFMV';

export const authenticateToken = (req, res, next) => {
	const token = req.headers['authorization']?.split(' ')[1]; // Elimina el punto y coma extra
	console.log('token', token);
	if (!token) {
		return res.status(401).json({ message: 'Acceso denegado' }); // Cambia a 401 Unauthorized
	}

	try {
		const decodedToken = jwt.verify(token, SECRET_KEY);
		req.userId = decodedToken.id;
		next();
	} catch (error) {
		res.status(403).json({ message: 'Token no válido' }); // Cambia a 403 Forbidden
	}
};
