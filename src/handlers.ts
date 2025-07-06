import { Request, Response } from 'express';
import { crearUsuario, Usuario } from './models/usuario';
import { JSONResponse } from './models/jsonRes';
import { UsuarioService } from './services/usuario';

export const registrarUsuario = async (req: Request, res: Response) => {
  
  try {
    
    const datosDelCliente: Usuario = req.body;
    const nuevoUsuario = crearUsuario(datosDelCliente);
    const respuesta: JSONResponse = {
      menssage: `registro exitoso de nuevo usuario ${nuevoUsuario.email}`,
      error: false,
    }
    // Utiliza el servicio para crear el usuario en la base de datos
    const nuevoUsuarioDB = await UsuarioService.crearUsuario(nuevoUsuario);     
    console.log('Usuario guardado en la base de datos:', nuevoUsuarioDB);

    res.status(201).json(
      respuesta
    );

  } catch (error: any) {
     const respuesta: JSONResponse = {
      menssage: `Fallo: el usuario no pudo registrarse en el sistema`,
      error: false,
    }
    console.error('Error al registrar usuario:', error.message);
    res.status(500).json({ 
      respuesta
    });
  }
};

export const iniciarSesion = async (req: Request, res: Response) => {
  
  try {
    
    const datosDelCliente: Usuario = req.body;
    const nuevoUsuario = crearUsuario(datosDelCliente);
    const respuesta: JSONResponse = {
      menssage: `registro exitoso de nuevo usuario ${nuevoUsuario.email}`,
      error: false,
    }
    // Utiliza el servicio para crear el usuario en la base de datos
    const nuevoUsuarioDB = await UsuarioService.crearUsuario(nuevoUsuario);     
    console.log('Usuario guardado en la base de datos:', nuevoUsuarioDB);

    res.status(201).json(
      respuesta
    );

  } catch (error: any) {
     const respuesta: JSONResponse = {
      menssage: `Fallo: el usuario no pudo registrarse en el sistema`,
      error: false,
    }
    console.error('Error al registrar usuario:', error.message);
    res.status(500).json({ 
      respuesta
    });
  }
};


