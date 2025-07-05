import { Request, Response } from 'express';

export const info = (req: Request, res: Response) => {
  res.status(200).json({
    version: '1.0.0',
    descripcion: 'Una API de ejemplo para demostrar la modularización de rutas.',
    fecha: new Date().toISOString()
  });
}

export const datos = (req: Request, res: Response) => {
  const datosRecibidos = req.body; // Accede al cuerpo de la solicitud.
  console.log('Datos recibidos (POST):', datosRecibidos);
  res.json({
    mensaje: 'Datos recibidos con éxito',
    tusDatos: datosRecibidos
  }) };

export const getRoot = (req: Request, res: Response) => {
  res.send('¡Bienvenido a la API! Esta es la ruta principal.');
};

export const getSaludoConNombre = (req: Request, res: Response) => {
  const nombre = req.params.nombre; // Obtiene el parámetro 'nombre' de la URL.
  res.send(`¡Hola, ${nombre}! Saludos desde la API.`);
};


export const getHome = (req: Request, res: Response) => {
  res.send('¡Hola desde tu backend Express con TypeScript!');
};

export const getUsers = (req: Request, res: Response) => {
  const users = [
    { id: 1, name: 'Julio' },
    { id: 2, name: 'Maria' } 
  ];
  res.json(users); // parsea a json
};
