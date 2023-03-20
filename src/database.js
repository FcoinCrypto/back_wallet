const sqlite3 = require('sqlite3').verbose();

// Connexion à la base de données
const db = new sqlite3.Database('./wallet_db.sqlite3', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Création de la table des utilisateurs
const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- identifiant unique de l'utilisateur
    name TEXT NOT NULL, -- nom de l'utilisateur
    email TEXT UNIQUE NOT NULL, -- adresse e-mail unique de l'utilisateur
    password TEXT NOT NULL, -- mot de passe de l'utilisateur
    user_type TEXT NOT NULL -- type d'utilisateur (user, marchand, cashpoint)
);`;

// Création de la table des portefeuilles
const createWalletTable = `CREATE TABLE IF NOT EXISTS wallets (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- identifiant unique du portefeuille
    user_id INTEGER NOT NULL, -- identifiant de l'utilisateur associé à ce portefeuille
    address TEXT UNIQUE NOT NULL, -- adresse unique du portefeuille
    balance REAL DEFAULT 0, -- solde du portefeuille
    FOREIGN KEY (user_id) REFERENCES users (id) -- clé étrangère pour faire le lien avec la table des utilisateurs
);`;

// Création de la table des transactions
const createTransactionTable = `CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- identifiant unique de la transaction
    sender_wallet_id INTEGER NOT NULL, -- identifiant du portefeuille émetteur
    recipient_wallet_id INTEGER NOT NULL, -- identifiant du portefeuille destinataire
    amount REAL NOT NULL, -- montant de la transaction
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, -- date et heure de la transaction
    FOREIGN KEY (sender_wallet_id) REFERENCES wallets (id), -- clé étrangère pour faire le lien avec la table des portefeuilles
    FOREIGN KEY (recipient_wallet_id) REFERENCES wallets (id) -- clé étrangère pour faire le lien avec la table des portefeuilles
);`;

// Exécution des requêtes de création de tables
db.exec([createUserTable, createWalletTable, createTransactionTable].join(''), (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Tables created successfully.');
    }
});

module.exports = db;
