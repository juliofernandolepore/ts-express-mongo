import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "super.secreto";

export interface IAuthResponse {
    id_usuario?: string;
    nombreEmpleado: string;
    permisos: string;
    localComercial?: string;
    usuarioempleado: string;
    fechaCreacion?: Date
};

export const generarToken = (payload: IAuthResponse): string => {
    // definir una expiración para el token, por ejemplo, '1h' (1 hora), '7d' (7 días)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
    return token;
};

export const verifToken = (token: string, llave: string | undefined) => {
    if (llave == undefined){
        llave = ""
        return "la llave es undefined"
    }
    if (llave.length < 1){
        console.log("la llave esta vacia")
        return "la llave esta vacia"
    }
    if (token.length < 1){
        console.log("el token esta vacio")
        return "el token esta vacio"
    }
    const jwtDecodificado = jwt.verify(token, llave)
    return jwtDecodificado
};