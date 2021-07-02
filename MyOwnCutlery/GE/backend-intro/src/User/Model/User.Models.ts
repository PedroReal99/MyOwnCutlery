import { Name } from '../../Shared/Models/ValueObjects/Name.ValueObject';
import { Password } from '../../Shared/Models/ValueObjects/Password.ValueObject';
import { Email } from '../../Shared/Models/ValueObjects/Email.ValueObject';
import { Num } from '../../Shared/Models/ValueObjects/Mobile.ValueObject';
import { AggregateRoot } from '../../Shared/Generic/AggregateRoot.Generic';
import { UniqueEntityID } from '../../Shared/Generic/UniqueEntityID.Generic';
import * as mongoose from 'mongoose';

export interface User extends mongoose.Document{
  nif:Number;
  name: Name;
  password: Password;
  email: Email;
  mobileNumbers: [Num];
  priority: Number;
  incapacity: String;
  role: String;
}

export class User{

  
  constructor(nif:Number,name:Name,password:Password,email:Email,mobileNumbers:[Num],priority:Number,incapacity:String,role:String) {
    this.nif=nif;
    this.name=name;
    this.password=password;
    this.email=email;
    this.mobileNumbers=mobileNumbers;
    this.priority=priority;
    this.incapacity=incapacity;
    this.role=role;
  }

}