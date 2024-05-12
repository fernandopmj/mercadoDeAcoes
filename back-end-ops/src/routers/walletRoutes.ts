import express from "express";
import { WalletController } from "../controller/WalletControler";

const router = express.Router();

router.post("/wallet", WalletController.createWallet);

export default router;
