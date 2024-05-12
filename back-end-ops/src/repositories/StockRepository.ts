import database from "../utils/database";
import { Stock } from "../interfaces/IStock";

export default class StockRepository {
  static createStock(stock: Stock, callback: (stock?: Stock) => void): void {
    const sql =
      "INSERT INTO Stocks (symbol, companyName, currentPrice, description) VALUES (?, ?, ?, ?)";
    const params = [
      stock.symbol,
      stock.companyName,
      stock.currentPrice,
      stock.description,
    ];

    database.run(sql, params, function (err) {
      if (err) {
        console.error("Error creating stock:", err);
        callback();
        return;
      }
      const stockId = this.lastID;
      const newStock: Stock = { ...stock, id: stockId };
      callback(newStock);
    });
  }

  static getStockById(id: number, callback: (stock?: Stock) => void): void {
    const sql = "SELECT * FROM Stocks WHERE id = ?";
    const params = [id];
    database.get(sql, params, (err, row) => {
      if (err) {
        console.error("Error getting stock by ID:", err);
        callback();
        return;
      }
      callback(row as Stock);
    });
  }

  static updateStock(
    /*stock: Stock*/ id: number,
    currentPrice: number,
    callback: (success: boolean) => void
  ): void {
    /*const sql =
      "UPDATE Stocks SET symbol = ?, companyName = ?, currentPrice = ? WHERE id = ?";
    const params = [stock.symbol, stock.companyName, stock.currentPrice, stock.id];
    */
    const sql = "UPDATE Stocks SET currentPrice = ? WHERE id = ?";
    const params = [currentPrice, id];
    database.run(sql, params, function (err) {
      if (err) {
        console.error("Error updating stock:", err);
        callback(false);
        return;
      }
      callback(true);
    });
  }

  static deleteStock(id: number, callback: (success: boolean) => void): void {
    const sql = "DELETE FROM Stocks WHERE id = ?";
    const params = [id];

    database.run(sql, params, function (err) {
      if (err) {
        console.error("Error deleting stock:", err);
        callback(false);
        return;
      }
      callback(true);
    });
  }

  static getAllStocks(callback: (stocks: Stock[]) => void): void {
    const sql = "SELECT * FROM Stocks";

    database.all(sql, (err, rows) => {
      if (err) {
        console.error("Error getting all stocks:", err);
        callback([]);
        return;
      }
      const stocks: Stock[] = rows.map((row) => row as Stock);
      callback(stocks);
    });
  }
}
