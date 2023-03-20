const db = require('../database');
const bcrypt = require('bcrypt');

async function createUser(name, email, password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.run(sql, [name, email, hashedPassword], (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('User created successfully.');
        }
    });
}

async function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.get(sql, [email], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

// Ajoutez cette fonction pour comparer les mots de passe
async function comparePasswords(inputPassword, hashedPassword) {
    return bcrypt.compare(inputPassword, hashedPassword);
}

async function findByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE email = ?';
      db.get(sql, [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
  
  module.exports = {
    createUser,
    getUserByEmail,
    comparePasswords,
    findByEmail
  };