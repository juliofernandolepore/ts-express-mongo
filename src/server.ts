import express from 'express';
import router from './rutas';
import { connectToDatabase } from './config/database';
import * as dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());
// paso el objeto router como parametro contiene todos los endpoints
app.use(router);

connectToDatabase()
.then(() => {
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error("Error crítico: No se pudo conectar a la base de datos. Servidor no iniciado.", error);
        process.exit(1); // Termina la aplicación si la conexión a la DB falla
    });

app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});