const express = require('express');
const usersRouter = require('./api/users');
const walletsRouter = require('./api/wallets');
const transactionsRouter = require('./api/transactions');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});




app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/wallets', walletsRouter);
app.use('/api/transactions', transactionsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
