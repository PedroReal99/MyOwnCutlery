import { User } from '../Model/User.Models';

export interface IUsersRepository {
  findByNif(id: Number): Promise<User>;
  findAll(): Promise<User[]>;
  findByName(n: String): Promise<User[]>;
  findByEmail(n: String): Promise<User>;

  createUser(user: User): Promise<User>;
  update(id: Number, order: User): Promise<void>;
  delete(id: Number): Promise<void>;

  save(user: User): Promise<void>;
}
