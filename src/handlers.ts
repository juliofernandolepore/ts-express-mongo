import { Request, Response } from 'express';
import { crearUsuario, Usuario } from './models/usuario';
import { crearSesion } from './models/login';
import { JSONResponse } from './models/jsonRes';
import { findUserByEmail, getAllUsuarios, updateRolToEmpleado, UsuarioService } from './services/usuario';
import { Login } from './models/login';
import { compararPassword } from './utils/comparePasswords';

export const registrarUsuario = async (req: Request, res: Response) => {
  
  try {
    
    const datosDelCliente: Usuario = req.body;
    const nuevoUsuario = crearUsuario(datosDelCliente);
    const respuesta: JSONResponse = {
      message: `registro exitoso de nuevo usuario ${nuevoUsuario.email}`,
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
      message: `Fallo: el usuario no pudo registrarse en el sistema`,
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
      // instancio un objeto vacio
      const respuesta: JSONResponse = {
      message: "",
      error: false,
    }   
    // relleno un objeto login    
    const datosDelCliente: Login = req.body;
    const login = crearSesion(datosDelCliente);
     // instancio un objeto Usuarioservice
    const resultado: Usuario | null = await findUserByEmail(login.email)
    console.log(resultado);
    // validar longitud de usuario y password (datos cliente contra resultado)
    if (resultado == null) { // Asumiendo que findUserbyEmail devuelve null/undefined si no se encuentra
            respuesta.message = "No esta registrado.";
            respuesta.error = true;
            res.status(401).json(respuesta); // 401 No autorizado
            return
        }

        // Añadir comparación de contraseña aquí (ej. usando bcrypt)
        const isPasswordValid: Boolean = compararPassword(login.password, resultado.password);
        if (!isPasswordValid) {
            respuesta.message = "Usuario o contraseña invalidas.";
            respuesta.error = true;
            res.status(401).json(respuesta);
            return
        }
    if (resultado.rol != "jefe" && resultado.rol != "empleado") {
      respuesta.message = "usuario sin permisos suficientes.";
      respuesta.error = true;
      res.status(401).json(respuesta);
      return
    } 
    // si esta registrado y tiene rol (empleado o jefe ) con acceso crear token personalizado 
    respuesta.message = "el usuario esta registradp, se le enviara token de acceso"
    respuesta.error = false
    res.status(201).json(respuesta);
    
  } catch (error: any) {
     const respuesta: JSONResponse = {
      message: `Fallo: el usuario no pudo ingresar en el sistema`,
      error: false,
    }
    console.error('Error al iniciar sesion:', error.message);
    res.status(500).json({ 
      respuesta
    });
  }
};

export const convertirEmpleado = async (req: Request, res: Response) => {
    try {
      // instancio un objeto vacio
      const respuesta: JSONResponse = {
      message: "",
      error: false,
    }   
    // relleno un objeto login    
    const datosDelCliente: Login = req.body;
    const login = crearSesion(datosDelCliente);
     // instancio un objeto Usuarioservice
    const resultado: Usuario | null = await findUserByEmail(login.email)
    console.log(resultado);
    // validar longitud de usuario y password (datos cliente contra resultado)
    if (resultado == null) { // Asumiendo que findUserbyEmail devuelve null/undefined si no se encuentra
            respuesta.message = "No esta registrado.";
            respuesta.error = true;
            res.status(401).json(respuesta); // 401 No autorizado
            return
        }

    // Añadir comparación de contraseña aquí (ej. usando bcrypt)
    const isPasswordValid: Boolean = compararPassword(login.password, resultado.password);
    if (!isPasswordValid) {
            respuesta.message = "Usuario o contraseña invalidas.";
            respuesta.error = true;
            res.status(401).json(respuesta);
            return
        }
    if (resultado.rol != "jefe" && resultado.rol != "empleado") {
      // colocar una consulta update
      const update: boolean | null = await updateRolToEmpleado(resultado.email)
    if (update == null){
        respuesta.message = "no pudo cambiarse el rol (null).";
        respuesta.error = true;
        res.status(401).json(respuesta);
        return
      }
    if (update == false){
        respuesta.message = "no pudo cambiarse el rol (false).";
        respuesta.error = true;
        res.status(401).json(respuesta);
        return
      }  
      respuesta.message = "usuario con nuevo permiso de empleado.";
      respuesta.error = false;
      res.status(201).json(respuesta);
      return
    } 
    // si esta registrado y tiene rol (empleado o jefe ) con acceso crear token personalizado 
    respuesta.message = "el usuario esta registrado"
    respuesta.error = false
    res.status(201).json(respuesta);
    
  } catch (error: any) {
     const respuesta: JSONResponse = {
      message: `Fallo: el usuario no pudo ingresar en el sistema`,
      error: false,
    }
    console.error('Error al iniciar sesion:', error.message);
    res.status(500).json({ 
      respuesta
    });
  }
};


export const handlerVerAllUsuarios = async (req: Request, res: Response) =>{
   try {
    const respuesta: JSONResponse = {message: "", error: false,}          
    const datosDelCliente: Login = req.body;
    const login = crearSesion(datosDelCliente);
    const resultado: Usuario[] | null = await getAllUsuarios()
    if (resultado == null) {
            respuesta.message = "no hay usuarios registrados.";
            respuesta.error = true;
            res.status(404).json(respuesta);
            return
        }  
    // si hay un resultado valido o un arreglo vacio 
    respuesta.message = "resultado de la busqueda de todos los usuarios registrados"
    respuesta.error = false
    respuesta.data = resultado
    res.status(201).json(respuesta);
    
  } catch (error: any) {
     const respuesta: JSONResponse = {
      message: `Fallo: ocurrio un problema en la consulta ver todos los usuarios`,
      error: false,
    }
    console.error('Error al traer todos los usuarios:', error.message);
    res.status(500).json({ 
      respuesta
    });
  }
  
};

