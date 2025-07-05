import { Request, Response, NextFunction } from 'express';

// Middleware de ejemplo: Loggea la hora de la solicitud
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const now = new Date();
  console.log(`[${now.toLocaleString()}] ${req.method} ${req.originalUrl}`);
  res.send('middleware logger.');
  next(); // IMPORTANTE: Llama a next() para pasar el control al siguiente middleware o ruta
};

// Otro middleware de ejemplo: Valida si un parámetro existe en la query string
export const validateQueryParam = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.query[paramName]) {
      return res.status(400).send(`Error: El parámetro de consulta '${paramName}' es requerido.`);
    }
    next();
  };
};

// Middleware para verificar si el usuario es un administrador (ejemplo básico)
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // En una aplicación real, esto implicaría verificar un token, una sesión, un rol de usuario, etc.
  // Por simplicidad, aquí simulamos que el usuario es admin si hay un header 'x-admin' con valor 'true'.
  const isAdminUser = req.headers['x-admin'] === 'true';

  if (isAdminUser) {
    console.log('Usuario es administrador.');
    next();
  } else {
    console.log('Acceso denegado: No es administrador.');
    res.status(403).send('Acceso denegado. Se requiere privilegios de administrador.');
  }
};