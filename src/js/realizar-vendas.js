document.addEventListener('DOMContentLoaded', function() {
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

    calculateTotalPrice();
});