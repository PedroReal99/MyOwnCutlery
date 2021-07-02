import { PostalAddress } from '../../Shared/Models/PostalAddress.Models';
import { CreditCard } from '../../Shared/Models/CreditCard.Models';
import { User } from '../../User/Model/User.Models';
import { AggregateRoot } from '../../Shared/Generic/AggregateRoot.Generic';
import { UniqueEntityID } from '../../Shared/Generic/UniqueEntityID.Generic';
import * as mongoose from 'mongoose';
import { Product } from './Product.Models';
import { STATE } from './OrderState.Models';

export interface Order extends mongoose.Document {
  _id: Number;
  state: String;
  quantity: Number;
  date: Date;
  delivery: Date;
  shippingAdress: PostalAddress;
  NIB: Number;
  client: User;
  product: String;


}
var defaultDate = new Date();
defaultDate.setDate(defaultDate.getDate());

export class Order {

  constructor(state: String, quantity: Number, shippingAddress: PostalAddress, NIB: Number, client: User, product: String) {
    this.state = state;
    this.quantity = quantity;
    this.date = defaultDate;
    this.delivery = this.randomDate(this.date);
    this.shippingAdress = shippingAddress;
    this.NIB = NIB;
    this.client = client;
    this.product = product;


  }
  randomDate(start) {
    var end = new Date(start);
    if (end.getMonth() < 11) {
      end.setMonth(end.getMonth() + 1);
    } else {
      end.setMonth(0);
      end.setFullYear(end.getFullYear() + 1);
    }
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  setDate(date: Date) {
    this.date = date
  }
  setDelivery(delivery: Date) {
    this.delivery = delivery
  }
}