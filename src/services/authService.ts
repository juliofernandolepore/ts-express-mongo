import * as bcrypt from 'bcrypt';
import { Login } from '../models/login'; // Importa tu interfaz ILogin

const SALT_ROUNDS = 10;

export const hashPassword = async (plainPassword: string): Promise<string> => {
    try {
        const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);
        return hashedPassword;
    } catch (error) {
        console.error("Error al hashear la contraseña:", error);
        throw new Error("No se pudo hashear la contraseña.");
    }
};

export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (error) {
        console.error("Error al comparar contraseñas:", error);
        throw new Error("Error al intentar comparar las contraseñas.");
    }
};

// Ejemplo de cómo podrías usarlo en un proceso de registro:
export async function registerUser(loginData: Login): Promise<Login> {
    try {
        const hashedPassword = await hashPassword(loginData.password);
        const newUser = {
            ...loginData,
            password: hashedPassword
        };
        // Aquí deberías guardar newUser en tu base de datos
        console.log("Usuario a guardar (con contraseña hasheada):", newUser);
        return newUser; // O lo que tu función de registro devuelva
    } catch (error) {
        console.error("Error en el registro del usuario:", error);
        throw error;
    }
}