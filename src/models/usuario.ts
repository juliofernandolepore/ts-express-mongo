/**
 * @interface Usuario
 * @description Define la estructura de un objeto de usuario.
 */

export interface Usuario {
  id?: string;
  dni?: number;
  nombre: string;
  apellido: string;
  password: string;
  email: string;
  domicilio?: string;
  telefono?: string;
  sucursal?: string;
  rol?: string;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}

export function crearUsuario(datosUsuario: Usuario): Usuario {
  const nuevoUsuario: Usuario = {
    ...datosUsuario,
    rol: "sin permisos",
    fechaCreacion: datosUsuario.fechaCreacion || new Date(),
    fechaActualizacion: new Date(),
  };
  return nuevoUsuario
}