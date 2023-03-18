const db = require('../database');

function createTransaction(senderWalletId, recipientWalletId, amount) {
    const sql = 'INSERT INTO transactions (sender_wallet_id, recipient_wallet_id, amount) VALUES (?, ?, ?)';
    db.run(sql, [senderWalletId, recipientWalletId, amount], (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Transaction created successfully.');
        }
    });
}

function getTransactionHistory(walletId) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * FROM transactions
            WHERE sender_wallet_id = ? OR recipient_wallet_id = ?
            ORDER BY timestamp DESC
        `;
        db.all(sql, [walletId, walletId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = {
    createTransaction,
    getTransactionHistory
};
