export interface Login {
    email: string; // el email es el usuario para este sistema
    password: string;
}

export type rol = "jefe" | "empleado" | "sin permisos";

export function crearSesion(datosUsuario: Login): Login {
  const sesion: Login = {
    ...datosUsuario,
  };
  return sesion
}

export interface acceso {
    acceso: rol
}