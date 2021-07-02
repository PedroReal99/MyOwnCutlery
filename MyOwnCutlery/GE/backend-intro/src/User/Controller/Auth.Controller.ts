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
import { Request, Response } from 'express';
import { UsersRepository } from '../Repository/UsersRepository.Repository';
import { User } from '../Model/User.Models';
import { InjectModel } from '@nestjs/mongoose';
//import { UserDTO, generateDTO } from '../DTOs/user.dtos';
import { ok } from 'assert';
import { AuthService } from '../Service/Auth.Service';
import { generateDTO, UserDTO } from '../DTO/user.dtos';
import { Name } from 'src/Shared/Models/ValueObjects/Name.ValueObject';
import { Password } from 'src/Shared/Models/ValueObjects/Password.ValueObject';
import { Email } from 'src/Shared/Models/ValueObjects/Email.ValueObject';

@Controller('auth')
export class AuthController {

  private _serv: AuthService;

  constructor(private readonly serv: AuthService) {
    this._serv = serv;
  }

  @Post('/login')
  async login(@Body() log) {
    //@Body('email') email: String,@Body('password') password: String): Promise<User> {

    const email = log.email;
    const password = log.password;

    return this._serv.login(email, password)
  }

  @Post()
  async register(@Body() user: UserDTO) {
    user.priority = Math.floor(Math.random() * 5 + 1);
    var usertemo = new User(user.nif, new Name(user.name), new Password(user.password), new Email(user.email), user.mobileNumbers, user.priority, user.incapacity, user.role);

    return this._serv.register(usertemo);
  }
}


