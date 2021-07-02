import { Injectable } from '@nestjs/common';
import { User } from '../Model/User.Models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUsersRepository } from './IUsersRepository.Repository';
import { getRepositoryToken } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) { }

  async findByNif(n: Number): Promise<User> {
    return this.userModel.findOne({
      'nif'
        : n
    }).exec();
  }

  public async findByName(n: String): Promise<User[]> {
    return this.userModel
      .find({
        'name.name': n
      })
      .exec();
  }

  async findById(id: String): Promise<User> {
    return this.userModel.findById(id);
  }

  public async findByEmail(n: String): Promise<User> {
    return this.userModel
      .findOne({
        'email.email': n,
      })
      .exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async createUser(user: Partial<User>): Promise<User> {
    //this.userModel.collection.createIndex({ nif: user.nif }, { unique: true });
    const newOrder = new this.userModel(user);
    await newOrder.save();
    return newOrder.toObject();
  }

  async update(id: Number, user: User): Promise<void> {
    this.userModel.findOneAndUpdate({ 'nif': id }, user).exec();
  }
  async delete(id: Number): Promise<void> {
    this.userModel.findOneAndRemove({ 'nif': id }).exec();
  }
  async save(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
