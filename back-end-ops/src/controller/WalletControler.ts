import { Request, Response } from "express";
import z, { ZodError } from "zod";
import { WalletRepository } from "../repositories/WalletRepository";

const createWalletSchema = z.object({
  userId: z.number().int(),
  stockId: z.number().int(),
  quantity: z.number().int(),
});

export class WalletController {
  static async createWallet(req: Request, res: Response) {
    try {
      const { userId, stockId, quantity } = createWalletSchema.parse(req.body);
      console.log(req.body);
      const { id } = await WalletRepository.createWallet({
        userId,
        stockId,
        quantity,
      });

      console.log(id);
      res
        .status(201)
        .json({
          message: "Wallet has been successfully created with id: " + id,
        });
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(201).json({ message: "Invalid data", error: err });
      }
      res.status(500).json({ message: "Failed to create user." });
    }
  }
}
