import database from "../db/database";
import { User } from "../model/User";

class UserRepository {
  static createUser(user: User, callback: (user?: User) => void): void {
    const sql =
      "INSERT INTO Users (username, password, email) VALUES (?, ?, ?)";
    const params = [user.username, user.password, user.email];

    database.run(sql, params, function (err) {
      if (err) {
        console.error("Error creating user:", err);
        callback();
        return;
      }
      const userId = this.lastID;
      const newUser: User = { ...user, id: userId };
      callback(newUser);
    });
  }

  static getUserById(id: number, callback: (user?: User) => void): void {
    const sql = "SELECT * FROM Users WHERE id = ?";
    const params = [id];
    database.get(sql, params, (err, row) => {
      if (err) {
        console.error("Error getting user by ID:", err);
        callback();
        return;
      }
      callback(row as User);
    });
  }

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
}
export default UserRepository;
