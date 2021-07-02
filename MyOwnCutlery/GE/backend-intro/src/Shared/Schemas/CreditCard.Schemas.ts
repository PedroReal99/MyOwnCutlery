import * as mongoose from 'mongoose';

export const CreditCardSchema = new mongoose.Schema({
    NIB: {
        type: Number,
        length: 21,
        required: 'NIB obrigatório'
    },
    //IBAN????  
    nameOfOwner: {
        type: String,
        required: 'nome titular obrigatório'
    },
    expirationDate: Date,
}, { timestamps: true, });