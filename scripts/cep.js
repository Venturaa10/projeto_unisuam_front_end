document.getElementById('cepForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio do formulário até a validação estar completa
});

function preencherEndereco(v) {
    const cepInput = v.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cepInput.length === 8) {
        // URL da API ViaCEP
        const apiUrl = `https://viacep.com.br/ws/${cepInput}/json/`;
        
        fetch(apiUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (!data.erro) {
                    // Preenche os campos com os dados da API
                    document.getElementById('endereco').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                } else {
                    console.log('CEP não encontrado.');
                }
            })
            .catch(function(error) {
                console.log('Ocorreu um erro:', error);
            });
    }
}

// Função para prevenir o comportamento padrão de "Enter" no campo de CEP
document.getElementById('cep').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Impede o envio do formulário
        preencherEndereco(this); // Chama a função de validação e preenchimento
    }
});
