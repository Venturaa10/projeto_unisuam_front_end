// Função para configurar o botão de logout
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

// Função para mostrar o nome do usuário se ele estiver logado
function showUserName() {
    const userNameElement = document.getElementById('userName');
    const logoutButton = document.getElementById('logoutButton');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        const loginSalvo = localStorage.getItem('login');
        if (userNameElement && logoutButton) {
            console.log('Botão de logout encontrado na função showUserName:', logoutButton);
            userNameElement.style.display = 'inline';  
            userNameElement.textContent = loginSalvo;  
            logoutButton.style.display = 'inline';  
        }
    }
}

// Espera o DOM carregar completamente antes de executar
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM completamente carregado');
    setupLogoutButton();  // Configura o botão de logout
    showUserName();       // Mostra o nome do usuário, se logado
});
