import database from "../utils/database";
import { Stock } from "../interfaces/IStock";
import { BadRequestError, InternalServerError } from "../errors/ApiErrors";

export class StockService {
  static async createStock(stock: Partial<Stock>): Promise<{ id: number }> {
    try {
      const { companyName, symbol, currentPrice, description } = stock;

      const sql =
        "INSERT INTO Stocks (companyName, symbol, currentPrice, description) VALUES (?, ?, ?, ?)";
      const params = [companyName, symbol, currentPrice, description];

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

  static async getStockById(id: number): Promise<Stock> {
    try {
      const sql = "SELECT * FROM Stocks WHERE id = ?";
      const params = [id];

      return new Promise((resolve, reject) => {
        database.get(sql, params, (err, row) => {
          if (err) {
            reject(new BadRequestError(err.message));
          } else {
            resolve(row as Stock);
          }
        });
      });
    } catch (err: any) {
      throw new InternalServerError(err.message);
    }
  }

  static async getAllStocks(): Promise<Stock[]> {
    try {
      const sql = "SELECT * FROM Stocks";

      return new Promise((resolve, reject) => {
        database.all(sql, (err, rows) => {
          if (err) {
            reject(new BadRequestError(err.message));
          } else {
            const stocks: Stock[] = rows.map((row) => row as Stock);
            resolve(stocks);
          }
        });
      });
    } catch (err: any) {
      throw new InternalServerError(err.message);
    }
  }

  static async updateStock(stock: Partial<Stock>): Promise<boolean> {
    try {
      const { currentPrice, id } = stock;

      const sql = "UPDATE Stocks SET currentPrice = ? WHERE id = ?";
      const params = [currentPrice, id];
      await new Promise((resolve, reject) => {
        database.run(sql, params, function (err) {
          if (err) {
            reject(new BadRequestError(err.message));
          } else {
            resolve(this.changes !== 0);
          }
        });
      });
      return true;
    } catch (err: any) {
      throw new InternalServerError(err.message);
    }
  }
  static async deleteStock(id: number): Promise<boolean> {
    try {
      const sql = "DELETE FROM Stocks WHERE id = ?";
      const params = [id];
      await new Promise((resolve, reject) => {
        database.run(sql, params, function (err) {
          if (err) {
            reject(new BadRequestError(err.message));
          } else {
            resolve(this.changes !== 0);
          }
        });
      });
      return true;
    } catch (err: any) {
      throw new InternalServerError(err.message);
    }
  }
}
