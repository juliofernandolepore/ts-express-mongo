import { Request, Response, NextFunction, CookieOptions } from 'express';
import { JSONResponse } from './models/jsonRes';
import { Login } from './models/login';
import { verifToken } from './tokens/tokens';

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

// unica responsabilidad verificar la existencia de usuario y rol y crear un token especifico
export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const respuesta: JSONResponse = {error:false, message:"" }
  // verificar la existencia de token
  const {_token} = req.cookies // desestructuro
  if (!_token){
    // primero declaro el status y luego envio el json 
    res.status(401)       
    respuesta.error = true
    respuesta.message = "no existe ningun token de acceso"
    res.json(respuesta)
    return
    // (opcional)  res.redirect('/usuario/autenticar')
  }
  // comprobar token recibido
  try {
    const llave: string | undefined = process.env.JWT_SECRET
    const resultado = verifToken(_token, llave)
    console.log(resultado);
  } catch (error) {
    res.clearCookie(_token)
  }
  next();
};

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

export const jwtOnlyEmpleado = (req: Request, res: Response, next: NextFunction) => {
  console.log(req)
  next(); 
};