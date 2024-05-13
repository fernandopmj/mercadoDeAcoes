import express from "express";
import StockController from "../controller/StockController";

const router = express.Router();

router.post("/stock", StockController.createStock);
router.get("/stock/:id", StockController.getStockById);
router.get("/stock", StockController.getAllStocks);
router.put("/stock/update", StockController.updateStockPrice);
router.delete("/stock/delete/:id", StockController.deleteStock);

export default router;
