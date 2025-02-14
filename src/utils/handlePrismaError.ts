import { Prisma } from "@prisma/client";

import { AppError } from "./AppError";

export const handlePrismaError = (
  error: unknown,
  defaultMessage: string,
  customMessages: { notFoundMessage?: string; duplicatedRecordMessage?: string }
) => {
  const { notFoundMessage, duplicatedRecordMessage } = customMessages;

  /** Errors from Prisma */
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        throw new AppError(
          400,
          duplicatedRecordMessage ? duplicatedRecordMessage : ""
        );
      case "P2025":
        throw new AppError(404, notFoundMessage ? notFoundMessage : "");
      default:
        throw new AppError(500, defaultMessage);
    }
  }

  /** Custom Errors */
  if (error instanceof AppError) {
    throw new AppError(error.code, error.message);
  }
  /** Unexpected and Unknown error */
  throw new AppError(500, defaultMessage);
};
