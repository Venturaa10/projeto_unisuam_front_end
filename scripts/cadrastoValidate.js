const formulario = document.getElementById('idformulario');
const campos = document.querySelectorAll('.input_validate');
const spans = document.querySelectorAll('.span_mensagem');

formulario.addEventListener('submit', async event => {
    let eValido = true;

    const validadores = [
        validaNome,
        validaCPF,
        validaLogin,
        validaSenha,
        validaConfirmaSenha,
        validaEmail,
        validaCEP
    ];

    for (const validador of validadores) {
        if (!validador()) {
            eValido = false;
        }
    }

    // Se tudo estiver válido, salva no localStorage
    if (eValido) {
        // Armazenando no localStorage
        localStorage.setItem('nome', campos[0].value);  // Armazenando o nome do usuário (campo 0 é o nome)
        localStorage.setItem('login', campos[2].value);  // Armazenando o login
        localStorage.setItem('senha', campos[3].value);  // Armazenando a senha
        localStorage.setItem('email', campos[5].value);  // Armazenando o email

        alert('Cadastro realizado com sucesso!');
        // window.location = './index.html';
    } else {
        event.preventDefault();  // Impede o envio do formulário se a validação falhar
    }
});

function setError(element, span) {
    element.style.border = '3px solid #af3030';
    span.style.display = 'block';
}

function removeError(element, span) {
    element.style.border = '';
    span.style.display = 'none';
}

function validaCampo(index, condicao) {
    if (condicao) {
        removeError(campos[index], spans[index]);
        return true;
    } else {
        setError(campos[index], spans[index]);
        return false;
    }
}

function validaNome() {
    return validaCampo(0, campos[0].value.length >= 15);
}

function validaCPF() {
    return validaCampo(1, TestaCPF(campos[1].value));
}

function validaLogin() {
    let login = campos[2].value;
    return validaCampo(2, apenasLetras(login) && login.length === 6);
}

function validaSenha() {
    let senha = campos[3].value;
    if (apenasLetras(senha) && senha.length === 8) {
        return validaCampo(3, true); 
    } else {
        setError(campos[3], spans[3]);
        return false;
    }
}

function validaConfirmaSenha() {
    const senha = campos[3].value;
    const confirmaSenha = campos[4].value;
    return validaCampo(4, senha === confirmaSenha);
}

function validaEmail() {
    const email = campos[5].value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return validaCampo(5, emailRegex.test(email));
}

async function validaCEP() {
    const cep = campos[6].value;
    return await preencherEndereco(cep);
}


function apenasLetras(letras) {
    let regex = /^[a-zA-Z]+$/;
    return regex.test(letras);
}

function TestaCPF(strCPF) {
    let Soma;
    let Resto;
    Soma = 0;

    if (strCPF == "00000000000") return false;

    for (let i = 1; i <= 9; i++) {
        Soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    }
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) {
        Soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    }
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11))) return false;

    return true;
}

async function preencherEndereco(cep) {
    const cepFormatado = cep.replace(/\D/g, '');
    if (cepFormatado.length === 8) {
        const apiUrl = `https://viacep.com.br/ws/${cepFormatado}/json/`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!data.erro) {
                document.getElementById('endereco').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
                removeError(campos[6], spans[6]);
                return true;  
            } else {
                setError(campos[6], spans[6]);
                return false;  
            }
        } catch (error) {
            console.log('Ocorreu um erro:', error);
            return false;  
        }
    }
    return false;  
}
