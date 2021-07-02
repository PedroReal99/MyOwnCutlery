import * as mongoose from 'mongoose';
import { IRepository } from './IRepository.Generic';

import { MongoClient, Db, Collection, InsertOneWriteOpResult, Cursor } from 'mongodb';

export class RepositoryBase<T> implements IRepository<T> {
  public readonly _collection: Collection;
  constructor(db: Db, collectionName: string) {
    this._collection = db.collection(collectionName);
  }
  update(id: Number, t: T): void {
    void this._collection.updateOne(id,t);
  }
  delete(id: Number): void {
    this._collection.deleteOne(id);
  }

  find(t: T): Promise<T[]> {
    return this._collection.find().toArray();
  }

  findOne(id: Number): any {
    return this._collection.findOne(id);
  }
  create(t: T): void {
    this._collection.insertOne(t);
  }
}
