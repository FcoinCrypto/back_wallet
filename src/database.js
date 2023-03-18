const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./wallet_db.sqlite3', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Création des tables
const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);`;

const createWalletTable = `CREATE TABLE IF NOT EXISTS wallets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    address TEXT UNIQUE NOT NULL,
    balance REAL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users (id)
);`;

const createTransactionTable = `CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_wallet_id INTEGER NOT NULL,
    recipient_wallet_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_wallet_id) REFERENCES wallets (id),
    FOREIGN KEY (recipient_wallet_id) REFERENCES wallets (id)
);`;

db.exec([createUserTable, createWalletTable, createTransactionTable].join(''), (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Tables created successfully.');
    }
});

module.exports = db;
