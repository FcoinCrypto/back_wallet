const db = require('../database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function createWallet(userId) {
    const uniqueIdentifier = crypto.randomBytes(16).toString('hex');
    const salt = await bcrypt.genSalt(10);
    const hashedIdentifier = await bcrypt.hash(uniqueIdentifier, salt);
    const walletAddress = 'arc' + hashedIdentifier;

    const sql = 'INSERT INTO wallets (user_id, address) VALUES (?, ?)';
    db.run(sql, [userId, walletAddress], (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Wallet created successfully.');
        }
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
    getWalletByUserId
};
