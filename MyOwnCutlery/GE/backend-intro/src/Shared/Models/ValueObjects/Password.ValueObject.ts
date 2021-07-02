import { ConflictException } from "@nestjs/common";


export class Password {
  password: string;
  public constructor(password: string) {
    this.create(password);
  }

  public create(pass: string) {
    if (pass == null) {
      throw new ConflictException("Pass cannot be null or empty");
    }
    if (pass.length < 8) {
      throw new ConflictException("Password lenght needs to be bigger then 8 c");
    };
    this.password = pass;
  }
}