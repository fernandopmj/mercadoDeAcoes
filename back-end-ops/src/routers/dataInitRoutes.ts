import express from "express";
import database from "../utils/database";

const router = express.Router();

router.post("/init", async (req, res) => {
  try {
    await clearDatabase();
    await insertExampleData();
    res
      .status(200)
      .send("Database initialized successfully with example data.");
  } catch (error) {
    console.error("Error initializing database:", error);
    res.status(500).send("Internal server error");
  }
});

// Função para limpar todas as tabelas do banco de dados
async function clearDatabase() {
  await database.run("DELETE FROM Users");
  await database.run("DELETE FROM Stocks");
  await database.run("DELETE FROM Transactions");
  await database.run("DELETE FROM Wallet");
}

async function insertExampleData() {
  try {
    // Inserir usuários de exemplo
    database.run(`
        INSERT INTO Users (username, password, email, status, dateCreated, balance)
        VALUES
          ('user1', 'password1', 'user1@example.com', 1, ${Date.now()}, 1000),
          ('user2', 'password2', 'user2@example.com', 1, ${Date.now()}, 1500),
          ('user3', 'password3', 'user3@example.com', 1, ${Date.now()}, 2000),
          ('user4', 'password4', 'user4@example.com', 1, ${Date.now()}, 2500),
          ('user5', 'password5', 'user5@example.com', 1, ${Date.now()}, 3000);
      `);

    // Inserir ações de exemplo
    database.run(`
        INSERT INTO Stocks (companyName, symbol, currentPrice, description)
        VALUES
          ('Company A', 'A', 50, 'Description of Company A'),
          ('Company B', 'B', 60, 'Description of Company B'),
          ('Company C', 'C', 70, 'Description of Company C'),
          ('Company D', 'D', 80, 'Description of Company D'),
          ('Company E', 'E', 90, 'Description of Company E');
      `);

    // Inserir transações de exemplo
    database.run(`
        INSERT INTO Transactions (userId, stockId, type, quantity, pricePerStock, timestamp)
        VALUES
          (1, 1, 'buy', 10, 50, ${Date.now()}),
          (2, 2, 'buy', 15, 60, ${Date.now()}),
          (3, 3, 'sell', 20, 70, ${Date.now()}),
          (4, 4, 'sell', 25, 80, ${Date.now()});
      `);

    // Inserir carteiras de exemplo
    database.run(`
        INSERT INTO Wallet (userId, stockId, quantity)
        VALUES
          (1, 1, 10),
          (2, 2, 15),
          (3, 3, 20),
          (4, 4, 25);
      `);

    console.log("Example data inserted successfully.");
  } catch (error) {
    console.error("Error inserting example data:", error);
  }
}
export default router;
