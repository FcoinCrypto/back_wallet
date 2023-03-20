const db = require('../database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function createWallet(userId) {
    // Vérifier si un portefeuille existe déjà pour cet utilisateur
    const existingWallet = await getWalletByUserId(userId);
    if (existingWallet) {
      throw new Error("A wallet already exists for this user");
    }
  
    // Générer un identifiant unique pour le portefeuille
    const uniqueIdentifier = crypto.randomBytes(16).toString('hex');
    const salt = await bcrypt.genSalt(10);
    const hashedIdentifier = await bcrypt.hash(uniqueIdentifier, salt);
    const walletAddress = 'arc' + hashedIdentifier;
  
    // Insérer le portefeuille dans la base de données
    const sql = 'INSERT INTO wallets (user_id, address) VALUES (?, ?)';
    db.run(sql, [userId, walletAddress], (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Wallet created successfully.');
      }
    });
  }
  

async function findById(walletId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM wallets WHERE id = ?';
        db.get(sql, [walletId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}



// Ajoutez cette fonction pour trouver un portefeuille par adresse
async function findByAddress(address) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM wallets WHERE address = ?';
        db.get(sql, [address], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

// Ajoutez cette fonction pour mettre à jour le solde d'un portefeuille
async function updateBalance(walletId, balanceChange) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE wallets SET balance = balance + ? WHERE id = ?';
        db.run(sql, [balanceChange, walletId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}


async function updateBalance(walletId, balanceChange) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE wallets SET balance = balance + ? WHERE id = ?';
        db.run(sql, [balanceChange, walletId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}


function getWalletByUserId(userId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM wallets WHERE user_id = ?';
        db.get(sql, [userId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}



module.exports = {
    createWallet,
    findByAddress,
    findById,
    getWalletByUserId,
    updateBalance
};
