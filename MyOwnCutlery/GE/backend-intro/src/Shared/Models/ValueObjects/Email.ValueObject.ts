import { ConflictException } from "@nestjs/common";

export class Email {
    email: String;
    public constructor(email: String) {
        this.create(email);
    }


    public create(email: String) {
        if (email == null) {
            throw new ConflictException("Email cannot be null or empty");
        }
        this.email = email;
    }

}