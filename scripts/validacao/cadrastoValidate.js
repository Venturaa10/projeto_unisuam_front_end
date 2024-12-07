import { apenasLetras, regexNome, verificaCPF, preencherEndereco, verificaIdade  } from './funcoes.js';

const formulario = document.getElementById('idformulario');
const campos = document.querySelectorAll('.input_validate');
const spans = document.querySelectorAll('.span_mensagem');

formulario.addEventListener('submit', async event => {
    /** Responsabilidades
     * Variaveis:
     * "eValido" -> Recebe true se as validações forem validas, e false para invalidas.
     * lista "validadores" -> Armazena todas as validações do formulario.
     * 
     * loop for:
     * Percorre a lista "validadores" e define cada item (validação) é definida como "validador".
     * Se algum "validador" retornar "false", "eValido" recebe "false" como valor.
     * 
     * Condicional:
     * Se "eValido" for "true", significa que todas as validações estão corretas, logo cria o local storage com as informações do usuario.
     * Exibe uma mensagem informando do sucesso do cadastro ao usuario.
     * 
     * Se não, impede o envio do formulario.
     */
    let eValido = true;

    const validadores = [
        // Lista contendo todas as validações.
        validaNome,
        validaCPF,
        validaLogin,
        validaSenha,
        validaConfirmaSenha,
        validaEmail,
        validaCEP,
        validaIdade
    ];

    for (const validador of validadores) {
        if (!validador()) {
            eValido = false;
        }
    }

    // Se tudo estiver válido, salva no localStorage
    if (eValido) {
        /** Condição
         * Salva as informações de "nome", "login", "senha" e "email" no localStorage.
         * localStorage.setItem('nomeDaChave', valorDaChave).
        */

        // Armazenando no localStorage
        localStorage.setItem('login', campos[2].value);  // Armazenando o login
        localStorage.setItem('senha', campos[3].value);  // Armazenando a senha
        localStorage.setItem('email', campos[5].value);  // Armazenando o email

        alert('Cadastro realizado com sucesso!');
        // window.location = './index.html';
    } else {
        event.preventDefault();  // Impede o envio do formulário se alguma validação falhar
    }
});


function setError(element, span, mensagem) {
    /** Estilizar o span caracterizando um input invalido.
     * 
     * Parametros:
     * element -> index do campo (tag "span" no HTML).
     * span -> index do span. 
     * 
     * Variaveis:
     * element. -> Aplica borda ao elemento.
     * span. -> Define display "block" para o span ficar visivel.
     */
    element.style.border = '3px solid #af3030';
    span.style.display = 'block';
    span.textContent = mensagem; 
}


function removeError(element, span) {
    /** Estilizar o span caracterizando um input valido.
     * 
     * Parametros:
     * element -> index do campo (tag "span" no HTML).
     * span -> index do span. 
     * 
     * Variaveis:
     * element. -> Retira a borda do elemento.
     * span. -> Define display "none" para o span ficar oculto.
     */
    element.style.border = '';
    span.style.display = 'none';
}


function validaCampo(index, condicao, mensagem) {
    /** Responsabilidades
     * Parametros:
     * index -> Recebe o index do input do HTML.
     * condicao -> recebe valor do campo e define como true (campo valido) ou false (campo invalido).
     * 
     * Condicional:
     * Se "condição" true, chama função para ocultar "span".
     * Se não, aplica estilo de borda e torna o span visivel.
     * 
     * Retorno:
     * true -> Para validações validas.
     * false -> Para validações invalidas.
     */
    if (condicao) {
        removeError(campos[index], spans[index]);
        return true;
    } else {
        setError(campos[index], spans[index], mensagem);
        return false;
    }
}


function validaNome() {
    /** Validar o campo Nome
     * -> Campo nome deve ter 15 ou mais caracteres.
     */
    const nome = campos[0].value
    return validaCampo(0, regexNome(nome), 'O campo nome deve ter no mínimo 15 caracteres e no máximo 80 caracteres alfabéticos!');
}


function validaCPF() {
    /** Validar o campo CPF
     * Função TestaCPF(valorCPF) -> Verificar se o CPF informado está de acordo com o padrão brasileiro. 
     */
    const cpf = campos[1].value; 
    return validaCampo(1, verificaCPF(cpf), 'O CPF informado é invalido!');
}


function validaLogin() {
    /** Validar o campo Login
     * Variavel:
     * "login" -> Recebe valor do input login no HTML, input equivale ao indice "2".
     * 
     * Verifica se "login" contem apenas letras e tamanho exato de 6 caracteres.
     */    
    let login = campos[2].value;
    return validaCampo(2, apenasLetras(login) && login.length === 6, 'O campo Login deve ter exatamente 6 caracteres alfabéticos.');
}


function validaSenha() {
    /** Validar Senha
     * Variavel:
     * senha -> Recebe valor do input "senha" no HTML, input equivale ao indice "3".
     * 
     * Condicional:
     * Verifica se "senha" contem apenas letras e tamanho exato de 8 caracteres.
     */
    let senha = campos[3].value;
    if (apenasLetras(senha) && senha.length === 8) {
        return validaCampo(3, true); 
    } else {
        setError(campos[3], spans[3], 'O campo Senha deve ter 8 caracteres alfabéticos.');
        return false;
    }
}


function validaConfirmaSenha() {
    /** Validar Confirma Senha
     * Variavel:
     * senha -> Armazena valor da senha.
     * confirmaSenha -> Armazena valor da Confima Senha
     * 
     * Verifica se senha e confirmaSenha são iguais.
     */
    const senha = campos[3].value;
    const confirmaSenha = campos[4].value;
    return validaCampo(4, senha === confirmaSenha, 'Os campos da Senha e Confirma Senha devem ser iguais.');
}


function validaEmail() {
    /** Valida email
     * Variavel:
     * email -> Valor do email.
     * emailRegex -> Regex do padrão do email.
     * 
     * Alguns padrãos do regex:
     * - usuario@email.com
     * - nome123@email.com
     * - nome123@dominio.academy
     * - nome.sobrenome@mail.sub.net
     * - nome-sobrenome@dominio.info
     * 
     * Verifica se o email corresponde ao padrão do regex.
     */
    const email = campos[5].value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return validaCampo(5, emailRegex.test(email), 'O Email fornecido é invalido!');
}


async function validaCEP() {
    /** Valida CEP de acordo com a API de viaCep.
     * Função:
     * async -> Transforma a função em assincrona.(Função leva tempo para ser concluída, pois faz ligação com uma validação externa (API viaCep))
     * 
     * Variavel:
     * cep -> Valor do cep.
     * 
     * Retorno:
     * Função preencherEndereco() responsavel por realizar a validação do "cep" de acordo com a API viaCep.
     * await -> Pausa função até ser concluída a busca pelo CEP na API.
     */
    const cep = campos[6].value;
    if (cep.length == 8 || cep.length == 9)
        return await preencherEndereco(cep);

    return validaCampo(6, false, 'CEP invalido!')
}


function validaIdade() {
    const idade = campos[7].value
    return validaCampo(7, verificaIdade(idade), 'Informe uma idade valida!')
}
 











