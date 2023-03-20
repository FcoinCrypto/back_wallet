const db = require('../database');
const Wallet = require('./wallet');

async function createTransaction(senderWalletId, recipientWalletAddress, amount) {
    const senderWallet = await Wallet.findById(senderWalletId);
    const recipientWallet = await Wallet.findByAddress(recipientWalletAddress);

    if (!senderWallet || !recipientWallet) {
        throw new Error("Invalid sender or recipient wallet");
    }

    if (senderWallet.balance < amount) {
        throw new Error("Insufficient balance in sender's wallet");
    }

    const sql = 'INSERT INTO transactions (sender_wallet_id, recipient_wallet_id, amount) VALUES (?, ?, ?)';
    db.run(sql, [senderWalletId, recipientWallet.id, amount], (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Transaction created successfully.');
        }
    });

    await Wallet.updateBalance(senderWalletId, senderWallet.balance - amount);
    await Wallet.updateBalance(recipientWallet.id, recipientWallet.balance + amount);
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
