"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('¡Bienvenido a la API! Esta es la ruta principal.');
});
router.get('/api/saludo/:nombre', (req, res) => {
    const nombre = req.params.nombre; // Obtiene el parámetro 'nombre' de la URL.
    res.send(`¡Hola, ${nombre}! Saludos desde la API.`);
});
// Ruta home
router.get('/', (req, res) => {
    res.send('¡Hola desde tu backend Express con TypeScript!');
});
// Ruta usuarios
router.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
    ];
    res.json(users);
});
router.post('/api/datos', (req, res) => {
    const datosRecibidos = req.body; // Accede al cuerpo de la solicitud.
    console.log('Datos recibidos (POST):', datosRecibidos);
    res.json({
        mensaje: 'Datos recibidos con éxito',
        tusDatos: datosRecibidos
    });
});
router.get('/api/info', (req, res) => {
    res.status(200).json({
        version: '1.0.0',
        descripcion: 'Una API de ejemplo para demostrar la modularización de rutas.',
        fecha: new Date().toISOString()
    });
});
exports.default = router;
