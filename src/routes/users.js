import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();

router.get('/login', (req, res) =>{
	res.render('index', {layout: 'login'});
});

router.get('/registro', (req, res) =>{
	res.render('register', {layout: 'login'});
});

router.get('/dashboard', authenticateToken, (req, res) =>{
	res.render('dashboard')
})

router.get('/trabajadores', authenticateToken, (req, res) =>{
	res.render('trabajadores') 
})

router.get('/asistencias', authenticateToken, (req, res) =>{
	res.render('asistencias') 
})

router.get('/configuracion', authenticateToken, (req, res) =>{
	res.render('configuracion') 
})

export default router;