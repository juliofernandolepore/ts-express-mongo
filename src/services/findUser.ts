import { Collection, ObjectId } from 'mongodb';
import { Usuario } from '../models/usuario'; 
import { getDb } from '../config/database'; // Importa la función para obtener la DB
import { login } from '../models/login';

const getUsuariosCollection = (): Collection<Usuario> => {
  return getDb().collection<Usuario>('usuarios');
};

export const findUserByEmail = async (userEmail: string): Promise<login | null> => {
    try {
        const collection = getUsuariosCollection();
        if (!collection) {
            // Asegúrate de que la colección esté disponible
            throw new Error("La colección 'usuarios' no está inicializada. Asegúrate de llamar a connectToDatabase() primero.");
        }

        const user = await collection.findOne<login>(
            { email: userEmail }, // Criterio de búsqueda: busca por el campo 'email'
            { projection: { email: 1, password: 1, rol: 1, _id: 0 } } // Proyección: 1 para incluir, 0 para excluir
        );
        return user;
    } catch (error) {
        console.error("Error al buscar usuario por email:", error);
        throw error; // Vuelve a lanzar el error para que quien llame a la función lo maneje
    }
}