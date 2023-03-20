document.addEventListener('DOMContentLoaded', () => {
    displayUserInfo();
});

function displayUserInfo() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        document.getElementById('user-name').textContent = user.name;
        document.getElementById('user-email').textContent = user.email;
        
    }
}
