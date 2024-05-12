import sqlite3 from "sqlite3";

const DBSOURCE = "db.sqlite";

// Script SQL para criar as tabelas
const DDL_SCRIPT = `
  CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    status BOOLEAN NOT NULL,
    dateCreated INTEGER NOT NULL,
    dateDesactivated INTEGER,
    balance REAL NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS Stocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    companyName TEXT NOT NULL,
    symbol TEXT UNIQUE NOT NULL,
    currentPrice REAL NOT NULL,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS Transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    stockId INTEGER NOT NULL,
    type TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    pricePerStock REAL NOT NULL,
    timestamp INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (stockId) REFERENCES Stocks(id)
  );

  CREATE TABLE IF NOT EXISTS Wallet (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    stockId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (stockId) REFERENCES Stocks(id)
  );
`;

// Conectar ao banco de dados SQLite
const database = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Database connected.");
    // Criar as tabelas se elas não existirem
    database.exec(DDL_SCRIPT, (err) => {
      if (err) {
        console.error("Error creating tables:", err);
        throw err;
      }
      console.log("Tables created (if they did not exist).");
    });
  }
});

// Exportar a instância do banco de dados para ser utilizada em outros lugares do projeto
export default database;
