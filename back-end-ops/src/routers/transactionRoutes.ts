import express from "express";
import { TransactionController } from "../controller/TransactionController";

const router = express.Router();

router.post("/transaction", TransactionController.createTransaction);

export default router;
