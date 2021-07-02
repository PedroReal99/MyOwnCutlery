import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { PostalAddressSchema } from '../Schemas/PostalAddress.Schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PostalAddress', schema: PostalAddressSchema }]),
  ]
})
export class PostalAddressModule {}
