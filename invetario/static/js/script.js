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

    // Função para calcular o preço total na página de realizar vendas
    function calculateTotalPrice() {
        const quantityInput = document.getElementById('quantity');
        const unitPriceInput = document.getElementById('unit-price');
        const totalPriceInput = document.getElementById('total-price');

        if (quantityInput && unitPriceInput && totalPriceInput) {
            function updateTotal() {
                const quantity = parseFloat(quantityInput.value) || 0;
                const unitPrice = parseFloat(unitPriceInput.value) || 0;
                const total = quantity * unitPrice;
                totalPriceInput.value = total.toFixed(2);
            }

            quantityInput.addEventListener('input', updateTotal);
            unitPriceInput.addEventListener('input', updateTotal);
        }
    }

    // Função para validar o formulário de cadastro de produtos
    function validateProductForm() {
        const form = document.querySelector('.product-form');
        if (form) {
            form.addEventListener('submit', function(event) {
                const nameInput = document.getElementById('product-name');
                const priceInput = document.getElementById('product-price');
                const quantityInput = document.getElementById('product-quantity');

                if (!nameInput.value.trim()) {
                    alert('Por favor, insira o nome do produto.');
                    event.preventDefault();
                    return;
                }

                if (isNaN(parseFloat(priceInput.value)) || parseFloat(priceInput.value) <= 0) {
                    alert('Por favor, insira um preço válido.');
                    event.preventDefault();
                    return;
                }

                if (isNaN(parseFloat(quantityInput.value)) || parseFloat(quantityInput.value) < 0) {
                    alert('Por favor, insira uma quantidade válida.');
                    event.preventDefault();
                    return;
                }
            });
        }
    }

    // Chamar as funções
    highlightActiveMenuItem();
    calculateTotalPrice();
    validateProductForm();
});
