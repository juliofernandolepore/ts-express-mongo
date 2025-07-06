export interface login {
    _id?: any;
    usuario: string;
    password: string;
    rol?: rol
}

export type rol = "jefe" | "empleado" | "sin permisos";

export interface acceso {
    acceso: rol
}