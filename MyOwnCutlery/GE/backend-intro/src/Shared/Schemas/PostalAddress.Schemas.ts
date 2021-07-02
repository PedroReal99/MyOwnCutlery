// get an instance of mongoose and mongoose.Schema
import * as mongoose from 'mongoose';

export const PostalAddressSchema = new mongoose.Schema({
    address: {
        type: String,
        trim: true,
        required: 'Morada obrigatória'
    },
    postalCode: {
        type: String,
        trim: true,
        minlength: 4,
        required: 'Código-Postal obrigatório'
    },
}, { timestamps: true, });