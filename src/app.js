const express = require('express');
const usersRouter = require('./api/users');
const walletsRouter = require('./api/wallets');
const transactionsRouter = require('./api/transactions');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/wallets', walletsRouter);
app.use('/api/transactions', transactionsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
