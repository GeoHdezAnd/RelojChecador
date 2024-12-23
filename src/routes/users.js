import { Router } from "express";
import { authenticateSession } from "../middlewares/authenticateSesion.js";

const router = Router();

router.get('/login', (req, res) =>{
	res.render('index', {layout: 'login'});
});


router.get('/dashboard', authenticateSession, (req, res) =>{
	res.render('dashboard')
})

router.get('/trabajadores', authenticateSession, (req, res) =>{
	res.render('trabajadores') 
})

router.get('/configuracion', authenticateSession, (req, res) =>{
	res.render('configuracion') 
})

export default router;