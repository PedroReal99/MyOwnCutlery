import { AggregateRoot } from '../Generic/AggregateRoot.Generic';
import { UniqueEntityID } from '../Generic/UniqueEntityID.Generic';
import {Address} from '../Models/ValueObjects/Address.ValueObject';
import {Entity} from '../Generic/Entity.Generic';







export class PostalAddress {

    address: String;
postalCode: String;

    constructor(address:String,postalCode:String) {
        this.address=address;
        this.postalCode=postalCode;
    }

}