import { Order } from '../Model/Order.Models';
import { Num } from '../../Shared/Models/ValueObjects/Mobile.ValueObject';
import {State, STATE} from '../Model/OrderState.Models';
import {UserDTO} from '../../User/DTO/user.dtos';



export class OrderDTO {
  idOrder: Number;
  state: String;
  quantity: Number;
  date: Date;
  delivery: Date;
  address: String;
  postalCode: String;
  NIB: Number;
  ClientNif: Number;
  ProductName:String

  constructor(quantity:Number,address:String,postalCode:String,
    NIB:Number,date:Date,delivery:Date,user:Number,PName:String,state:String,id:Number){
    this.state=state,
    this.quantity=quantity,
    this.date=date;
    this.delivery=delivery;
    this.address=address,
    this.postalCode=postalCode,
    this.NIB=NIB
    this.ClientNif=user;
    this.ProductName=PName;
    this.idOrder=id;
  }
}


export function generateDTO(order : Order) : OrderDTO{
  var quantity=order.quantity;
  var address=order.shippingAdress.address;
  var postalCode=order.shippingAdress.postalCode;
  var nib=order.NIB;
  var date=order.date;
  var delivery=order.delivery;
  var clientNif=order.client.nif;
  var state=order.state;
  var productName=order.product;
  var id=order._id;

  return new OrderDTO(quantity,address,
    postalCode,nib,date,delivery,clientNif,productName,state,id);
}

