const express = require('express');
const axios = require('axios');
const transactionRoutes = require('./routes/transaction');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/dashboard', function(req, res) {
  // obtenir l'adresse et le solde du wallet de l'utilisateur avec son ID
  const userId = 1; // Remplacer 1 par l'ID de l'utilisateur connecté
  axios.get(`http://localhost:3001/api/wallets/${userId}`)
    .then(response => {
      console.log(response.data);
      const walletAddress = response.data.address;
      const walletBalance = response.data.balance;
      res.render('dashboard', { walletAddress, walletBalance });
    })
    .catch(error => {
      console.log(error.response.data);
      res.status(500).json({ error: error.response.data.error });
    });
});

// Endpoint pour créer un wallet pour un utilisateur
app.post('/api/wallets/:userId', (req, res) => {
  const userId = req.params.userId;
  axios.post(`http://localhost:3001/api/wallets/${userId}`)
    .then(response => {
      console.log(response.data);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error.response.data);
      res.status(500).json({ error: error.response.data.error });
    });
});

// Endpoint pour envoyer une transaction
app.post('/api/transactions/send', (req, res) => {
  const { senderWalletId, recipientWalletAddress, amount } = req.body;
  axios.post('http://localhost:3001/api/transactions/send', { senderWalletId, recipientWalletAddress, amount })
    .then(response => {
      console.log(response.data);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error.response.data);
      res.status(500).json({ error: error.response.data.error });
    });
});

// Endpoint pour obtenir l'historique des transactions d'un wallet
app.get('/api/transactions/history/:walletId', (req, res) => {
  const walletId = req.params.walletId;
  axios.get(`http://localhost:3001/api/transactions/history/${walletId}`)
    .then(response => {
      console.log(response.data);
      res.render('history', { transactions: response.data });
    })
    .catch(error => {
      console.log(error.response.data);
      res.status(500).json({ error: error.response.data.error });
    });
});


app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  axios.post('http://localhost:3001/api/users/register', { name, email, password })
    .then(response => {
      console.log(response.data);
      res.redirect('/login');
    })
    .catch(error => {
      console.log(error.response.data);
      res.render('register', { error: error.response.data.error });
    });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  axios.post('http://localhost:3001/api/users/login', { email, password })
    .then(response => {
      console.log(response.data);
      res.redirect('/dashboard');
    })
    .catch(error => {
      console.log(error);
      res.render('login', { error: 'Invalid credentials', error: error.response.data.error });
    });
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});


app.use('/api/transactions', transactionRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
