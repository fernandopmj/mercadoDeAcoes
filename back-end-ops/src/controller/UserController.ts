import { Request, Response } from "express";
import { ZodError } from "zod";
import { UserService } from "../services/userService";
import { createUserSchema } from "../schemas/userSchemas/createUserSchema";
import { updateUserSchema } from "../schemas/userSchemas/updateUserSchema";

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { username, password, email } = createUserSchema.parse(req.body);
      const { id } = await UserService.createUser({
        username,
        password,
        email,
      });
      res
        .status(201)
        .json({ message: "User has been successfully created with id: " + id });
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(422).json({ message: "Invalid data", error: err });
      } else {
        res.status(500).json({ message: "Failed to create user.", error: err });
      }
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await UserService.getUserById(userId);

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } catch (err) {
      res.status(500).json({ message: "Failed to get user.", error: err });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Failed to get users.", error: err });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const userData = updateUserSchema.parse(req.body);

      const success = await UserService.updateUser(userData);
      if (success) {
        res.status(204).json({ message: "User updated successfully." });
      } else {
        res
          .status(404)
          .json({ message: "User not found or no updates applied." });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(422).json({ message: "Invalid data", error: err });
      } else {
        res.status(500).json({ message: "Failed to update user.", error: err });
      }
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      const success = await UserService.deleteUser(userId);

      if (success) {
        res.json({ message: "User desactivated successfully." });
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(422).json({ message: "Invalid data", error: err });
      } else {
        res
          .status(500)
          .json({ message: "Failed to deactivate user.", error: err });
      }
    }
  }

  static async updateUserBalance(req: Request, res: Response) {
    try {
      const { userId, balance } = req.body;
      const user = await UserService.getUserById(userId);
      const oldBalance = user.balance;
      console.log(oldBalance);
      console.log(user);
      const success = await UserService.updateUserBalance(
        userId,
        oldBalance + balance
      );
      if (success) {
        res.json({ message: "Balace Updated." });
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(422).json({ message: "Invalid data", error: err });
      } else {
        res
          .status(500)
          .json({ message: "Failed to deactivate user.", error: err });
      }
    }
  }
}
