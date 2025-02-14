import { Request, Response, NextFunction } from "express";

import { User } from "@models/User.model";

import UserService from "@services/user.service";
import { handleHttp } from "@utils/handleHttp";

const userService = new UserService();

class UserController {
  public async postUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData: User = req.body;
      const newUser = await userService.createUserAccount(userData);
      handleHttp(
        res,
        { data: newUser, message: "Cuenta de usuario creada existosamente" },
        201
      );
    } catch (error) {
      next(error);
    }
  }

  public async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userIdParams = req.params.userId;
      const userId = parseInt(userIdParams);
      const user = await userService.findUserById(userId);
      handleHttp(
        res,
        { data: user, message: "Cuenta de usuario obtenida existosamente" },
        200
      );
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
