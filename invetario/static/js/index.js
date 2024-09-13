import DataManager from './dataManager.js';

document.addEventListener('DOMContentLoaded', function() {
    updateDashboardSummary();
    loadRecentActivities();

    // Atualizar o dashboard a cada 5 minutos
    setInterval(updateDashboardSummary, 300000);
});

function updateDashboardSummary() {
    const totalSales = calculateTotalSales();
    const totalProducts = DataManager.getProducts().length;
    const pendingOrders = calculatePendingOrders();

    document.getElementById('totalSales').textContent = `R$ ${totalSales.toFixed(2)}`;
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('pendingOrders').textContent = pendingOrders;
}

function calculateTotalSales() {
    const sales = DataManager.getSales();
    return sales.reduce((total, sale) => total + sale.total, 0);
}

function calculatePendingOrders() {
    const sales = DataManager.getSales();
    return sales.filter(sale => sale.status === 'pending').length;
}

function loadRecentActivities() {
    const recentActivities = getRecentActivities();
    const activitiesList = document.getElementById('recentActivitiesList');
    
    activitiesList.innerHTML = '';
    recentActivities.forEach(activity => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="activity-icon"><i class="${activity.icon}"></i></span>
            <div class="activity-details">
                <p>${activity.description}</p>
                <span class="activity-time">${formatDate(activity.timestamp)}</span>
            </div>
        `;
        activitiesList.appendChild(li);
    });
}

function getRecentActivities() {
    // Simular atividades recentes (substitua por dados reais do DataManager)
    return [
        { icon: 'fas fa-shopping-cart', description: 'Nova venda realizada', timestamp: new Date() },
        { icon: 'fas fa-box', description: 'Produto adicionado ao estoque', timestamp: new Date(Date.now() - 3600000) },
        { icon: 'fas fa-exchange-alt', description: 'Movimentação de caixa registrada', timestamp: new Date(Date.now() - 7200000) },
        { icon: 'fas fa-user', description: 'Novo usuário cadastrado', timestamp: new Date(Date.now() - 86400000) },
    ];
}

function formatDate(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
        return 'Agora mesmo';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
    } else {
        return date.toLocaleDateString('pt-BR');
    }
}