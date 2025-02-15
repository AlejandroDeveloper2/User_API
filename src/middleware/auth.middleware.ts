import axios, { AxiosError } from "axios";
import { Request, Response, NextFunction } from "express";

import { ErrorResponse, ServerResponse } from "@interfaces/index";

import { enviromentVariables } from "@config/enviromentVariables";

import { handleHttp } from "@utils/index";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.headers.authorization?.split(" ").pop();

    if (!sessionToken) {
      handleHttp(res, { data: null, message: "Token no proporcionado" }, 401);
      return;
    }

    /** Realizamos la petición a la API de autentificación para validar el token */
    await axios.get<ServerResponse<{ id: number; exp: number }>>(
      `${enviromentVariables.AUTH_API_URL}/auth/verify`,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    next();
  } catch (error) {
    const axiosError: AxiosError<ErrorResponse> =
      error as AxiosError<ErrorResponse>;

    if (axiosError.response) {
      const message = axiosError.response
        ? axiosError.response.data.message
        : "No hubo respuesta de la API de autentificación";

      handleHttp(res, { data: null, message }, axiosError.status ?? 500);
    }
  }
};

export default authMiddleware;
