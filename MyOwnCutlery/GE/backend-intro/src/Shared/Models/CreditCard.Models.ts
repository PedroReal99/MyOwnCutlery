import {Name} from './ValueObjects/Name.ValueObject';
import {Entity} from '../Generic/Entity.Generic';
import {UniqueEntityID} from '../Generic/UniqueEntityID.Generic';

interface CreditCardProps {
    NIB: String;
    nameOfOwner: Name;
    expirationDate: Date;
}

export class CreditCard extends Entity<CreditCardProps>{
    
    get id (): UniqueEntityID {
        return this._id
    }

    get NIB(): String {
        return this.props.NIB;
    }

    get nameOfOwner(): Name {
        return this.props.nameOfOwner;
    }

    get expirationDate(): Date{
        return this.props.expirationDate;
    }

    private constructor (props: CreditCardProps, id?: UniqueEntityID) {
        super(props, id)
    }

    /*public static create (props: CreditCardProps, id?: UniqueEntityID): CreditCard{
        const r = 
    }*/
}