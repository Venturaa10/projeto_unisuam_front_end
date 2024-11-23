document.addEventListener('DOMContentLoaded', function() {
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
    const formularioLogin = document.getElementById('idformularioLogin');
    const camposLogin = document.querySelectorAll('.input_validate');

    if (formularioLogin) {
        formularioLogin.addEventListener('submit', event => {
            event.preventDefault();  

            const login = camposLogin[0].value;  
            const senha = camposLogin[1].value;  
            const email = camposLogin[2].value;  

            // Obtendo dados do localStorage
            const loginSalvo = localStorage.getItem('login');
            const senhaSalva = localStorage.getItem('senha');
            const emailSalvo = localStorage.getItem('email');

            // Valida se as informações correspondem
            if (login === loginSalvo && senha === senhaSalva && email === emailSalvo) {
                alert('Login bem-sucedido!');
                localStorage.setItem('isLoggedIn', 'true'); 
                window.location.href = '/templates/index.html'; 
            } else {
                alert('Login ou senha inválidos!');
            }
        });
    } else {
        console.error('Formulário de login não encontrado!');
    }
});
