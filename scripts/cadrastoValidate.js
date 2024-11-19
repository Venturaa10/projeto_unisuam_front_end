const formulario = document.getElementById('idformulario');
const campos = document.querySelectorAll('.input_validate');
const spans = document.querySelectorAll('.span_mensagem');

// Recuperar dados do localStorage e preencher campos
window.onload = function () {
    if (localStorage.getItem("formData")) {
        const formData = JSON.parse(localStorage.getItem("formData"));
        campos.forEach(campo => {
            if (formData[campo.id]) {
                campo.value = formData[campo.id];
            }
        });

        // Para os campos de radio e checkbox
        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            if (formData[radio.name] && radio.value === formData[radio.name]) {
                radio.checked = true;
            }
        });
    }
};

formulario.addEventListener('submit', event => {
    let eValido = true; // true, se todos os campos forem válidos.

    const validadores = [
        validaNome,
        validaNomeMaterno,
        validaCPF,
        validaLogin,
        validaSenha,
        validaConfirmaSenha,
        validaEmail,
        validaCEP
    ];

    // Percorre todas as funções responsáveis pelas validações dos campos.
    for (const validador of validadores) {
        if (!validador()) {
            eValido = false; // Define como inválido (false) se alguma validação falhar.
        }
    }

    if (!eValido) {
        event.preventDefault(); 
    } else {
        // Salva os dados no localStorage antes de enviar o formulário
        const formData = {};
        campos.forEach(campo => {
            formData[campo.id] = campo.value;
        });

        // Salvar os dados dos radios
        const radios = document.querySelectorAll('input[type="radio"]:checked');
        radios.forEach(radio => {
            formData[radio.name] = radio.value;
        });

        // Salva os dados no localStorage
        localStorage.setItem("formData", JSON.stringify(formData));

        alert('Cadastro realizado com sucesso!');
        // window.location = './index.html'; // Descomente se for redirecionar após sucesso.
    }
});

// Funções de validação
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

function validaNomeMaterno() {
    return validaCampo(1, campos[1].value.length >= 10);
}

function validaCPF() {
    return validaCampo(2, TestaCPF(campos[2].value));
}

function validaLogin() {
    let login = campos[3].value;
    return validaCampo(3, apenasLetras(login));
}

function validaSenha() {
    let senha = campos[4].value;
    if (apenasLetras(senha)) {
        validaConfirmaSenha(); 
        return validaCampo(4, senha.length === 8);
    } else {
        return false;
    }
}

function validaConfirmaSenha() {
    const senha = campos[4].value;
    const confirmaSenha = campos[5].value;
    return validaCampo(5, senha === confirmaSenha);
}

function validaEmail() {
    const email = campos[6].value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return validaCampo(6, emailRegex.test(email));
}

function validaCEP() {
    const cep = campos[7].value;
    if (preencherEndereco(cep)) {
        return validaCampo(7, true);
    } else {
        return validaCampo(7, false);
    }
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

function preencherEndereco(cep) {
    const cepFormatado = cep.replace(/\D/g, '');

    if (cepFormatado.length === 8) {
        const apiUrl = `https://viacep.com.br/ws/${cepFormatado}/json/`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('endereco').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                    removeError(campos[7], spans[7]);
                } else {
                    setError(campos[7], spans[7]);
                }
            })
            .catch(error => {
                console.log('Ocorreu um erro:', error);
            });
    }
}
