import { Request, Response } from "express";
import { createStockSchema } from "../schemas/stockSchemas/createStockSchema";
import { StockService } from "../services/stockService";
import { ZodError } from "zod";
import { updateStockSchema } from "../schemas/stockSchemas/updateStockSchema";

class StockController {
  static async createStock(req: Request, res: Response) {
    try {
      const { companyName, symbol, currentPrice, description } =
        createStockSchema.parse(req.body);
      const { id } = await StockService.createStock({
        companyName,
        symbol,
        currentPrice,
        description,
      });
      res.status(201).json({
        message: "Stock has been successfully created with id: " + id,
      });
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(422).json({ message: "Invalid data", error: err });
      } else {
        res
          .status(500)
          .json({ message: "Failed to create stock.", error: err });
      }
    }
  }
  static async getStockById(req: Request, res: Response) {
    try {
      const stockId = parseInt(req.params.id, 10);
      const stock = await StockService.getStockById(stockId);

      if (stock) {
        res.json(stock);
      } else {
        res.status(404).json({ message: "Stock not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Failed to get stock.", error: err });
    }
  }

  static async getAllStocks(req: Request, res: Response) {
    try {
      const stocks = await StockService.getAllStocks();
      res.json(stocks);
    } catch (err) {
      res.status(500).json({ message: "Failed to get stocks.", error: err });
    }
  }

  static async updateStockPrice(req: Request, res: Response) {
    try {
      const stockData = updateStockSchema.parse(req.body);

      const success = await StockService.updateStock(stockData);
      if (success) {
        res.status(204).json({ message: "Stock price updated successfully." });
      } else {
        res
          .status(404)
          .json({ message: "Stock not found or no updates applied" });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(422).json({ message: "Invalid data", error: err });
      } else {
        res.status(500).json({ message: "Failed to update stock", error: err });
      }
    }
  }

  static async deleteStock(req: Request, res: Response) {
    try {
      const stockId = parseInt(req.params.id, 10);

      const success = await StockService.deleteStock(stockId);
      if (success) {
        res.json({ message: "Stock deleted successfully." });
      } else {
        res.status(404).json({ message: "Stock not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Failed to update stock", error: err });
    }
  }
}
export default StockController;
