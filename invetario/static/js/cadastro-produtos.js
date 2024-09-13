import DataManager from './dataManager.js';

document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');
    const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    const productSearch = document.getElementById('productSearch');
    const productFilter = document.getElementById('productFilter');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    
    let products = DataManager.getProducts();
    let currentPage = 1;
    const itemsPerPage = 10;

    function init() {
        loadProducts();
        populateCategoryFilter();
        setupEventListeners();
    }

    function setupEventListeners() {
        productForm.addEventListener('submit', handleFormSubmit);
        productSearch.addEventListener('input', handleSearch);
        productFilter.addEventListener('change', handleFilter);
        prevPageBtn.addEventListener('click', () => changePage(-1));
        nextPageBtn.addEventListener('click', () => changePage(1));
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        if (validateForm()) {
            const formData = new FormData(productForm);
            const product = Object.fromEntries(formData.entries());
            productForm.dataset.editing === 'true' ? updateProduct(product) : addNewProduct(product);
            resetForm();
            loadProducts();
            showMessage('Produto salvo com sucesso!', 'success');
        }
    }

    function addNewProduct(product) {
        products.push(product);
        DataManager.setProducts(products);
    }

    function updateProduct(product) {
        const index = products.findIndex(p => p['product-code'] === product['product-code']);
        if (index !== -1) {
            products[index] = product;
            DataManager.setProducts(products);
        }
    }

    // ... (outras funções como validateForm, etc.)

    init();
});