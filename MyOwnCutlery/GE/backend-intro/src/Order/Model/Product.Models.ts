import {Name} from '../../Shared/Models/ValueObjects/Name.ValueObject';
import {Entity} from '../../Shared/Generic/Entity.Generic';
import {UniqueEntityID} from '../../Shared/Generic/UniqueEntityID.Generic';

interface ProductProps {
    name: Name;
}

export class Product extends Entity<ProductProps>{
    
    get id (): UniqueEntityID {
        return this._id
    }

    get name(): Name {
        return this.props.name;
    }

    private constructor (props: ProductProps, id?: UniqueEntityID) {
        super(props, id)
    }

    /*public static create (props: CreditCardProps, id?: UniqueEntityID): CreditCard{
        const r = 
    }*/
}