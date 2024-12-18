import { connectToDatabase } from "../configurations/db_connection.js";
import { ObjectId } from "mongodb";
import ApiResponse from "../models/ApiResponse.js";
import { logger } from "../configurations/logger.js";

export async function getYarn(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection("yarn");

  const id = req.query.id;
  try {
    const result = await collection.findOne({ _id: new ObjectId(id) });

    res.status(200).send(new ApiResponse(true, result));
  } catch (e) {
    logger.error(e);
    res.status(200).send(new ApiResponse(false));
  }
}

export async function getYarns(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection("yarn");

  let filter = {};
  const tags = req.query.tag;
  if (tags && tags.length > 0) {
    filter = { tags };
  }

  const resultList = await collection
    .find(filter)
    ?.skip(Number.parseInt(req.query.from) || 0)
    ?.limit(Number.parseInt(req.query.size) || 20)
    ?.toArray();

  res.status(200).send(new ApiResponse(true, resultList));
}

export async function saveYarn(req, res) {
  const db = await connectToDatabase();
  const yarn = req.body;
  const collection = db.collection("yarn");

  let result: boolean;
  if (!!yarn.id) {
    const updateResult = await collection.updateOne(
      { _id: new ObjectId(yarn.id) },
      { $set: yarn },
    );
    result = updateResult.acknowledged;
  } else {
    const insertOneResult = await collection.insertOne(yarn);
    result = insertOneResult.acknowledged;
  }

  res.status(201).json(new ApiResponse(result));
}

export async function deleteYarn(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection("yarn");

  const id = req.query.id;
  const result = await collection.deleteOne({ _id: new ObjectId(id) });

  res.status(200).json(new ApiResponse(result.acknowledged));
}
