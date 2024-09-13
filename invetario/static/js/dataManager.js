const DataManager = {
  setItem: function (key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Erro ao salvar ${key} no localStorage:`, error);
    }
  },

  getItem: function (key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Erro ao recuperar ${key} do localStorage:`, error);
      return null; // Retorna null se houver erro ao fazer o parse
    }
  },

  removeItem: function (key) {
    localStorage.removeItem(key);
  },

  // Funções específicas para cada tipo de dado
  getProducts: function () {
    return this.getItem("products") || []; // Sempre retorna um array
  },

  setProducts: function (products) {
    this.setItem("products", products);
  },

  getSales: function () {
    return this.getItem("sales") || []; // Sempre retorna um array
  },

  setSales: function (sales) {
    this.setItem("sales", sales);
  },

  // Função para inicializar dados de vendas, caso não existam
  initializeSales: function () {
    if (!this.getSales().length) {
      // Se não houver vendas salvas
      const defaultSales = [
        {
          date: "2024-01-01",
          product: "Produto X",
          quantity: 10,
          value: 500.0,
        },
        { date: "2024-01-02", product: "Produto Y", quantity: 5, value: 300.0 },
        // Adicione mais dados padrão se necessário
      ];
      this.setSales(defaultSales);
    }
  },

  // Função para inicializar produtos, caso não existam
  initializeProducts: function () {
    if (!this.getProducts().length) {
      // Se não houver produtos salvos
      const defaultProducts = [
        { name: "Produto A", quantity: 100, total: 1000.0 },
        { name: "Produto B", quantity: 50, total: 500.0 },
        // Adicione mais dados padrão se necessário
      ];
      this.setProducts(defaultProducts);
    }
  },
};

// Se estiver usando módulos ES6
export default DataManager;
