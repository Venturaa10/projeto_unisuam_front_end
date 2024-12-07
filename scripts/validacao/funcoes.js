export function apenasLetras(letras) {
    /** Verifica padrão de string com apenas letras.
     * Parametros:
     * letras -> String
     * 
     * Variavel:
     * regex -> String apenas com letras.
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
    * true -> Segue o padrão do regex.
    * false -> Não segue o padrão do regex.
    */
    const regex = /^[A-Z][a-zA-ZÀ-ÿ ]{9,}$/;
    return regex.test(nome);
}


export function verificaCPF(cpf) {
    /** Recebe CPF como parametro e verifica se está de acordo com o algoritmo do padrão brasileiro de documentos.
     * 
     * Retorna:
     * true -> Documento valido. 
     */
    const regexCpf = /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;

    if (!regexCpf.test(cpf)) {
        return false;
    }

    const cpfLimpo = cpf.replace(/\D/g, '');

    if (cpfLimpo.length !== 11) return false;

    if (/^(\d)\1+$/.test(cpfLimpo)) return false;

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


export function verificaIdade(inputDate) {
    // Obtém a data atual
    const dataAtual = new Date();

    // Converte o valor do input para um objeto Date
    const dataNascimento = new Date(inputDate);

    if (isNaN(dataNascimento)) {
        return false; 
    }

    // Calcula a diferença de anos entre a data atual e a data de nascimento
    const idade = dataAtual.getFullYear() - dataNascimento.getFullYear();

    // Verifica se o aniversário já ocorreu neste ano
    const mesAtual = dataAtual.getMonth();
    const diaAtual = dataAtual.getDate();
    const mesNascimento = dataNascimento.getMonth();
    const diaNascimento = dataNascimento.getDate();

    // Ajusta a idade caso o aniversário ainda não tenha ocorrido neste ano
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        idade--;
    }

    // Valida a idade
    if (idade < 0 || idade > 100) {
        return false; // Idade fora do intervalo permitido
    }

    return true; // Idade válida
}
