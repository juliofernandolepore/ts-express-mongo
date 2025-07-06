import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "super.secreto";

export interface IAuthResponse {
    message: string;
    token: string;
    user: {
        email: string;
        rol: "jefe" | "empleado" | "sin permisos";
    };
}

export const generateToken = (payload: IAuthResponse): string => {
    // definir una expiración para el token, por ejemplo, '1h' (1 hora), '7d' (7 días)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
    return token;
};