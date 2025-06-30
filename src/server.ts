import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

// Ruta home
app.get('/', (req, res) => {
  res.send('¡Hola desde tu backend Express con TypeScript!');
});

// Ruta usuarios
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];
  res.json(users);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});