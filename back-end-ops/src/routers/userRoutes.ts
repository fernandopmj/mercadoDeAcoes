import express from "express";
import UserController from "../controller/UserController";
import UserService from "../Services/UserService";

const router = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

router.post("/user", userController.createUser);
router.get("/user/:id", userController.getUserById);
// router.get("/user", UserController.getAllUsers);
// router.put("/user/update", UserController.updateUser);
// router.delete("/user/delete/:id", UserController.deleteUser);

export default router;
