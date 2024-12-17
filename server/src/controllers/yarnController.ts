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

export async function getYarns(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection("yarn");

  let filter = {};
  const tags = req.query.tag;
  if (tags && tags.length > 0) {
    filter = {tags};
  }

  const cursor = await collection.find(filter)
    ?.skip(Number.parseInt(req.query.from) || 0)
    ?.limit(Number.parseInt(req.query.size) || 20)?.toArray();
  if (cursor) {
    res.status(200).send(cursor);
  } else {
    res.status(404).send('No matching document found');
  }
}

export async function saveYarn(req, res) {
  const db = await connectToDatabase();
  const yarn: Yarn = req.body;
  const collection = db.collection("yarn");

  let result;
  if (!!yarn.id) {
    result = await collection.findOneAndUpdate({_id: new ObjectId(yarn.id)},
      {$set: yarn},
      {returnDocument: "after"}           // 업데이트 후의 값 반환
    );
  } else {
    result = await collection.insertOne(yarn);
  }

  res.status(201).json({
    success: true,
    data: result
  });
}

export async function deleteYarn(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection("yarn");

  const id = req.query.id;
  const result = await collection.deleteOne({_id: new ObjectId(id)});

  res.status(200).json({
    success: result.acknowledged
  });
}