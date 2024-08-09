import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../shared/errors/AppError";
import { auth } from "../../shared/config/auth";

interface IPayload {
  subject: number
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {

  const authHeader = request.headers.authorization;
  const { secret_token } = auth

  if (!authHeader) {
    throw new AppError("ERR_TOKEN_MISSING");
  }

  if (authHeader.length > 350) {
    throw new AppError("ERR_INVALID_TOKEN", 401)
  }

  const [, token] = authHeader.split(" ");

  try {
    const { subject: user_id } = verify(
      token,
      secret_token
    ) as IPayload


    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    console.log(err)
    throw new AppError("ERR_INVALID_TOKEN", 401);
  }
}