export function apenasLetras(letras) {
    /** Verifica padrão de string com apenas letras.
     * Parametros:
     * letras - String
     * 
     * Variavel:
     * regex - String apenas com letras.
     * 
     * Retorno:
     * Verifica se "letras" contém apenas letras.
     */
    let regex = /^[a-zA-Z]+$/;
    return regex.test(letras);
}


export function regexNome(nome) {
    /** Verifica se parametro "nome" está de acordo com o padrão em regex.
    * 
    * Retorna:
    * true - Segue o padrão do regex.
    * false - Não segue o padrão do regex.
    */
    const regex = /^[A-Z][a-zA-ZÀ-ÿ ]{9,}$/;
    return regex.test(nome);
}


export function verificaCPF(cpf) {
    /** Recebe CPF como parametro e verifica se está de acordo com o algoritmo do padrão brasileiro de documentos.
     * 
     * Variaveis:
     * regexCpf - Aceita CPF informado com ou sem pontuações.
     * cpfLimpo - Retira pontuações e armazena somente os números. 
     * 
     * Exemplos de regex validos:  
     * 00011122233
     * 000.111.222-33
     * 
     * Condições:
     * Verifica se "cpfLimpo" não contém 11 números.
     * 
     * Retornos:
     * false - Documento invalido de acordo com o padrão brasileiro.
     * true - Documento valido. 
     */
    const regexCpf = /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;

    if (!regexCpf.test(cpf)) {
        return false;
    }

    const cpfLimpo = cpf.replace(/\D/g, '');

    if (cpfLimpo.length !== 11) return false;

    const calcularDigito = (base) => {
        let soma = 0;
        for (let i = 0; i < base.length; i++) {
            soma += parseInt(base.charAt(i)) * (base.length + 1 - i);
        }
        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    };

    const digito1 = calcularDigito(cpfLimpo.slice(0, 9));
    const digito2 = calcularDigito(cpfLimpo.slice(0, 9) + digito1);

    return cpfLimpo.endsWith(`${digito1}${digito2}`);
}


export async function preencherEndereco(cep) {

    if (!cep.length == 8 || !cep.length == 9) {
        return false; 
    }

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
                return true;  
            } else {
                return false;  
            }
        } catch (error) {
            console.log('Ocorreu um erro:', error);
            return false;  
        }
    }
    return false;  
}


export function verificaIdade(inputDate) {
    /** Verifica se idade não é maior que 100 anos e não é uma data futura.
     * 
     * Variavies:
     * dataAtual - Armazena a data atual.
     * dataNascimento - Converte o valor "dataAtual" para um objeto Date.
     * idade - Calcula a diferença de anos entre a data atual e a data de nascimento
     *
     * Condições: 
     * Verifica se o aniversario ainda não ocorreu esse ano.
     * Verifica se a idade está fora do intervalo permitido.
     * 
     * Retornos:
     * false - Idade com data futura ou maior que 100 anos de idade.
     * true - Idade sem data futura e menor que 100 anos de idade.
     * 
    */
    const dataAtual = new Date();

    const dataNascimento = new Date(inputDate);

    if (isNaN(dataNascimento)) {
        return false; 
    }

    const idade = dataAtual.getFullYear() - dataNascimento.getFullYear();

    // Pega o mes e dia atual e o mes e dia do nascimento do usuario.
    const mesAtual = dataAtual.getMonth();
    const diaAtual = dataAtual.getDate();
    const mesNascimento = dataNascimento.getMonth();
    const diaNascimento = dataNascimento.getDate();

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        idade--;
    }

    // Valida a idade
    if (idade < 0 || idade > 100) {
        return false; 
    }

    return true; 
}
