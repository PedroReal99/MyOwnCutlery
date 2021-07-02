export class Identifier<T> {
    constructor(private value: T) {
      this.value = value;
    }
  
    /*
      validates if the id is equals to this class id
    */
    equals (id?: Identifier<T>): boolean {
      if (id === null || id === undefined) {
        return false;
      }
      if (!(id instanceof this.constructor)) {
        return false;
      }
      return id.toValue() === this.value;
    }
  
    /*
      return toString of the value 
    */
    toString () {
      return String(this.value);
    }
  
    /*
      return the generic value 
    */
    toValue (): T {
      return this.value;
    }
  }