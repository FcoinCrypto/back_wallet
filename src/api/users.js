const express = require('express');
const User = require('../models/user');

const router = express.Router();
// route pour enregistrer un nouvel utilisateur
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà dans la base de données
        const userExists = await User.findByEmail(email);
        if (userExists) {
            return res.status(400).json({ message: 'A user with this email already exists' });
        }

        // Si l'utilisateur n'existe pas, créer un nouveau compte utilisateur
        await User.createUser(name, email, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to register user', error: err.message });
    }
});


// route pour connecter un utilisateur renvoie l'id de l'utilisateur et son nom et son email  
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        const passwordMatch = await User.comparePasswords(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        // Inclure l'ID de l'utilisateur dans la réponse
        res.status(200).json({ message: 'Logged in successfully', user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to log in', error : err.message});
    }
});


module.exports = router;
