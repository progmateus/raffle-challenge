import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"
import cors from "cors"
import "../data/index"
import { AppError } from "../shared/errors/AppError";
import { ZodError } from "zod";

const app = express();

app.use(express.json())

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(err)

    if (err instanceof AppError) {
      console.log(err.message);
      return response.status(err.statusCode).json({
        message: err.message
      })
    }

    if (err instanceof ZodError) {
      console.log(err.message);
      return response.status(400).json({
        message: "ERR_VALIDATION",
        data: err
      })
    }

    return response.status(500).json({
      status: "error",
      message: `internal server error - ${err.message}`
    })

  }
)

export { app };