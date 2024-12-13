import {Db, MongoClient} from 'mongodb';
import { configDotenv } from "dotenv";

configDotenv();

const dbUser = process.env.MONGO_DB_USER;
const dbPwd = process.env.MONGO_DB_PWD;
const dbAppName = process.env.MONGO_DB_APP_NAME;

const uri = `mongodb+srv://${dbUser}:${dbPwd}@${dbAppName}.nauck.mongodb.net/?retryWrites=true&w=majority&appName=${dbAppName}`;

const client = new MongoClient(uri);

let database: Db;
export async function connectToDatabase() {
  if(!database) {
    await client.connect();
    console.log('connected to MongoDB success');
    try {
      database = client.db('sample_mflix');
    } catch (error) {
      console.error('error occur: MongoDB Connect Fail');
    }
  }
  return database;
}
