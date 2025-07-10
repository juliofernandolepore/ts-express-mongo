import { Request, Response, NextFunction } from 'express';
import { JSONResponse } from './models/jsonRes';
import { Login } from './models/login';
import { generarToken } from './tokens/tokens';

declare module 'express' {
    interface Request {
        user?: {
            id: string;
            username: string;
            email: string; // Asumiendo que el email está en el usuario
            claimRol: 'jefe' | 'empleado'; // Define los roles posibles
            // Agrega otras propiedades del usuario si las necesitas
        };
    }
}

// unica responsabilidad verificar que existe y sea usuario admin o permisos superiores
// endpoint protegidas para rol determinado
// en esta etapa solo validacion con tokens
export const jwtOnlyJefe = (req: Request, res: Response, next: NextFunction) => {
    try{
        const login: Login = req.body
      let respuesta: JSONResponse = {
      message: `ingreso exitoso de usuario ${login.email}`,
      error: false,
    }
      if (login.email == "juliofernandolepore@gmail.com") {
        console.log("usuario vetado")
         res.status(401).json({
            message: "usuario vetado",
            error: true
     })
     return
      }    
    
    }
    catch (error: any) {
     const respuesta: JSONResponse = {
      message: `Fallo: el usuario no pudo ingresar en el sistema`,
      error: false,
    }
    console.error('Error al iniciar sesion:', error.message);
    res.status(500).json({ 
      respuesta
    });
    return
  }      
    next();   
};


// unica responsabilidad verificar que existe y sea usuario empleado
// endpoint protegidas para rol determinado
// en esta etapa validacion con toneks
export const jwtOnlyEmpleado = (req: Request, res: Response, next: NextFunction) => {
  console.log(req)
  next(); 
};

// unica responsabilidad verificar la existencia de usuario y rol y crear un token especifico
export const loginGeneracionToken = (req: Request, res: Response, next: NextFunction) => {

};