import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from '../Controller/Orders.Controllers';
import { OrdersRepository } from '../Repository/OrdersRepository.Repository';
import { OrderSchema } from '../Schema/Order.Schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersRepository],
})
export class OrdersModule {}
