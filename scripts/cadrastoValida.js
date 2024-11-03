const formulario = document.getElementById('idformulario');
const campos = document.querySelectorAll('.input_validate');
const spans = document.querySelectorAll('.span_mensagem');


formulario.addEventListener('submit', event => {
    let eValido = true;

    if (!validaNome()) {
        eValido = false;
    }
    if (!validaCpf()) {
        eValido = false;
    }
    if (!validaLogin()) {
        eValido = false;
    }
    if (!validaSenha()) {
        eValido = false;
    }
    if (!validaConfirmaSenha()) {
        eValido = false;
    }
    if (!eValido) {
        event.preventDefault();
    } else {
        event.preventDefault();
        localStorage.setItem('loginUsuario', loginUsuario.value);
        localStorage.setItem('senhaUsuario', senhaUsuario.value);
        window.location = '/templates/index.html';
    }
})


function setError(index) {
    // Função responsavel por aplicar estilo ao campo e o span do campo se o informação for invalida.
    campos[index].style.border = '2px solid #e6336e';
    spans[index].style.display = 'block';
}

function removeError(index){
    // Função responsavel por remover o estilo ao campo e o span quando a informação for valida.
    campos[index].style.border = '';
    spans[index].style.display = 'none';
}

function validaNome() {
    // Função responsavel por validar o campo nome.
    if(campos[0].value.length < 10)
    {
        setError(0);
        return false;
    }
    else {
        removeError(0);
        return true;
    }
}

function validaLogin() {
    // Função responsavel por validar o campo login.
    if (campos[1].value.length !== 5) {
        setError(1);
        return false;

    } else {
        removeError(1);
        return true;
    }
}

function validaSenha() {
    // Função responsavel por validar o campo da senha.
    if (campos[2].value.length !== 8) {
        setError(2);
        return false;

    }
    else {
        removeError(2);
        return true;
    }
}

function validaConfirmaSenha() {
    // Função responsavel por validar o campo da confimação de senha.
    if (campos[2].value === campos[3].value && campos[2].value.length === 8) {
        removeError(3);
        return true;
    } else {
        setError(3);
        return false;

    }
}
