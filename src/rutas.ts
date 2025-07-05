import { Router, Request, Response } from 'express';
import * as handlers from './handlers';
import * as middlewares from './middleware';

const router = Router();

router.get('/api/log', middlewares.requestLogger, handlers.getHome);
router.get('/api/saludo/:nombre', handlers.getSaludoConNombre);
router.get('/', handlers.getRoot);
router.get('/api/users', middlewares.requestLogger, handlers.getUsers);
router.post('/api/datos', handlers.datos);
router.get('/api/info', middlewares.requestLogger, handlers.info);

export default router;