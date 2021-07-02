import { ValueObject } from "../../Generic/ValueObject.Generic";
import { ConflictException } from "@nestjs/common";

interface AddressProps {
    value: string;
}

export class Address extends ValueObject<AddressProps>{
    
    private constructor (props: AddressProps) {
        super(props);
    }
    
    get value (): string {
        return this.props.value;
    }

    public static create (address: string): AddressProps {
      if(address == null){
        throw new ConflictException("Address cannot be null or empty");
      }
      return new Address({ value: address });
      }
}