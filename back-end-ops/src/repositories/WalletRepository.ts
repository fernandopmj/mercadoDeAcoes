import database from "../utils/database";
import { Wallet } from "../interfaces/IWallet";

export class WalletRepository {
  static async createWallet({
    userId,
    stockId,
    quantity,
  }: Partial<Wallet>): Promise<{ id: number }> {
    let dateCreated = new Date().getTime();
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
