export function preencherEndereco(cep) {
    const cepFormatado = cep.replace(/\D/g, '');

    if (cepFormatado.length === 8) {
        const apiUrl = `https://viacep.com.br/ws/${cepFormatado}/json/`;

        return fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('endereco').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;

                    return true; // CEP válido
                } else {
                    return false; // CEP inválido
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o CEP:', error);
                return false; 
            });
    } else {
        return Promise.resolve(false);
    }
}
