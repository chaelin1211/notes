import {connectToDatabase} from "../configurations/db_connection.js";
import {ObjectId} from 'mongodb';

export async function getYarn(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection("yarn");

  const id = req.query.id;
  const result = await collection.findOne({_id: new ObjectId(id)});

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send('No matching document found');
  }
}

export async function setYarns(req, res) {
  const db = await connectToDatabase();
  const yarn: Yarn = req.body;

  const collection = db.collection("yarn");
  const result = await collection.insertOne(yarn);
  res.status(201).json({
    success: true,
    data: {id: result.insertedId}
  });
}