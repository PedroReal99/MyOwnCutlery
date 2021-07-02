import { User } from '../Model/User.Models';
import { Num } from '../../Shared/Models/ValueObjects/Mobile.ValueObject';

export class UserDTO {
  readonly nif: Number;
  readonly name: String;
  readonly email: String;
  readonly password: string;
  readonly mobileNumbers: [Num];
  priority: Number;
  readonly incapacity: String;
   role: String;

  constructor(
    idUser: Number,
    name: String,
    email: String,
    password:string,
    mobileNumber: [Num],
    priority: Number,
    incapacity: String,
    role: String,
  ) {
    this.nif = idUser;
    this.name = name;
    this.email=email;
    this.password=password;
    this.mobileNumbers = mobileNumber;
    this.priority = priority;
    this.incapacity = incapacity;
    this.role = role;
  }
}
export function generateDTO(user: User): UserDTO {
  return new UserDTO(
    user.nif,
    user.name.name,
    user.email.email,
    user.password.password,
    user.mobileNumbers,
    user.priority,
    user.incapacity,
    user.role,
  );
}
