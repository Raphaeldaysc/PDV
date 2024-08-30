document.addEventListener('DOMContentLoaded', function() {
    const salesForm = document.getElementById('salesForm');
    const productSelect = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const unitPriceInput = document.getElementById('unit-price');
    const totalPriceInput = document.getElementById('total-price');
    const cartTable = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
    const cartTotalSpan = document.getElementById('cartTotal');
    const finalizeSaleBtn = document.getElementById('finalizeSale');

    let cart = [];

    // Carregar produtos do localStorage (simulando um banco de dados)
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Preencher o select de produtos
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product['product-code'];
        option.textContent = product['product-name'];
        productSelect.appendChild(option);
    });

    // Atualizar preço unitário quando um produto é selecionado
    productSelect.addEventListener('change', updateUnitPrice);

    // Atualizar preço total quando a quantidade muda
    quantityInput.addEventListener('input', updateTotalPrice);

    // Adicionar produto ao carrinho
    salesForm.addEventListener('submit', addToCart);

    // Finalizar venda
    finalizeSaleBtn.addEventListener('click', finalizeSale);

    function updateUnitPrice() {
        const selectedProduct = products.find(p => p['product-code'] === productSelect.value);
        if (selectedProduct) {
            unitPriceInput.value = selectedProduct['product-price'];
            updateTotalPrice();
        }
    }

    function updateTotalPrice() {
        const quantity = parseFloat(quantityInput.value) || 0;
        const unitPrice = parseFloat(unitPriceInput.value) || 0;
        totalPriceInput.value = (quantity * unitPrice).toFixed(2);
    }

    function addToCart(e) {
        e.preventDefault();
        const selectedProduct = products.find(p => p['product-code'] === productSelect.value);
        if (selectedProduct) {
            const quantity = parseFloat(quantityInput.value);
            const totalPrice = parseFloat(totalPriceInput.value);

            if (quantity > selectedProduct['product-quantity']) {
                alert('Quantidade indisponível em estoque.');
                return;
            }

            cart.push({
                product: selectedProduct,
                quantity: quantity,
                totalPrice: totalPrice
            });

            updateCartTable();
            salesForm.reset();
        }
    }

    function updateCartTable() {
        cartTable.innerHTML = '';
        let cartTotal = 0;

        cart.forEach((item, index) => {
            const row = cartTable.insertRow();
            row.innerHTML = `
                <td>${item.product['product-name']}</td>
                <td>${item.quantity}</td>
                <td>R$ ${parseFloat(item.product['product-price']).toFixed(2)}</td>
                <td>R$ ${item.totalPrice.toFixed(2)}</td>
                <td><button class="btn-remove" data-index="${index}">Remover</button></td>
            `;
            cartTotal += item.totalPrice;
        });

        // Adicionar evento de remoção para os novos botões
        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', removeFromCart);
        });

        updateCartTotal();
    }

    function removeFromCart(e) {
        const index = parseInt(e.target.dataset.index);
        cart.splice(index, 1);
        updateCartTable();
    }

    function finalizeSale() {
        if (cart.length === 0) {
            alert('O carrinho está vazio. Adicione itens antes de finalizar a venda.');
            return;
        }

        const total = parseFloat(cartTotalSpan.textContent);
        const discount = parseFloat(discountAmountSpan.textContent);
        const confirmMessage = `
            Subtotal: R$ ${cartSubtotalSpan.textContent}
            Desconto: R$ ${discount.toFixed(2)}
            Total da venda: R$ ${total.toFixed(2)}

            Deseja finalizar a venda?
        `;

        if (confirm(confirmMessage)) {
            // Aqui você implementaria a lógica para salvar a venda no backend
            alert('Venda finalizada com sucesso!');
            cart = [];
            updateCartTable();
            discountInput.value = 0;
        }
    }

    // Adicione esta função
    function setupProductSearch() {
        const productSearch = document.getElementById('product-search');
        productSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredProducts = products.filter(p => 
                p['product-name'].toLowerCase().includes(searchTerm) || 
                p['product-code'].toLowerCase().includes(searchTerm)
            );
            updateProductOptions(filteredProducts);
        });
    }

    function updateProductOptions(filteredProducts) {
        productSelect.innerHTML = '<option value="">Selecione um produto</option>';
        filteredProducts.forEach(product => {
            const option = document.createElement('option');
            option.value = product['product-code'];
            option.textContent = `${product['product-name']} (${product['product-code']})`;
            productSelect.appendChild(option);
        });
    }

    // Chame esta função no carregamento da página
    setupProductSearch();

    const discountInput = document.getElementById('discount');
    const cartSubtotalSpan = document.getElementById('cartSubtotal');
    const discountAmountSpan = document.getElementById('discountAmount');

    discountInput.addEventListener('input', updateCartTotal);

    function updateCartTotal() {
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.totalPrice;
        });

        const discountPercentage = parseFloat(discountInput.value) || 0;
        const discountAmount = subtotal * (discountPercentage / 100);
        const total = subtotal - discountAmount;

        cartSubtotalSpan.textContent = subtotal.toFixed(2);
        discountAmountSpan.textContent = discountAmount.toFixed(2);
        cartTotalSpan.textContent = total.toFixed(2);
    }
});