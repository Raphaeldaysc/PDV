document.addEventListener('DOMContentLoaded', function() {
    const productSearch = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const stockTable = document.getElementById('stockTable').getElementsByTagName('tbody')[0];
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    const totalProductsSpan = document.getElementById('totalProducts');
    const totalStockValueSpan = document.getElementById('totalStockValue');
    const lowStockProductsSpan = document.getElementById('lowStockProducts');

    let products = JSON.parse(localStorage.getItem('products')) || [];
    let currentPage = 1;
    const itemsPerPage = 10;

    // Carregar produtos e atualizar sumário
    loadProducts();
    updateSummary();
    populateCategoryFilter();

    // Event listeners
    productSearch.addEventListener('input', handleSearch);
    categoryFilter.addEventListener('change', handleFilter);
    prevPageBtn.addEventListener('click', () => changePage(-1));
    nextPageBtn.addEventListener('click', () => changePage(1));

    function loadProducts() {
        const filteredProducts = filterProducts();
        const paginatedProducts = paginateProducts(filteredProducts);

        stockTable.innerHTML = '';
        paginatedProducts.forEach(product => addProductToTable(product));

        updatePagination(filteredProducts.length);
    }

    function filterProducts() {
        const searchTerm = productSearch.value.toLowerCase();
        const filterCategory = categoryFilter.value;

        return products.filter(product => {
            const matchesSearch = Object.values(product).some(value => 
                value.toString().toLowerCase().includes(searchTerm)
            );
            const matchesCategory = !filterCategory || product['product-category'] === filterCategory;
            return matchesSearch && matchesCategory;
        });
    }

    function paginateProducts(filteredProducts) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    }

    function addProductToTable(product) {
        const row = stockTable.insertRow();
        row.innerHTML = `
            <td>${product['product-code']}</td>
            <td>${product['product-name']}</td>
            <td>${getCategoryName(product['product-category'])}</td>
            <td>${product['product-quantity']}</td>
            <td>${product['product-unit']}</td>
            <td>R$ ${parseFloat(product['product-price']).toFixed(2)}</td>
            <td>R$ ${(product['product-quantity'] * product['product-price']).toFixed(2)}</td>
            <td>
                <button class="btn-edit" data-code="${product['product-code']}"><i class="fas fa-edit"></i></button>
                <button class="btn-delete" data-code="${product['product-code']}"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;

        row.querySelector('.btn-edit').addEventListener('click', () => editProduct(product['product-code']));
        row.querySelector('.btn-delete').addEventListener('click', () => deleteProduct(product['product-code']));
    }

    function updatePagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
        currentPageSpan.textContent = `${currentPage} / ${totalPages}`;
    }

    function changePage(direction) {
        currentPage += direction;
        loadProducts();
    }

    function handleSearch() {
        currentPage = 1;
        loadProducts();
    }

    function handleFilter() {
        currentPage = 1;
        loadProducts();
    }

    function editProduct(productCode) {
        // Implementar lógica de edição
        console.log('Editar produto:', productCode);
    }

    function deleteProduct(productCode) {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            products = products.filter(p => p['product-code'] !== productCode);
            saveProducts();
            loadProducts();
            updateSummary();
            showMessage('Produto excluído com sucesso!', 'success');
        }
    }

    function updateSummary() {
        const totalProducts = products.length;
        const totalStockValue = products.reduce((total, product) => 
            total + (product['product-quantity'] * product['product-price']), 0);
        const lowStockProducts = products.filter(product => 
            product['product-quantity'] < product['product-min-stock']).length;

        totalProductsSpan.textContent = totalProducts;
        totalStockValueSpan.textContent = `R$ ${totalStockValue.toFixed(2)}`;
        lowStockProductsSpan.textContent = lowStockProducts;
    }

    function saveProducts() {
        localStorage.setItem('products', JSON.stringify(products));
    }

    function getCategoryName(categoryCode) {
        const categories = {
            'FER': 'Ferramentas',
            'ELE': 'Elétrica',
            'HID': 'Hidráulica',
            'PIN': 'Pintura',
            'MAD': 'Madeira',
            'CIM': 'Cimento e Argamassa',
            'PIS': 'Pisos e Revestimentos',
            'ILU': 'Iluminação',
            'JAR': 'Jardinagem',
            'EPI': 'Equipamentos de Proteção'
        };
        return categories[categoryCode] || categoryCode;
    }

    function populateCategoryFilter() {
        const categories = [...new Set(products.map(p => p['product-category']))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = getCategoryName(category);
            categoryFilter.appendChild(option);
        });
    }

    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        document.body.appendChild(messageDiv);
        setTimeout(() => messageDiv.remove(), 3000);
    }
});