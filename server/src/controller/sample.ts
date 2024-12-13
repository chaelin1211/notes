import {connectToDatabase} from "../configuration/db_connection.js";

export async function getMovies(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection("movies");

  const query = {};
  const result = await collection.findOne(query);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send('No matching document found');
  }
}