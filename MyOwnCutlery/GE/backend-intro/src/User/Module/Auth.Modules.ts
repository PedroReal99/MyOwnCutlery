import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from '../Controller/Auth.Controller';
import { UsersRepository } from '../Repository/UsersRepository.Repository';
import {AuthService} from '../Service/Auth.Service'
import { OrderSchema } from '../../Order/Schema/Order.Schemas';
import { UserSchema } from '../Schema/User.Schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    
  ],
  controllers: [AuthController],
  providers: [AuthService,UsersRepository],
})
export class AuthModule {}
