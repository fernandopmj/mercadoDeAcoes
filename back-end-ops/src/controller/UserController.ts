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

  static updateUser(req: Request, res: Response): void {
    const { username, password, email, id } = req.body;
    if (!username || !password || !email || !id) {
      res
        .status(400)
        .json({ message: "Id, username, password, and email are required." });
      return;
    }
    UserRepository.updateUser(
      {
        id,
        username,
        password,
        email,
      },
      (success) => {
        if (success) {
          res.status(200).json({ message: "User updated successfully." });
        } else {
          res.status(500).json({ message: "Failed to update user." });
        }
      }
    );
  }

  static deleteUser(req: Request, res: Response): void {
    const userId = parseInt(req.params.id, 10);

    UserRepository.deleteUser(userId, (success) => {
      if (success) {
        res.status(200).json({ message: "User deleted successfully." });
      } else {
        res.status(500).json({ message: "Failed to delete user." });
      }
    });
  }

  static getAllUsers(req: Request, res: Response): void {
    UserRepository.getAllUsers((users) => {
      res.json(users);
    });
  }
}
export default UserController;
