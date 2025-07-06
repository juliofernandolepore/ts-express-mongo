import { Router, Request, Response } from 'express';
import * as handlers from './handlers';
import * as middlewares from './middleware';

const router = Router();

router.post('/usuario/registrar', handlers.registrarUsuario);
router.post('/usuario/iniciarsesion', handlers.iniciarSesion);

export default router;