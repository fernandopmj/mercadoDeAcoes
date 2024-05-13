import database from "../utils/database";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../errors/ApiErrors";
import { Transaction } from "../interfaces/ITransaction";
import { UserService } from "./userService";
import { WalletService } from "./walletService";

export class TransactionService {
  static async createTransaction(
    transactionData: Partial<Transaction>
  ): Promise<{ id: number }> {
    try {
      const { userId, stockId, type, quantity, pricePerStock } =
        transactionData;
      const timestamp = Date.now();

      if (type !== "buy" && type !== "sell") {
        throw new BadRequestError("Transaction type invalid");
      }
      if (
        userId === undefined ||
        quantity === undefined ||
        pricePerStock === undefined
      ) {
        throw new BadRequestError("Invalid data");
      }
      const user = await UserService.getUserById(userId);
      if (!user) {
        throw new NotFoundError("User not found");
      }

      if (type === "buy" && user.balance < quantity * pricePerStock) {
        throw new BadRequestError("Insufficient funds");
      }

      if (type === "buy") {
        await UserService.updateUserBalance(
          userId,
          user.balance - quantity * pricePerStock
        );
      } else {
        await UserService.updateUserBalance(
          userId,
          user.balance + quantity * pricePerStock
        );
      }
      await WalletService.createWallet({ userId, stockId, quantity });

      const sql =
        "INSERT INTO Transactions (userId, stockId, type, quantity, pricePerStock, timestamp) VALUES (?, ?, ?, ?, ?, ?)";
      const params = [
        userId,
        stockId,
        type,
        quantity,
        pricePerStock,
        timestamp,
      ];
      return new Promise((resolve, reject) => {
        database.run(sql, params, function (err) {
          if (err) {
            reject(new BadRequestError(err.message));
          } else {
            resolve({ id: this.lastID });
          }
        });
      });
    } catch (err: any) {
      throw new InternalServerError(err.message);
    }
  }
}
