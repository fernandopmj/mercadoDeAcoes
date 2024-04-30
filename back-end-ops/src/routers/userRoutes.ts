import express from "express";
import UserController from "../controller/UserController";

const router = express.Router();

router.post("/users", UserController.createUser);
router.get("/users/:id", UserController.getUserById);

export default router;
