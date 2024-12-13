import {connectToDatabase} from "../configurations/db_connection.js";
import {ObjectId} from 'mongodb';

export async function getMovies(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection("movies");

  const id = req.query.id;
  const result = await collection.findOne({_id: new ObjectId(id)});

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send('No matching document found');
  }
}

export async function setMovie(req, res) {
  const db = await connectToDatabase();
  const {title, cast, year} = req.body;

  const collection = db.collection("movies");
  const result = await collection.insertOne({title, cast, year});
  res.status(201).json({message: 'Document inserted', insertedId: result.insertedId});
}