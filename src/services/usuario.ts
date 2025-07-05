import { Collection, ObjectId } from 'mongodb';
import { Usuario } from '../models/usuario'; 
import { getDb } from '../config/database'; // Importa la función para obtener la DB


const getUsuariosCollection = (): Collection<Usuario> => {
  return getDb().collection<Usuario>('usuarios');
};

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
  }

};