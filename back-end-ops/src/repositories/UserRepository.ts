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
}
export default UserRepository;
