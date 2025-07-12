import { Router, Request, Response, request } from 'express';
import * as handlers from './handlers';
import * as middlewares from './middleware';


const router = Router();
// esta ruta recibe los datos de registro unicamente
router.post('/usuario/registrar', handlers.registrarUsuario);
// esta ruta verifica la existencia del usuario y devuelve un token
// puede recibir un token existente y hacer refresh (opcional)
router.post('/usuario/autenticar', handlers.iniciarSesion);
// cada una de las rutas estan protegidas con middleware de auth por token (incluye rol)
router.post('/usuario/convertirempleado',middlewares.accesoJefe , handlers.convertirEmpleado) // handler para pruebas no accesible a empleados
router.get('/usuario/vertodos', middlewares.accesoCompartido, handlers.handlerVerAllUsuarios) // ver todos los usuarios (rol empleado o jefe)

export default router;