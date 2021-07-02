import { ValueObject } from "../../Generic/ValueObject.Generic";
import { ConflictException } from "@nestjs/common";


export class Name {
    name: String;
    public constructor(name: String) {
        this.create(name);
    }


    public create(name: String) {
        if (name == null) {
            throw new ConflictException("name cannot be null or empty");
        }
        this.name = name;
    }
}