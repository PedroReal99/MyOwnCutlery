import { Order } from '../Model/Order.Models';

export interface IOrdersRepository {
  findById(id: String): Promise<Order>;
  findAll(): Promise<Order[]>;

  create(order: Order): Promise<boolean>;
  update(id: String, order: Order): Promise<void>;
  delete(id: String): Promise<void>;
  productMoreOrdered(): Promise<Order[]>
  save(order: Order): Promise<void>;
}
