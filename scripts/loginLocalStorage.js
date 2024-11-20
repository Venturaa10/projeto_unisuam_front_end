const formularioLogin = document.getElementById('idformularioLogin');
const camposLogin = document.querySelectorAll('.input_validate');
const spansLogin = document.querySelectorAll('.span_mensagem');

formularioLogin.addEventListener('submit', event => {
    /** Configuração para buscar as informações no LocalStorage
     * Variaveis:
     * login, senha e email -> Valor dos campos no formulario de login.
     * loginSalvo, senhaSalva, emailSalvo -> Pega o item (chave e valor) no localStorage. 
     * localStorage.getItem('chave') -> Pega o valor da chave.
     * userNameElement -> Pega id "userName" da tag que exibe o nome de login.
     * 
     * Condicional:
     * Verifica se as informações fornecidas pelo usuario, corresponde a informações dentro do localStorage.
     * 
     * Segunda condicional:
     * Verifica se existe userNameElement e aplica estilo ao elemento.
     * 
     */
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

        // Para exibir nome de login no HTML.
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.style.display = 'inline'; // Torna o nome visível
            userNameElement.textContent = loginSalvo;  // Define o nome de login a ser exibido.
        }

    } else {
        alert('Login ou senha inválidos!');
    }
});
