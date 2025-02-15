import { Router } from "express";

import UserController from "@controllers/user.controller";

export const UserRouter = Router();

const userController = new UserController();

UserRouter.post("/users", userController.postUser)
  .get("/users/:userId", userController.getUserById)
  .get("/users/email/:userEmail", userController.getUserByEmail);
