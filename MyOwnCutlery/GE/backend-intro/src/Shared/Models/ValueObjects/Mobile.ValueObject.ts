import { ValueObject } from "../../Generic/ValueObject.Generic";
import { ConflictException } from "@nestjs/common";
import { match } from "minimatch";

interface MobileProps {
    value: Number;
}

export class Num extends ValueObject<MobileProps>{
    
    private constructor (props: MobileProps) {
        super(props);
    }
    
    get value (): Number {
        return this.props.value;
    }

    public static create (mobile: Number): MobileProps {
      if(mobile == null){
        throw new ConflictException("Number cannot be null or empty");
      }
      return new Num({ value: mobile });
      }
}