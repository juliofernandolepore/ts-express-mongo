import { Collection, ObjectId } from 'mongodb';
import { Usuario } from '../models/usuario'; 
import { getDb } from '../config/database'; // Importa la función para obtener la DB
import { Login } from '../models/login';


const getUsuariosCollection = (): Collection<Usuario> => {
  return getDb().collection<Usuario>('usuarios');
};


// funciones de un objeto usuarioService
export const UsuarioService = {

  async crearUsuario(datosUsuario: Usuario): Promise<Usuario> {
    try {
      const collection = getUsuariosCollection();
      // efectuar validaciones y hashear el password
      if (!datosUsuario.dni || !datosUsuario.email || !datosUsuario.password) {
        throw new Error('DNI, correo electrónico y contraseña son obligatorios.');
      }

      // Añadir marcas de tiempo manualmente si no las incluye el cliente
      const usuarioAInsertar: Usuario = {
        ...datosUsuario,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      };

      const result = await collection.insertOne(usuarioAInsertar);
      if (result.acknowledged) {
        // Recuperar el documento insertado para devolverlo
        const insertedUser = await collection.findOne({ _id: result.insertedId });
        if (insertedUser) {
          return usuarioAInsertar;
        }
      }
      throw new Error('Error desconocido al insertar el usuario.');
    } catch (error: any) {
      // Manejo de errores específicos del driver de MongoDB (ej. duplicados por índices únicos)
      if (error.code === 11000) { // Error de clave duplicada
        if (error.message.includes('dni')) {
          throw new Error('El DNI ya está registrado.');
        }
        if (error.message.includes('email')) {
          throw new Error('El correo electrónico ya está registrado.');
        }
      }
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  },

  
};


// funcion independiente de encontrar usuario por email
export const findUserByUsername = async (userEmail: string): Promise<Login | null> => {
    // email y username son lo mismo en este schema
    try {
        const collection = getUsuariosCollection();
        if (!collection) {
            // Asegúrate de que la colección esté disponible
            throw new Error("La colección 'usuarios' no está inicializada. Asegúrate de llamar a connectToDatabase() primero.");
        }

        const user = await collection.findOne<Login>(
            { email: userEmail }, // Criterio de búsqueda: busca por el campo 'email'
            { projection: { email: 1, password: 1, rol: 1, _id: 0 } } // Proyección: 1 para incluir, 0 para excluir
        );
        return user;
    } catch (error) {
        console.error("Error al buscar usuario por email:", error);
        throw error; // Vuelve a lanzar el error para que quien llame a la función lo maneje
    }
}

export const findUserByEmail = async (userEmail: string): Promise<Usuario | null> => {
  try {
    const collection = getUsuariosCollection(); // Obtiene la colección

    const consulta = await collection.findOne(
      { email: userEmail }, // Criterio de búsqueda: busca por el campo 'email'
      {
        projection: {
          _id: 1,        // Incluir el ID de MongoDB
          nombre: 1,
          apellido: 1,
          password: 1,   // Incluir el password (hash)
          rol: 1,
          sucursal: 1,
          email: 1       // Asegurarse de incluir el email también si es necesario
        },
      }
    );

    if (!consulta) {
      return null; // Usuario no encontrado
    }

    // Mapea el documento de MongoDB a la interfaz IAuthUser para una salida limpia
    const usuarioConsultado: Usuario = {
      id: consulta._id.toString(), // Convierte ObjectId a string
      email: consulta.email,
      nombre: consulta.nombre,
      apellido: consulta.apellido,
      password: consulta.password!, // Asumimos que password existirá aquí, si no, manejarlo
      rol: consulta.rol,
      sucursal: consulta.sucursal,
    };

    return usuarioConsultado;

  } catch (error) {
    console.error('Error al buscar usuario por email en la base de datos:', error);
    // Vuelve a lanzar el error para que quien llame a la función lo maneje
    throw new Error('No se pudo verificar la existencia del usuario por email.');
  }
}

export const updateRolToEmpleado = async (email: string): Promise<boolean | null> => {
    try {
        const collection = getUsuariosCollection(); // coleccion de usuarios

        // Define the filter to find the user by email
        const filter = { email: email };

        // Define the update operation
        const updateDoc = {
            $set: {
                rol: "empleado" // Set the rol field to "empleado"
            }
        };

        // Perform the update operation
        const result = await collection.updateOne(filter, updateDoc);

        // Check if the document was found and modified
        if (result.matchedCount === 0) {
            console.warn(`No user found with email: ${email}`);
            return false; // User not found
        }
        if (result.modifiedCount === 0) {
            console.log(`User with email ${email} already has rol "empleado" or no changes were made.`);
            return false; // No modification needed or made
        }

        console.log(`Successfully updated rol for user ${email} to "empleado".`);
        return true; // Update successful

    } catch (error) {
        console.error(`Error updating rol for user ${email}:`, error);
        throw new Error(`Could not update rol for user by email: ${email}`);
    }
};