import { hash } from "bcryptjs";

import prisma from "@config/PrismaClient";

import { User } from "@models/User.model";

import { AppError, handlePrismaError } from "@utils/index";

class UserService {
  public async createUserAccount(user: User): Promise<User> {
    try {
      const hashedPassword = await hash(user.password, 8);
      const newUser: User = await prisma.user.create({
        data: { ...user, password: hashedPassword },
      });
      return newUser;
    } catch (error) {
      return handlePrismaError(
        error,
        "Ha ocurrido un error al intentar crear el usuario",
        {
          duplicatedRecordMessage: `Ya existe un usuario con el email: ${user.email}`,
        }
      );
    }
  }

  public async findUserById(userId: number): Promise<User> {
    try {
      const user: User | null = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user)
        throw new AppError(404, `No existe un usuario con el id: ${userId}`);

      return user;
    } catch (error) {
      return handlePrismaError(
        error,
        "Ha ocurrido un error al intentar obtener el usuario",
        {}
      );
    }
  }
}

export default UserService;
