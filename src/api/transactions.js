const express = require('express');
const Transaction = require('../models/transaction');

const router = express.Router();

router.post('/send', async (req, res) => {
    try {
        const { senderWalletId, recipientWalletAddress, amount } = req.body;
        await Transaction.createTransaction(senderWalletId, recipientWalletAddress, amount);
        res.status(201).json({ message: 'Transaction sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to send transaction', error: err.message});
    }
});

router.get('/history/:walletId', async (req, res) => {
    try {
        const walletId = parseInt(req.params.walletId, 10);
        const transactionHistory = await Transaction.getTransactionHistory(walletId);
        res.status(200).json(transactionHistory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch transaction history' });
    }
});

module.exports = router;
