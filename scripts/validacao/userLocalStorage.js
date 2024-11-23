// function setupLogoutButton() {
//     const logoutButton = document.getElementById('logoutButton');
//     console.log('Botão de logout encontrado:', logoutButton);  
function setupLogoutButton() {
    /** Configurar botão de logout do site.
     * const:
     * logoutButton - Pega o id do botão.
     * 
     * Condição:
     *  logoutButton True:
     * Botão existe, quando acontecer um clique no botão, "isLoggedIn" é removido do localStorage.
     * Usuario é redirecionado para a pagina de login.
     * 
     * False:
     * Exibe mensagem informando que botão não foi encontrado.
     */
    const logoutButton = document.getElementById('logoutButton');
    console.log('Botão de logout encontrado:', logoutButton); // Informar mensagem sobre a existencia do botão.

//     if (logoutButton) {
//         logoutButton.addEventListener('click', function () {
//             localStorage.removeItem('isLoggedIn'); 
//             window.location.href = '/templates/login.html'; 
//         });
//     } else {
//         console.error('Botão de logout não encontrado no DOM');
//     }
// }


function showUserName() {
    /** Exibir o nome do usuario e botão para logout quando estiver logado.
     * const:
     * userNameElement e logoutButton: Pega id dos elementos no HTML (nesse caso navbar.html).
     * isLoggedIn: Pega valor do item "isLoggedIn" no localStorage.
     * 
     * Condição:
     * isLoggedIn True:
     * Usuario está logado.
     * loginSalvo: Pega o valor da chave "login" no local Storage.
     * 
     * Condição if (True e True):
     * Verificar se existe ambos valores da condição.
     * Exibir mensagem e aplcar estilos para nome de usuario e botão ficarem visiveis.
     */
    const userNameElement = document.getElementById('userName');
    const logoutButton = document.getElementById('logoutButton');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        const loginSalvo = localStorage.getItem('login');
        if (userNameElement && logoutButton) {
            console.log('Botão de logout encontrado na função showUserName:', logoutButton); // Informar que encontrou a função encontrou o botão.
            userNameElement.style.display = 'inline';  
            userNameElement.textContent = loginSalvo;  
            logoutButton.style.display = 'inline';  
        }
    }
}

// Espera o DOM carregar completamente antes de executar
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM completamente carregado');
    setupLogoutButton();  
    showUserName();   
});
