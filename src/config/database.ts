import { MongoClient, Db, Collection } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

// Define una interfaz para las colecciones que usarás
// Esto te ayudará con el tipado en tu aplicación
export interface MongoCollections {
    users?: Collection; // Ejemplo: Si tienes una colección de 'users'
    // Puedes añadir más colecciones aquí según las necesites:
    // products?: Collection;
    // orders?: Collection;
}

// Objeto para almacenar las referencias a tus colecciones
// Se exporta para que puedas acceder a ellas desde otras partes de tu aplicación
export const collections: MongoCollections = {};

export async function connectToDatabase(): Promise<void> {
    const uri = process.env.MONGO_URI; 
    const dbName = process.env.DB_NAME || "db1";

    if (!uri) {
        console.error("Error: La variable de entorno MONGO_URI no está definida en el archivo .env.");
        process.exit(1); // Termina la aplicación si no hay URI de conexión
    }

    try {
        const client: MongoClient = new MongoClient(uri);
        await client.connect(); // Conecta el cliente a MongoDB

        // Obtiene una referencia a la base de datos.
        // Si la URI incluye el nombre de la DB (ej. /my_application_db),
        // client.db() la usará. De lo contrario, puedes pasar el nombre: client.db(dbName).
        const db: Db = client.db();

        // Asigna las referencias a tus colecciones para fácil acceso
        // Asegúrate de que "users" coincida con el nombre real de tu colección en MongoDB
        collections.users = db.collection("users");

        console.log(`Conectado exitosamente a la base de datos: ${db.databaseName}`);
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        process.exit(1); // Termina la aplicación si hay un error de conexión
    }
}