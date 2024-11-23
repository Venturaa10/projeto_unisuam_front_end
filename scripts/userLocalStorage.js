function setupLogoutButton() {
    const logoutButton = document.getElementById('logoutButton');
    console.log('Botão de logout encontrado:', logoutButton);  

    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('isLoggedIn'); 
            window.location.href = '/templates/login.html'; 
        });
    } else {
        console.error('Botão de logout não encontrado no DOM');
    }
}


function showUserName() {
    const userNameElement = document.getElementById('userName');
    const logoutButton = document.getElementById('logoutButton');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        const loginSalvo = localStorage.getItem('login');
        if (userNameElement) {
            userNameElement.style.display = 'inline';  
            userNameElement.textContent = loginSalvo;  
        }
        if (logoutButton) {
            logoutButton.style.display = 'inline';  
        }
    } else {
        if (userNameElement) {
            userNameElement.style.display = 'none'; 
        }
        if (logoutButton) {
            logoutButton.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM completamente carregado');
    setupLogoutButton(); 
    showUserName();       
});
