import { Request, Response } from "express";
import { ZodError } from "zod";
import { createWalletSchema } from "../schemas/walletSchemas/createWalletSchema";
import { WalletService } from "../services/walletService";

export class WalletController {
  static async createWallet(req: Request, res: Response) {
    try {
      const { userId, stockId, quantity } = createWalletSchema.parse(req.body);
      console.log(req.body);
      const { id } = await WalletService.createWallet({
        userId,
        stockId,
        quantity,
      });

      res.status(201).json({
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
