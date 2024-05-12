import database from "../db/database";
import { CreateUserError, GetUserError } from "../errors/userErrors";
import { User } from "../interfaces/IUser";

class UserService {
  async createUser({
    username,
    password,
    email,
  }: Partial<User>): Promise<{ id: number }> {
    console.log("sexo");
    try {
      let dateCreated = new Date().getTime();
      const sql =
        "INSERT INTO Users (username, password, email, status, dateCreated) VALUES (?, ?, ?, ?, ?)";
      const params = [username, password, email, true, dateCreated];

      return new Promise((resolve, reject) => {
        database.run(sql, params, function (err) {
          if (err) {
            reject(new CreateUserError());
          } else {
            resolve({ id: this.lastID });
          }
        });
      });
    } catch (err) {
      throw CreateUserError;
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM Users WHERE id = ?";
      const params = [id];

      return new Promise((resolve, reject) => {
        database.get(sql, params, (err, row) => {
          if (err) {
            reject(new GetUserError());
          }
          resolve(row as User);
        });
      });
    } catch (err) {
      throw GetUserError;
    }
  }
  /*
  static getAllUsers(callback: (users: User[]) => void): void {
    const sql = "SELECT * FROM Users";

    database.all(sql, (err, rows) => {
      if (err) {
        console.error("Error getting all users:", err);
        callback([]);
        return;
      }
      const users: User[] = rows.map((row) => row as User);
      callback(users);
    });
  }

  static updateUser(user: User, callback: (success: boolean) => void): void {
    const sql =
      "UPDATE Users SET username = ?, password = ?, email = ? WHERE id = ?";
    const params = [user.username, user.password, user.email, user.id];

    database.run(sql, params, function (err) {
      if (err) {
        console.error("Error updating user:", err);
        callback(false);
        return;
      }
      callback(true);
    });
  }

  static deleteUser(id: number, callback: (success: boolean) => void): void {
    const sql = "DELETE FROM Users WHERE id = ?";
    const params = [id];

    database.run(sql, params, function (err) {
      if (err) {
        console.error("Error deleting user:", err);
        callback(false);
        return;
      }
      callback(true);
    });
  }
  */
}
export default UserService;
