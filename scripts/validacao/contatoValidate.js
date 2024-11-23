const formulario = document.getElementById('idformularioContato');
const campos = document.querySelectorAll('.input_validate_contato');
const spans = document.querySelectorAll('.span_mensagem_contato');

formulario.addEventListener('submit', event => {
    /** Função responsavel por 
     * Const "validadores" -> Lista contendo todas as funções para validação.
     * for -> Percorre a lista, se ao menos um campo estiver invalido, "eValido" recebe "false" como valor.
     * if e else -> Verifica o valor do "eValido", se "false" formulario não é enviado, se não formulario é enviado com sucesso.
     * A função garante que o formulario so seja enviado em caso de todos os campos estiverem corretos.
    */

    let eValido = true; // true, se todos os campos forem validos.

    const validadores = [
        validaNomeLogin,
        validaEmailLogin,
        validaComentarioLogin
    ];

    // Percorre todas as funções responsaveis pelas validações dos campos.
    for (const validador of validadores) {
        if (!validador()) {
            eValido = false; // Define como inválido (false) se alguma validação falhar.
        }
    }

    // Se "eValido" for "false", significa que algum campos está invalido.
    if (!eValido) {
        event.preventDefault(); 
    } else {
        alert('Cadastro realizado com sucesso!');
        window.location = './index.html';
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
    /** Função responsavel por verificar se o campo é valido, e exibir uma mensagem informando.*/
    if (condicao) {
        removeError(campos[index], spans[index]);
        return true;
    } else {
        setError(campos[index], spans[index]);
        return false;
    }
}

function validaNomeLogin() {
    return validaCampo(0, campos[0].value.length >= 15);
}

function validaEmailLogin() {
    const email = campos[1].value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return validaCampo(1, emailRegex.test(email));
}

function validaComentarioLogin() {
    return validaCampo(2, campos[2].value.length >= 15)
}