import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '../Controller/Users.Controller';
import { UsersRepository } from '../Repository/UsersRepository.Repository';
import { UserSchema } from '../Schema/User.Schemas';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    controllers: [UsersController],
    providers: [UsersRepository],
  })
  export class UsersModule {}
