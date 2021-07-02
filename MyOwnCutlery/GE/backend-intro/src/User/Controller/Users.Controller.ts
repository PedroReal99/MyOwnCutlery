import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from '../Repository/UsersRepository.Repository';
import { User } from '../Model/User.Models';
import { Name } from '../../Shared/Models/ValueObjects/Name.ValueObject';
import { Email } from '../../Shared/Models/ValueObjects/Email.ValueObject';
import { Password } from '../../Shared/Models/ValueObjects/Password.ValueObject';
import { InjectModel } from '@nestjs/mongoose';
import { UserDTO, generateDTO } from '../DTO/user.dtos';
import { ok } from 'assert';
import * as permission from '../../../permission.json';

@Controller('users')
export class UsersController {
  private _usersDB: UsersRepository;

  constructor(private usersDB: UsersRepository) {
    this._usersDB = usersDB;
  }

  @Get()
  async getAllUsers(): Promise<UserDTO[]> {
    var result = await this._usersDB.findAll();
    var list = [];
    for (var a = 0; a < result.length; a++) {
      list.push(generateDTO(result[a]));
    }
    return list;
  }

  @Get(':nif')
  async getUserByNif(@Param('nif') nif: Number): Promise<UserDTO> {
    var result = await this._usersDB.findByNif(nif);
    result.password.password = this.decrypt(result.password.password)
    return generateDTO(result);
  }
  @Get('/email/:email')
  async getUserByEmail(@Param('email') email: String): Promise<UserDTO> {
    var result = await this._usersDB.findByEmail(email);
    result.password.password = this.decrypt(result.password.password)
    return generateDTO(result);
  }

  @Get('/name/:name')
  async getAllUsersByName(@Param('name') name: String): Promise<UserDTO[]> {
    var result = await this._usersDB.findByName(name);
    var list = [];
    for (var a = 0; a < result.length; a++) {
      result[a].password.password = this.decrypt(result[a].password.password);
      list.push(generateDTO(result[a]));
    }
    return list;
  }

  @Post()
  async addUser(@Body() user: UserDTO): Promise<UserDTO> {
    user.priority = Math.floor(Math.random() * 5 + 1);
    var crypto = require('crypto');
    var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
    var mystr = mykey.update(user.password, 'utf8', 'hex');
    mystr += mykey.final('hex');
    var usertemo = new User(user.nif, new Name(user.name), new Password(mystr), new Email(user.email), user.mobileNumbers, user.priority, user.incapacity, user.role);
    this._usersDB.createUser(usertemo);
    return user;
  }

  /*
    @Get('/permission/read')
    async read() {
      return permission;
    }*/


  @Post('/permission/write')
  async write(@Body() permission: JSON) {
    console.log(permission);
    const fs = require('fs');
    var jsonContent = JSON.stringify(permission);
    fs.writeFile("permission.json", jsonContent, 'utf8', function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("JSON file has been saved.");
    });
    return "Success";
  }

  @Put(':id')
  async updateUser(@Param('id') id: Number, @Body() obj: UserDTO): Promise<UserDTO> {
    var us = generateDTO(await this._usersDB.findByNif(id));
    var crypto = require('crypto');
    var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
    var mystr = mykey.update(obj.password, 'utf8', 'hex');
    mystr += mykey.final('hex');
    if (obj.role == null) {
      obj.role = "Client"
    }
    var user = new User(us.nif, new Name(obj.name), new Password(mystr), new Email(obj.email), obj.mobileNumbers, us.priority, obj.incapacity, obj.role);
    this._usersDB.update(id, user);
    return generateDTO(user);
  }



  @Delete(':id')
  async deleteUser(@Param('id') id: Number): Promise<void> {
    return this._usersDB.delete(id);
  }
  decrypt(text) {
    var crypto = require('crypto');
    var decipher = crypto.createDecipher('aes-128-cbc', 'mypassword')
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
  }
}
