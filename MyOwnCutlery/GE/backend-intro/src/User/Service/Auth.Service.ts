//import bcrypt = require('bcrypt');
//import crypt = require('crypto');
var crypto = require('crypto');
import jwt = require('jsonwebtoken');
import { UserDTO } from '../DTO/user.dtos';
import { User } from '../Model/User.Models';
import { UsersRepository } from '../Repository/UsersRepository.Repository';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {

    private static saltRounds = 10;
    private _usersDB: UsersRepository;

    constructor(private usersDB: UsersRepository){
        this._usersDB = usersDB;
    }

    public async register(user: User): Promise<String> {
        var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
        var mystr = mykey.update(user.password.password,'utf8', 'hex');
        mystr += mykey.final('hex');
        user.password.password=mystr;
        var token = await this.generateToken(user);
        this._usersDB.createUser(user);
        Reflect.deleteProperty(user, "password");
        return token;
    }

    public async login(email: String, password: string): Promise<String> {

        var user=await this._usersDB.findByEmail(email);

        var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
        var mystr = mykey.update(password,'utf8', 'hex');
        mystr += mykey.final('hex');
        if(mystr!=user.password.password){
            
            console.log("Erro ao comparar realizar o login");
            throw new Error();
        }

        
        Reflect.deleteProperty(user, "password");
        const token = await this.generateToken(user);
        return token ;
    }


    private async generateToken(userDTO: User) {
        const private_key = '@SECRET';
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        return  jwt.sign({
            nif: userDTO.nif,
            email: userDTO.email,
            role: userDTO.role,
            exp: exp.getTime() / 1000
        }, private_key);
    } 

}