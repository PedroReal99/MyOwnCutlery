import { Injectable, Controller } from '@nestjs/common';
import { Order } from '../Model/Order.Models';
import { Model, Query } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IOrdersRepository } from '../Repository/IOrdersRepository.Repository';
import {
  MongoClient,
  Db,
  Collection,
  InsertOneWriteOpResult,
  Cursor,
} from 'mongodb';
import {} from '@nestjs/typeorm';
import { UsersRepository } from '../../User/Repository/UsersRepository.Repository';
import {UsersController} from '../../User/Controller/Users.Controller';
import { User } from '../../User/Model/User.Models';

@Injectable()
export class OrdersRepository implements IOrdersRepository {
  constructor(
    @InjectModel('Order')
    private orderModel: Model<Order>
  ) {}

  async findByClient(n: String): Promise<Order[]> {
    return this.orderModel.find({ 
      'client.nif'
        : n 
    });
  }

  async findById(id: String): Promise<Order> {
    return this.orderModel.findById(id);
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find();
  }

  async findAllProcessing(): Promise<Order[]> {
    return this.orderModel.find({
      
        'state':"processing"
    });
  }

  async productMoreOrdered(): Promise<Order[]> {
    return this.orderModel.aggregate([
      {
        "$group":
          { _id: { Product: "$product"}, Ordered: { $sum: 1  } }
      },
      { $sort: { "Ordered": -1 } }
    ]);
  }
  
  async create(order: Partial<Order>): Promise<boolean> {
    const newOrder = new this.orderModel(order);
    await newOrder.save();
    return newOrder.toObject({ versionKey: false });
  }

  async update(id: String, order: Order): Promise<void> {
    this.orderModel.findOneAndUpdate({'_id':id}, order).exec();
  }
  async delete(_id: String): Promise<void> {
    this.orderModel.findOneAndRemove({'_id': _id }).exec();
  }
  async save(order: Order): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findProductsByQuantity():Promise<Order[]>{
    return this.orderModel.aggregate([
      {
        "$group":
          {_id:{ Product:"$product"},Sum:{$sum:"$quantity"}}
      },
      {$sort:{"Sum":-1}}
    ])
  }

}
