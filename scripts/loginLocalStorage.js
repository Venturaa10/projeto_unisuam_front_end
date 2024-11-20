const formularioLogin = document.getElementById('idformularioLogin');
const camposLogin = document.querySelectorAll('.input_validate');
const spansLogin = document.querySelectorAll('.span_mensagem');

formularioLogin.addEventListener('submit', event => {
    event.preventDefault();  // Impede o envio do formulário enquanto valida

    const login = camposLogin[0].value;  // Login
    const senha = camposLogin[1].value;  // Senha
    const email = camposLogin[2].value;  // Email

    // Obtendo dados do localStorage
    const loginSalvo = localStorage.getItem('login');
    const senhaSalva = localStorage.getItem('senha');
    const emailSalvo = localStorage.getItem('email');

    // Valida se as informações correspondem
    if (login === loginSalvo && senha === senhaSalva && email === emailSalvo) {
        alert('Login bem-sucedido!');

        // Exibe o nome do usuário ao lado da imagem do perfil
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.style.display = 'inline'; // Torna o nome visível
            userNameElement.textContent = loginSalvo;  // Define o nome do usuário
        }

    } else {
        alert('Login ou senha inválidos!');
    }
});
