import { Module, Global} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './Order/Module/Orders.Modules';
import { UsersModule } from './User/Module/Users.Modules';
import {AuthModule} from './User/Module/Auth.Modules';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { UsersController } from './User/Controller/Users.Controller';
import { UsersRepository } from './User/Repository/UsersRepository.Repository';

@Module({
  imports: [
    OrdersModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://flores2019:flores2019@cluster0-cgs4r.azure.mongodb.net/test?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
