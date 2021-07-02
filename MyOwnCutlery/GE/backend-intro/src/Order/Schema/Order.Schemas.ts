import * as mongoose from 'mongoose';
import { PostalAddress } from '../../Shared/Models/PostalAddress.Models';
import { CreditCard } from '../../Shared/Models/CreditCard.Models';
import { Order } from '../Model/Order.Models';
import { PostalAddressSchema } from '../../Shared/Schemas/PostalAddress.Schemas';
import { CreditCardSchema } from '../../Shared/Schemas/CreditCard.Schemas';
import { UserForOrderSchema } from '../../Shared/Schemas/UserForOrder.Schema';
import { ProductSchema} from '../Schema/Product.Schemas';

var defaultDate = new Date();
defaultDate.setDate(defaultDate.getDate() + 30);

export const OrderSchema = new mongoose.Schema(
  {
    id:Number,
    quantity: {
      type: Number,
      min: 0,
    },
    date: {
      type: Date,
      default: defaultDate,
    },
    delivery:Date,
    shippingAdress: PostalAddressSchema,
    NIB: {
      type:Number,
    },
    state:{
      type: String,
    },
    product: {
      type:String,
      required:true},
    client: {
      nif:{
      type:Number,
      required:true},
    }
  },
  {
    timestamps: true,
  },
);
