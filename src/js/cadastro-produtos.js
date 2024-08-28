document.addEventListener('DOMContentLoaded', function() {
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

    validateProductForm();
});