export interface IRepository<T> {

    create(t : T) : void;
    update(id : Number, t : T) : void;
    delete(id : Number) : void;
    
    find(t : T) : Promise<T[]>;
    findOne(id : Number) : T;

}