import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import { compareSync } from 'bcrypt';



async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  /*mongoose.connect(process.env.ATLAS_URI,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
  mongoose.connection;*/
  await app.listen(port);
}
bootstrap();
