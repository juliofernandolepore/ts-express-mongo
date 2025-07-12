import { Request, Response, NextFunction} from 'express';
import { JSONRespuesta } from './models/jsonRes';
import { Login } from './models/login';
import { IAuthResponse } from './tokens/tokens';
import * as jwt from 'jsonwebtoken';
import { Usuario } from './models/usuario';
import { findUserByEmail } from './services/usuario';

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

// unica responsabilidad verificar la existencia de usuario y rol y crear un token especifico (acceso para jefe y empleado)
export const accesoCompartido = async (req: Request, res: Response, next: NextFunction) => { 
  const respuesta: JSONRespuesta = JSONRespuesta.vacio(); 
  const {_token} = req.cookies // desestructuro // verificar la existencia de token
  if (!_token){
    respuesta.modificar(true, "no existe ningun token de acceso");     
    res.status(401)
    res.json(respuesta) // primero declaro el status y luego envio el json
    return // (opcional)  res.redirect('/usuario/autenticar')    
  }
  try {
    // comprobar token recibido
    const llave: any = process.env.JWT_SECRET
    if (llave == undefined){
      return
    }
    // token decodificado // contrasta con la llave para determinar si es valido
    const resultado: any = jwt.verify(_token, llave);
    const usuarioConsultado: Usuario | null = await findUserByEmail(resultado.usuarioempleado)
    if (usuarioConsultado == null){
      respuesta.modificar(true, "usuario no registrado")
      res.status(404)
      res.json(respuesta)
      return
    }
  } catch (error) {
    res.clearCookie(_token)
  }
  next();
};

export const accesoJefe = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const login: Login = req.body
        const respuesta: JSONRespuesta = JSONRespuesta.vacio()
      if (login.email == "juliofernandolepore@gmail.com") {
          console.log("usuario vetado")
          respuesta.message= "usuario vetado" 
          respuesta.error= true
          res.status(401).json(respuesta)
          return
          }    
    
         }
    catch (error: any) {
     const respuesta: JSONRespuesta = JSONRespuesta.vacio();
     respuesta.modificar(true, "fallo la autenticacion")
     console.error('Error verificar el permiso:', error.message);
      res.status(500).json({respuesta});
    return
  }      
    next();   
};


// midlleware a modo de ejemplo, express resuelve por si el tema del metodo
export const metodoValido = (metodo: string) => { 
  return (req: Request, res: Response, next: NextFunction) => {
        if (req.method !== metodo) {
           const respuesta: JSONRespuesta = JSONRespuesta.vacio();
           respuesta.modificar(true, `metodo incorrecto, ingrese el metodo: ${metodo}`)    
           res.status(405)
           res.json(respuesta)
           return
         }   
  next();
}};