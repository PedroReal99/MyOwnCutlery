import * as mongoose from 'mongoose';
import { PostalAddress } from '../Models/PostalAddress.Models';
import { CreditCard } from '../Models/CreditCard.Models';
import { Order } from '../../Order/Model/Order.Models';
import { PostalAddressSchema } from './PostalAddress.Schemas';
import { CreditCardSchema } from './CreditCard.Schemas';
import { UserSchema } from '../../User/Schema/User.Schemas';

var defaultDate = new Date();
defaultDate.setDate(defaultDate.getDate() + 30);

export const UserForOrderSchema = new mongoose.Schema(
  {
    nif: {
      type: Number,
      min: 1,
      required:true,
    },
    name: {
      type: String,
      required:true,
    }
  },
  {
    timestamps: true,
  },
);
