import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    nif: {
        type: Number,
        minlength: 9,
        required: true,
    },
    name: {
        name: {
            type: String,
            trim: true,
            required: 'Nome obrigatório'
        }

    },
    password: {

        password: {
            type: String,
            trim: true,
            minlength: 5,
            required: 'Password obrigatória'
        }

    },
    email: {
        email: {
            
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email obrigatório',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Insira um email valido por favor ']

        }
    },
    mobileNumbers: {
        type: [Number],
        trim: true,
        match: [/^(\+\d{1,3})?\d{10}$/, 'Insira um numero de telefone valido por favor']
    },
    incapacity: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
    },
    priority: {
        type: Number,
        trim: true,
    }
}, {
    timestamps: true,
});