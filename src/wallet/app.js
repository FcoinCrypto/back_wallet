document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            registerUser();
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            loginUser();
        });
    }
});

// ... Reste du code inchangé ...


function registerUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert(data.message);
        window.location.href = 'login.html';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.message === "Logged in successfully") {
            // Vous pouvez stocker les informations de l'utilisateur dans localStorage ou sessionStorage
            localStorage.setItem('user', JSON.stringify(data.user));

            // Rediriger l'utilisateur vers une page protégée (par exemple, dashboard.html)
            window.location.href = 'dashboard.html';
        } else {
            alert("Erreur de connexion");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

