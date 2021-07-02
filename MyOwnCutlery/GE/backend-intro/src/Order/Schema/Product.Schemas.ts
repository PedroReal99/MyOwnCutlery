import * as mongoose from 'mongoose';
import { PostalAddress } from '../../Shared/Models/PostalAddress.Models';
import { CreditCard } from '../../Shared/Models/CreditCard.Models';
import { Order } from '../Model/Order.Models';
import { PostalAddressSchema } from '../../Shared/Schemas/PostalAddress.Schemas';
import { CreditCardSchema } from '../../Shared/Schemas/CreditCard.Schemas';
import { UserSchema } from '../../User/Schema/User.Schemas';

var defaultDate = new Date();
defaultDate.setDate(defaultDate.getDate() + 30);

export const ProductSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      min: 1,
    },
    description: {
      type: String,
    }
  },
  {
    timestamps: true,
  },
);
