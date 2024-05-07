import express from "express";
import UserController from "../controller/UserController";

const router = express.Router();

router.post("/users", UserController.createUser);
router.get("/users/:id", UserController.getUserById);
router.get("/users", UserController.getAllUsers);
router.put("/users/update", UserController.updateUser);
router.delete("/users/delete/:id", UserController.deleteUser);

export default router;
