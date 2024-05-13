import { Wallet } from "../interfaces/IWallet";
import database from "../utils/database";

export class WalletService {
  static async createWallet({
    userId,
    stockId,
    quantity,
  }: Partial<Wallet>): Promise<{ id: number }> {
    const sql =
      "INSERT INTO Wallet (userId, stockId, quantity) VALUES (?, ?, ?)";
    const params = [userId, stockId, quantity];

    return new Promise((resolve, reject) => {
      database.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }
  catch(err: any) {
    throw err;
  }
}
