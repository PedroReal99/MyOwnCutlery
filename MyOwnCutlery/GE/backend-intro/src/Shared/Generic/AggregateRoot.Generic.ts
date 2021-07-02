import { Entity } from "./Entity.Generic";
import { UniqueEntityID } from "./UniqueEntityID.Generic";

export abstract class AggregateRoot<T> extends Entity<T> {
  
    get id (): UniqueEntityID {
    return this._id;
  }

}