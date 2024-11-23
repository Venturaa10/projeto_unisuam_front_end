// Arquivo responsavel por exibir / chamar o arquivo navbar
// Codigo responsavel pela herança da barra de navegação 
async function loadNavbar() { // Função para lidar com o carregamento de arquivos
    try {
        const response = await fetch('sections/sections_titulos.html'); // Busca o caminho do arquivo e armazena na const 
        const navbar = await response.text(); // Carrega o arquivo e converte para texto, para que seja manipulado
        document.getElementById('secao_titulos').innerHTML = navbar; // Inserindo o conteudo armazenado na const "navbar" e o substituindo no id="navbar"
    } catch (error) { // Caso ocorra algum erro no carregamento, exibe uma mensagem no console
        console.error('Erro ao carregar a barra de navegação:', error);
    }
}

loadNavbar(); // Chama a função para carregar o arquivo