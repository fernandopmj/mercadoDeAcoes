import express from "express";
import StockController from "../controller/StockController";

const router = express.Router();

router.post("/stocks", StockController.createStock);
router.get("/stocks/:id", StockController.getStockById);
router.get("/stocks", StockController.getAllStocks);
router.put("/stocks/update", StockController.updateStockPrice);
router.delete("/stocks/delete/:id", StockController.deleteStock);

export default router;
