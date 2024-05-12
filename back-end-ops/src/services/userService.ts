import database from "../utils/database";
import { BadRequestError, InternalServerError } from "../errors/userErrors";
import { User } from "../interfaces/IUser";

export class UserService {
  static async createUser({
    username,
    password,
    email,
  }: Partial<User>): Promise<{ id: number }> {
    try {
      let dateCreated = new Date().getTime();
      const sql =
        "INSERT INTO Users (username, password, email, status, dateCreated) VALUES (?, ?, ?, ?, ?)";
      const params = [username, password, email, true, dateCreated];

      return new Promise((resolve, reject) => {
        database.run(sql, params, function (err) {
          if (err) {
            reject(new BadRequestError(err.message));
          } else {
            resolve({ id: this.lastID });
          }
        });
      });
    } catch (err: any) {
      throw new InternalServerError(err.message);
    }
  }

  static async getUserById(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM Users WHERE id = ?";
      const params = [id];

      return new Promise((resolve, reject) => {
        database.get(sql, params, (err, row) => {
          if (err) {
            reject(new BadRequestError(err.message));
          } else {
            resolve(row as User);
          }
        });
      });
    } catch (err: any) {
      throw new InternalServerError(err.message);
    }
  }

  static async getAllUsers(): Promise<User[]> {
    try {
      const sql = "SELECT * FROM Users";

      return new Promise((resolve, reject) => {
        database.all(sql, (err, rows) => {
          if (err) {
            reject(new BadRequestError(err.message));
          } else {
            const users: User[] = rows.map((row) => row as User);
            resolve(users);
          }
        });
      });
    } catch (err: any) {
      throw new InternalServerError(err.message);
    }
  }

  static async updateUser(user: Partial<User>): Promise<boolean> {
    try {
      const { username, password, email, balance, id } = user;

      const sql =
        "UPDATE Users SET username = ?, password = ?, email = ?, balance = ? WHERE id = ?";
      const params = [username, password, email, balance, id];
      await new Promise((resolve, reject) => {
        database.run(sql, params, function (err) {
          if (err) {
            reject(new BadRequestError(err.message));
          } else {
            resolve(this.changes !== 0);
          }
        });
      });
      return true;
    } catch (err: any) {
      throw new InternalServerError(err.message);
    }
  }

  static async deleteUser(id: number): Promise<boolean> {
    try {
      const dateDesactivated = new Date().getTime();

      const sql =
        "UPDATE Users SET status = ?, dateDesactivate = ? WHERE id = ?";
      const params = [false, dateDesactivated, id];

      await new Promise((resolve, reject) => {
        database.run(sql, params, function (err) {
          if (err) {
            reject(new BadRequestError(err.message));
          } else {
            resolve(this.changes !== 0);
          }
        });
      });

      return true;
    } catch (err: any) {
      throw new InternalServerError(err.message);
    }
  }
}
