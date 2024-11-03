const formulario = document.querySelector('.idformulario');
const campos = document.querySelectorAll('.input_validate');
const spans = document.querySelectorAll('.span_mensagem');

console.log(campos)

formulario.addEventListener('submit', event => {
    event.preventDefault();
    const validadores = [
        validaNome,
        validaNomeMaterno,
        validaCPF
    ];
    const eValido = validadores.every(validador => validador());

    if (eValido) {
        window.location = './index.html';
    }
});


function setError(element, span) {
    // Função responsavel por aplicar estilo ao campo e o span do campo se o informação for invalida.
    element.style.border = '2px solid #e6336e';
    span.style.display = 'block';
}

function removeError(element, span){
    // Função responsavel por remover o estilo ao campo e o span quando a informação for valida.
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
    // Função responsavel por validar o campo nome.
    return validaCampo(0, campos[0].value.length >= 15);
}

function validaNomeMaterno() {
    return validaCampo(1, campos[1].value.length >= 10);
}

function validaCPF() {
    return validaCampo(2, TestaCPF(campos[2].value));
}

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}
// var strCPF = "12345678909";
// alert(TestaCPF(strCPF));
