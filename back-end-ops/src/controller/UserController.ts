import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";

class UserController {
  static createUser(req: Request, res: Response): void {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      res
        .status(400)
        .json({ message: "Username, password, and email are required." });
      return;
    }

    UserRepository.createUser(
      {
        username,
        password,
        email,
      },
      (user) => {
        if (user) {
          res.status(201).json(user);
        } else {
          res.status(500).json({ message: "Failed to create user." });
        }
      }
    );
  }

  static getUserById(req: Request, res: Response): void {
    const userId = parseInt(req.params.id, 10);

    UserRepository.getUserById(userId, (user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found." });
      }
    });
  }
}
export default UserController;
