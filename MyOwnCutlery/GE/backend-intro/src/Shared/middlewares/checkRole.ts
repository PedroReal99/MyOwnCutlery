import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { UsersRepository } from '../../User/Repository/UsersRepository.Repository';
import { User } from "../../User/Model/User.Models";

export const checkRole = (roles: Array<String>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;
    //Get user role from the database
    const userRepository = getRepository(UsersRepository);
    let userDB: UsersRepository;
    let user;
    try {
      user = userDB.findByNif(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if array of authorized roles includes the user's role
    if (roles.indexOf(user.role) > -1) next();
    else res.status(401).send();
  };
};