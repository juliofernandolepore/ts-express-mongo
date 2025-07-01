import express from 'express';
import router from './rutas';

const app = express();
const port = process.env.PORT || 3000;


// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());
// paso el objeto router como parametro contiene todos los endpoints
app.use(router);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});