import { Router } from "express";
import { TrabajadorController } from "../controllers/Trabajadores.js";
import { AreaController } from "../controllers/Areas.js";
import { AsistenciaController } from "../controllers/Asistencias.js";

const router = Router();

router.get('/api/trabajadores', TrabajadorController.getAll);
router.get('/api/trabajadores/:id', TrabajadorController.getById);
router.get('/api/trabajadores/matricula/:matricula', TrabajadorController.getByMatricula);
router.get('/api/areas', AreaController.getAll);
router.get('/api/areas/:id', AreaController.getById);


router.post('/api/trabajadores/nuevo-trabajador', TrabajadorController.create );
router.post('/api/areas/nueva-area', AreaController.create);
router.post('/api/asistencias/nueva-asistencia', AsistenciaController.create);

router.put('/api/trabajadores/:id', TrabajadorController.update);
router.put('/api/areas/:id', AreaController.update);
router.put('/api/asistencias/:id', AsistenciaController.salidaRegistro);

router.delete('/api/trabajadores/delete/:id', TrabajadorController.delete);
router.delete('/api/areas/delete/:id', AreaController.delete);


export default router;