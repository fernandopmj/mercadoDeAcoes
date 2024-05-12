import { Request, Response } from "express";
import StockRepository from "../Services/StockRepository";

class StockController {
  static createStock(req: Request, res: Response): void {
    const { companyName, symbol, currentPrice, description } = req.body;

    if (!companyName || !symbol || !currentPrice || !description) {
      res.status(400).json({
        message:
          "companyName, symbol, currentPrice and description are required.",
      });
      return;
    }

    StockRepository.createStock(
      {
        companyName,
        symbol,
        currentPrice,
        description,
      },
      (stock) => {
        if (stock) {
          res.status(201).json(stock);
        } else {
          res.status(500).json({ message: "Failed to create a stock." });
        }
      }
    );
  }

  static getStockById(req: Request, res: Response): void {
    const stockId = parseInt(req.params.id, 10);

    StockRepository.getStockById(stockId, (stock) => {
      if (stock) {
        res.json(stock);
      } else {
        res.status(404).json({ message: "Stock not found." });
      }
    });
  }

  static updateStockPrice(req: Request, res: Response): void {
    const { currentPrice, id } = req.body;

    if (!currentPrice || isNaN(currentPrice)) {
      res
        .status(400)
        .json({ message: "Current price is required and must be a number." });
      return;
    }

    StockRepository.updateStock(id, currentPrice, (success) => {
      if (success) {
        res.status(200).json({ message: "Stock price updated successfully." });
      } else {
        res.status(500).json({ message: "Failed to update stock price." });
      }
    });
  }

  static deleteStock(req: Request, res: Response): void {
    const stockId = parseInt(req.params.id, 10);

    StockRepository.deleteStock(stockId, (success) => {
      if (success) {
        res.status(200).json({ message: "Stock deleted successfully." });
      } else {
        res.status(500).json({ message: "Failed to delete stock." });
      }
    });
  }

  static getAllStocks(req: Request, res: Response): void {
    StockRepository.getAllStocks((stocks) => {
      res.json(stocks);
    });
  }
}
export default StockController;
