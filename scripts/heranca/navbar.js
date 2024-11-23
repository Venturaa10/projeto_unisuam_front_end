async function loadNavbar() {
    /** Realizar a herança e as funções que exibem o nome de usuario e botão.
     * const:
     * response: Recebe o caminho da navbar.
     * navbar: Transforma o valor de response em texto.
     * 
     * Try:
     * Buscar o id onde o conteudo da navbar será exibido no HTML.
     * Substituir o conteúdo HTML pelo valor da variavel "navbar".
     * Executar novamente as funções showUserName() e setupLogoutButton(), garantindo que o nome de usuario e botão sejam localizados.
     * 
     * Em caso de falha, exibe mensagem de error.
     */
    try {
        const response = await fetch('base/navbar.html');
        const navbar = await response.text();
        document.getElementById('navbar').innerHTML = navbar;
        
        showUserName();  
        setupLogoutButton();  
    } catch (error) {
        console.error('Erro ao carregar a barra de navegação:', error);
    }
}

loadNavbar();
