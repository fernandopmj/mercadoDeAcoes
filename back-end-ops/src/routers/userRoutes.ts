import express from "express";
import { UserController } from "../controller/UserController";

const router = express.Router();

router.post("/user", UserController.createUser);
router.get("/user/:id", UserController.getUserById);
router.get("/user", UserController.getAllUsers);
router.put("/user/update", UserController.updateUser);
router.put("/user/updateBal", UserController.updateUserBalance);
router.delete("/user/delete/:id", UserController.deleteUser);

export default router;
