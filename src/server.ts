import express from 'express';
import router from './rutas';
import { connectToDatabase } from './config/database';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// uso de cors (fase desarrollo)
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use('/', router);

connectToDatabase()
.then(() => {
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error("Error crítico: No se pudo conectar a la base de datos. Servidor no iniciado.", error);
        process.exit(1);
    });