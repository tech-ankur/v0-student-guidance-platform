import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

export async function getDatabase() {
  const client = await clientPromise
  return client.db("guidance_platform")
}

export async function findById(collection: string, id: string) {
  const db = await getDatabase()
  return await db.collection(collection).findOne({ _id: new ObjectId(id) })
}

export async function findMany(collection: string, filter = {}, options = {}) {
  const db = await getDatabase()
  return await db.collection(collection).find(filter, options).toArray()
}

export async function insertOne(collection: string, document: any) {
  const db = await getDatabase()
  return await db.collection(collection).insertOne(document)
}

export async function updateOne(collection: string, filter: any, update: any) {
  const db = await getDatabase()
  return await db.collection(collection).updateOne(filter, update)
}

export async function deleteOne(collection: string, filter: any) {
  const db = await getDatabase()
  return await db.collection(collection).deleteOne(filter)
}

export function toObjectId(id: string) {
  return new ObjectId(id)
}

export function sanitizeDocument(doc: any) {
  if (!doc) return null
  return {
    ...doc,
    _id: doc._id?.toString(),
  }
}
