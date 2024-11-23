async function loadNavbar() {
    try {
        const response = await fetch('base/navbar.html');
        const navbar = await response.text();
        document.getElementById('navbar').innerHTML = navbar;
        
        // Agora, chama showUserName após carregar o navbar
        showUserName();
    } catch (error) {
        console.error('Erro ao carregar a barra de navegação:', error);
    }
}

loadNavbar();  // Carrega o navbar e chama showUserName
