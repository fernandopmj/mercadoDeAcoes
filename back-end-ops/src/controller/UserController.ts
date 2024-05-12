import { Request, Response } from "express";
import z, { ZodError } from "zod";
import { CreateUserError, GetUserError } from "../errors/userErrors";
import { IResponse } from "../interfaces/IResponse";
import UserService from "../Services/UserService";

const createUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  email: z.string().email(),
});

class UserController {
  constructor(private readonly userService: UserService) {}
  async createUser(req: Request, res: Response) {
    try {
      const { username, password, email } = createUserSchema.parse(req.body);
      console.log(req.body);
      const { id } = await this.userService.createUser({
        username,
        password,
        email,
      });
      console.log(id);
      res
        .send(201)
        .json({ message: "User has been successfully created with id: " + id });
      // return {
      //   statusCode: 201,
      //   body: { message: "User has been successfully created with id: " + id },
      // };
    } catch (err) {
      if (err instanceof ZodError) {
        return {
          statusCode: 422,
          body: { message: "Invalid data", error: err },
        };
      }

      if (err instanceof CreateUserError) {
        return {
          statusCode: 400,
          body: {
            message: "Something went wrong while creating user",
            error: err,
          },
        };
      }

      return {
        statusCode: 500,
        body: { message: "Internal Error", error: err },
      };
    }
  }

  async getUserById(req: Request): Promise<IResponse> {
    try {
      const user = await this.userService.getUserById(req.body);
      return {
        statusCode: 200,
        body: user,
      };
    } catch (err) {
      if (err instanceof ZodError) {
        return {
          statusCode: 422,
          body: { message: "Invalid data", error: err },
        };
      }

      if (err instanceof CreateUserError) {
        return {
          statusCode: 400,
          body: {
            message: "Something went wrong while getting user",
            error: err,
          },
        };
      }
      return {
        statusCode: 500,
        body: { message: "Internal Error", error: err },
      };
    }
  }
  // async updateUser(req: Request): Promise<IResponse> {}
  /* async createUser(req: Request): Promise:  {
  //   try {
  //     const { username, password, email } = createUserSchema.parse(req.body);
  //     let dateCreated = new Date().getTime();

  //     UserRepository.createUser(
  //       {
  //         username,
  //         password,
  //         email,
  //         status: true,
  //         dateCreated,
  //       },
  //       (user) => {
  //         if (user) {
  //           res.status(201).json(user);
  //         } else {
  //           throw CreateUserError;
  //         }
  //       }
  //     );
  //   } catch (err) {
  //     if (err instanceof ZodError) {
  //       res.status(422).json({ message: "Invalid data", error: err });
  //     }
  //   }
  // }

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
        status: false,
        dateCreated: 0,
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
  */
}
export default UserController;
