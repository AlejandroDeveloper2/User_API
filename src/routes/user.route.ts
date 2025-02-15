import { Router } from "express";

import UserController from "@controllers/user.controller";

import authMiddleware from "@middleware/auth.middleware";

export const UserRouter = Router();

const userController = new UserController();

UserRouter.post("/users", userController.postUser)
  .get("/users/:userId", authMiddleware, userController.getUserById)
  .get("/users/email/:userEmail", userController.getUserByEmail);
