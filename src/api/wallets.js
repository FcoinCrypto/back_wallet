const express = require('express');
const Wallet = require('../models/wallet');

const router = express.Router();

router.post('/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        await Wallet.createWallet(userId);
        res.status(201).json({ message: 'Wallet created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create wallet' });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const wallet = await Wallet.getWalletByUserId(userId);
        res.status(200).json(wallet);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch wallet' });
    }
});

module.exports = router;
