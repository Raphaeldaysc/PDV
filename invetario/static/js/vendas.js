import DataManager from './dataManager.js';

document.addEventListener('DOMContentLoaded', function() {
    const chartPeriod = document.getElementById('chartPeriod');
    const salesChart = document.getElementById('salesChart');
    const topProductsTable = document.getElementById('topProductsTable');
    const recentSalesTable = document.getElementById('recentSalesTable');
    const totalSalesElement = document.getElementById('totalSales');
    const salesCountElement = document.getElementById('salesCount');
    const averageTicketElement = document.getElementById('averageTicket');
    const salesDifferenceElement = document.getElementById('salesDifference');
    const goalProgressElement = document.getElementById('goalProgress');

    let chart;
    let currentData;

    function createSalesChart(days) {
        currentData = generateMockData(days);
        const { labels, currentMonth, previousMonth, goal } = currentData;

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(salesChart, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Vendas Mês Atual',
                        data: currentMonth,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Vendas Mês Anterior',
                        data: previousMonth,
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Meta',
                        data: goal,
                        type: 'line',
                        fill: false,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderDash: [5, 5],
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Vendas (R$)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Dia do Mês'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            afterBody: function(context) {
                                const dataIndex = context[0].dataIndex;
                                const currentValue = currentMonth[dataIndex];
                                const previousValue = previousMonth[dataIndex];
                                const goalValue = goal[dataIndex];
                                const difference = currentValue - previousValue;
                                const toGoal = goalValue - currentValue;
                                
                                return [
                                    `Diferença do mês anterior: ${difference > 0 ? '+' : ''}${difference.toFixed(2)}`,
                                    `Falta para a meta: ${toGoal.toFixed(2)}`
                                ];
                            }
                        }
                    }
                }
            }
        });

        updateSalesSummary();
        updateTopProducts();
        updateRecentSales();
    }

    function generateMockData(days) {
        const labels = [];
        const currentMonth = [];
        const previousMonth = [];
        const goal = [];
        const baseValue = 1000;
        const variationRange = 500;

        for (let i = 1; i <= days; i++) {
            labels.push(i.toString());
            const currentDayValue = baseValue + Math.random() * variationRange;
            const previousDayValue = baseValue + Math.random() * variationRange;
            const goalValue = baseValue + variationRange;

            currentMonth.push(currentDayValue);
            previousMonth.push(previousDayValue);
            goal.push(goalValue);
        }

        return { labels, currentMonth, previousMonth, goal };
    }

    function updateSalesSummary() {
        const sales = DataManager.getSales();
        // Use os dados de vendas reais em vez de dados simulados
        // ... (resto da lógica)
    }

    function updateTopProducts() {
        const products = DataManager.getProducts();
        // Use os dados de produtos reais em vez de dados simulados
        // ... (resto da lógica)
    }

    function updateRecentSales() {
        const recentSales = generateMockRecentSales();
        recentSalesTable.innerHTML = recentSales.map(sale => `
            <tr>
                <td>${sale.date}</td>
                <td>${sale.product}</td>
                <td>${sale.quantity}</td>
                <td>R$ ${sale.value.toFixed(2)}</td>
            </tr>
        `).join('');
    }

    function generateMockTopProducts() {
        return [
            { name: 'Produto A', quantity: Math.floor(Math.random() * 100), total: Math.random() * 5000 },
            { name: 'Produto B', quantity: Math.floor(Math.random() * 100), total: Math.random() * 5000 },
            { name: 'Produto C', quantity: Math.floor(Math.random() * 100), total: Math.random() * 5000 },
        ];
    }

    function generateMockRecentSales() {
        const today = new Date();
        return [
            { date: today.toLocaleDateString(), product: 'Produto X', quantity: Math.floor(Math.random() * 10), value: Math.random() * 1000 },
            { date: new Date(today.setDate(today.getDate() - 1)).toLocaleDateString(), product: 'Produto Y', quantity: Math.floor(Math.random() * 10), value: Math.random() * 1000 },
            { date: new Date(today.setDate(today.getDate() - 1)).toLocaleDateString(), product: 'Produto Z', quantity: Math.floor(Math.random() * 10), value: Math.random() * 1000 },
        ];
    }

    // Inicializar a página
    createSalesChart(30);

    // Atualizar o gráfico quando o período for alterado
    chartPeriod.addEventListener('change', function() {
        createSalesChart(parseInt(this.value));
    });

    // Remova este trecho de código:
    // window.addEventListener('resize', function() {
    //     if (chart) {
    //         chart.resize();
    //     }
    // });
});