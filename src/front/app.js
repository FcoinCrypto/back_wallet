const express = require('express');
const axios = require('axios');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// middleware pour traiter les requêtes POST
app.use(express.urlencoded({ extended: true }));

// définition de la route pour la page d'accueil
app.get('/', (req, res) => {
  res.send(`
    <h1>Mon Portefeuille</h1>
    <form method="POST" action="/login">
      <label for="username">Nom d'utilisateur</label>
      <input type="text" id="username" name="username">
      <label for="password">Mot de passe</label>
      <input type="password" id="password" name="password">
      <button type="submit">Se connecter</button>
    </form>
  `);
});

// définition de la route pour la page de connexion
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  axios.post('http://localhost:3001/api/users/login', { username, password })
    .then(response => {
      console.log(response.data);
      res.send(`
        <h1>Vous êtes connecté</h1>
        <p>Votre token d'authentification : ${response.data.token}</p>
      `);
    })
    .catch(error => {
      console.log(error.response.data);
      res.send(`
        <h1>Erreur de connexion</h1>
        <p>${error.response.data.error}</p>
      `);
    });
});

// démarrage du serveur
app.listen(3000, () => {
  console.log('Le serveur est démarré sur le port 3000');
});
