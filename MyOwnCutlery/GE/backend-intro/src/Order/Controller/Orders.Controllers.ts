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
import { OrdersRepository } from '../Repository/OrdersRepository.Repository';
import { Order } from '../Model/Order.Models';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDTO, generateDTO } from '../DTO/order.dtos';
import { ok } from 'assert';
import { PostalAddress } from 'src/Shared/Models/PostalAddress.Models';
import { UsersRepository } from '../../User/Repository/UsersRepository.Repository'
import { callbackify } from 'util';
import { User } from 'src/User/Model/User.Models';
import { Product } from '../Model/Product.Models';
import { generateProductDTO } from '../DTO/product.dtos';
@Controller('orders')
export class OrdersController {
  /*constructor(
    @InjectModel('Order')
    private readonly ordersDB: OrdersRepository,
  ) {}*/

  private _ordersDB: OrdersRepository;
  //private _usersDB: UsersRepository;

  constructor(private ordersDB: OrdersRepository) {
    this._ordersDB = ordersDB;
  }

  @Get()
  async getAllOrders(): Promise<OrderDTO[]> {
    var result = await this._ordersDB.findAll();
    var list = [];
    for (var a = 0; a < result.length; a++) {
      list.push(generateDTO(result[a]));
    }
    return list;
  }

  @Get("/processing")
  async getAllOrdersByProcessing() {
    return this._ordersDB.findAllProcessing();
  }

  @Get("/productmoreordered")
  async getOrderByProductMoreOrdered() {
    return  await this._ordersDB.productMoreOrdered();
  }
  
  @Get(':orderId')
  async getOrderById(@Param('orderId') orderId: String) {
    return generateDTO(await this._ordersDB.findById(orderId));
    //var order:Order;
    //return generateDTO(Promise.resolve);
  }

  @Get('/client/:nif')
  async getOrderByClient(@Param('nif') nif: String): Promise<OrderDTO[]> {
    console.log(nif)
    //return generateDTO(await this._ordersDB.findByClient(nif));
    var result= await this._ordersDB.findByClient(nif);
    var list = [];
    for (var a = 0; a < result.length; a++) {
      list.push(generateDTO(result[a]));
    }
    return list;
  }

  
  @Get('/product/quantity')
  async getProductsByQuantity(){
    //return generateDTO(await this._ordersDB.findByClient(nif));
    return await this._ordersDB.findProductsByQuantity();
  }

  @Post()
  async addOrders(@Body() order: OrderDTO): Promise<OrderDTO> {
    var user;
    var url = 'http://localhost:3000/users/' + order.ClientNif;
    var fetch = require("node-fetch");
    await fetch(url)
      .then(res => res.json())
      .then((out) => {
        user = out;
      }).catch(err => console.error(err));
    var dto = await this.funct(user, order);
    return dto;
  }

  async funct(user: User, order: OrderDTO) {
    var orderr = new Order(order.state, order.quantity, new PostalAddress(order.address, order.postalCode), order.NIB, user, order.ProductName);
    this.ordersDB.create(orderr);
    var dto = generateDTO(orderr);
    return dto
  }

  @Put(':id')
  async updateOrders(@Param('id') id: String, @Body() obj: OrderDTO) {

    var user;
    var url = 'http://localhost:3000/users/' + obj.ClientNif;
    var fetch = require("node-fetch");
    await fetch(url)
      .then(res => res.json())
      .then((out) => {
        user = out;
      }).catch(err => console.error(err));
    var old = generateDTO(await this._ordersDB.findById(id));
    var orderr = await this.funct2(user, obj, old);
    this._ordersDB.update(id, orderr);


    return generateDTO(orderr);
  }

  async funct2(user: User, order: OrderDTO, old: OrderDTO) {
    var orderr = new Order(order.state, order.quantity, new PostalAddress(old.address, old.postalCode), old.NIB, user, order.ProductName);
    orderr.setDate(old.date);
    orderr.setDelivery(old.delivery);
    return orderr
  }

  @Put('/cancel/:id')
  async updateStateOrders(@Param('id') id: Number, @Body() obj: Order) {
    //this._ordersDB.update(id, obj);
    return generateDTO(obj);
  }

  @Delete(':orderId')
  async deleteOrder(@Param('orderId') orderId: String): Promise<void> {
    //var obj = this._ordersDB.findById(orderId).then(obj);
    //if (obj != null) {
    return this._ordersDB.delete(orderId);
    //} else {
    //  throw new NotFoundException('Order with that id doesnt exist');
    //}
  }

  @Get('/product/manufacturingplan/:orderId')
  async getProductsByMP(@Param('orderId') orderId: String){
    var order=await this._ordersDB.findById(orderId);
    console.log(order.product);
    var url = 'https://producao.azurewebsites.net/api/product/'+order.product+'/ProductbyName2';
    var fetch = require("node-fetch");
    var product;
    await fetch(url)
      .then(res => res.json())
      .then((out) => {
        product = out;
      }).catch(err => console.error(err));
    return await this.funct3(product);
  }

  async funct3(product) {
    //console.log(product.sumTime);
    return generateProductDTO(product.name,product.sumTime);
  }


  @Get('/product/manufacturingplan')
  async getAllProductsByMP(){
      var url = 'https://producao.azurewebsites.net/api/product/AllProductsWithSum';
      var fetch = require("node-fetch");
      var product=[];
      await fetch(url)
        .then(res => res.json())
        .then((out) => {
          product = out;
        }).catch(err => console.error(err));
      
    return await this.funct4(product);
  }

  async funct4(product) {
    //console.log(product.sumTime);
    var list=[];
    var list2=[];
    list2=this.sort2(product);
    list2.forEach(element => {
      list.push(generateProductDTO(element.name,element.sumTime));
    });
    //return this.sort(list);
    return list;
  }

sort(list){
  var sortedArray: { sumTime: number; }[] = list.sort((n1,n2) => {
    if (n1.sumTime > n2.sumTime) {
        return 1;
    }

    if (n1.sumTime < n2.sumTime) {
        return -1;
    }

    return 0;
});
}


sort2(list){
  var i=0;
  var k=0;
  for(i=0;i<list.length-1;i++){
    for(k=1;k<list.length;k++){     
      if(list[i].sumTime<list[k].sumTime){
        var a=list[i];
        list[i]=list[k];
        list[k]=a;
      }
    }
  }
  return list;
}
}












