import { MongoClient, Db, Collection } from "mongodb";
import * as dotenv from "dotenv";
import { login } from "../models/login";

dotenv.config();

export interface MongoCollections {
    users?: Collection; 
}

export const collections: MongoCollections = {};

let db: Db;

export const connectToDatabase = async () => {
    const uri = process.env.MONGO_URI; 
    const database = process.env.DB_NAME || "db1";
    if (!uri) {
        console.error("Error: La variable de entorno MONGO_URI no está definida en el archivo .env.");
        process.exit(1); 
        }
    try {
        const client: MongoClient = new MongoClient(uri);
        await client.connect(); 
        db = client.db();
        collections.users = db.collection("usuarios");
        console.log(`Conectado exitosamente a la base de datos: ${db.databaseName}`);
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        process.exit(1); 
    }
};

export const getDb = (): Db => {
  if (!db) {
    throw new Error('Base de datos no conectada. Asegúrate de llamar a connectDB() primero.');
  }
  return db;
};