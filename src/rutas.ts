import { Router, Request, Response } from 'express';


const router = Router();


router.get('/', (req: Request, res: Response) => {
  res.send('¡Bienvenido a la API! Esta es la ruta principal.');
});


router.get('/api/saludo/:nombre', (req: Request, res: Response) => {
  const nombre = req.params.nombre; // Obtiene el parámetro 'nombre' de la URL.
  res.send(`¡Hola, ${nombre}! Saludos desde la API.`);
});

// Ruta home
router.get('/', (req:Request, res: Response) => {
  res.send('¡Hola desde tu backend Express con TypeScript!');
});

// Ruta usuarios
router.get('/api/users', (req: Request, res: Response) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];
  res.json(users);
});


router.post('/api/datos', (req: Request, res: Response) => {
  const datosRecibidos = req.body; // Accede al cuerpo de la solicitud.
  console.log('Datos recibidos (POST):', datosRecibidos);
  res.json({
    mensaje: 'Datos recibidos con éxito',
    tusDatos: datosRecibidos
  });
});


router.get('/api/info', (req: Request, res: Response) => {
  res.status(200).json({
    version: '1.0.0',
    descripcion: 'Una API de ejemplo para demostrar la modularización de rutas.',
    fecha: new Date().toISOString()
  });
});


export default router;