document.addEventListener('DOMContentLoaded', function() {
    // Função para destacar o item ativo no menu lateral
    function highlightActiveMenuItem() {
        const currentPage = window.location.pathname.split("/").pop();
        const menuItems = document.querySelectorAll('.sidebar ul li');
        menuItems.forEach(item => {
            const link = item.querySelector('a');
            if (link.getAttribute('href') === currentPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Chamar a função
    highlightActiveMenuItem();
});