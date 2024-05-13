import { Request, Response } from "express";
import { TransactionService } from "../services/transactionService";
import { createTransactionSchema } from "../schemas/transactionSchemas/createTransactionSchema";
import { ZodError } from "zod";
import { BadRequestError, InternalServerError } from "../errors/ApiErrors";

export class TransactionController {
  static async createTransaction(req: Request, res: Response) {
    try {
      const transactionData = createTransactionSchema.parse(req.body);
      const { id } =
        await TransactionService.createTransaction(transactionData);
      res.status(201).json({ message: "Transaction Succeded with id:" + id });
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(422).json({ message: "Invalid data", error: err });
      } else if (
        err instanceof BadRequestError ||
        err instanceof InternalServerError
      ) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res
          .status(500)
          .json({ message: "Failed to create transaction.", error: err });
      }
    }
  }
}
