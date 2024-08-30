const DataManager = {
    setItem: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    getItem: function(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },

    removeItem: function(key) {
        localStorage.removeItem(key);
    },

    // Funções específicas para cada tipo de dado
    getProducts: function() {
        return this.getItem('products') || [];
    },

    setProducts: function(products) {
        this.setItem('products', products);
    },

    getSales: function() {
        return this.getItem('sales') || [];
    },

    setSales: function(sales) {
        this.setItem('sales', sales);
    },

    // Adicione mais funções conforme necessário para outros tipos de dados
};

// Se estiver usando módulos ES6
export default DataManager;