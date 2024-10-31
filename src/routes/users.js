import { Router } from "express";

const router = Router();

router.get('/login', (req, res) =>{
	res.render('index', {layout: 'login'});
});

router.get('/registro', (req, res) =>{
	res.render('register', {layout: 'login'});
});

router.get('/dashboard', (req, res) =>{
	res.render('dashboard')
})

router.get('/trabajadores', (req, res) =>{
	res.render('trabajadores') 
})

router.get('/asistencias', (req, res) =>{
	res.render('asistencias') 
})

router.get('/configuracion', (req, res) =>{
	res.render('configuracion') 
})

export default router;