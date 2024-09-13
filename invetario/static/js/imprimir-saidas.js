document.addEventListener('DOMContentLoaded', function() {
    const dataImpressao = new Date().toLocaleDateString('pt-BR');
    document.getElementById('dataImpressao').textContent = dataImpressao;

    // Simular dados de saída (substitua isso por dados reais do seu backend)
    const saidas = [
        { data: '2023-05-01', valor: 150.00, motivo: 'Compra de material de escritório', responsavel: 'João' },
        { data: '2023-05-03', valor: 500.00, motivo: 'Pagamento de fornecedor', responsavel: 'Maria' },
        { data: '2023-05-05', valor: 200.00, motivo: 'Manutenção de equipamentos', responsavel: 'João' },
        // Adicione mais saídas aqui...
    ];

    preencherTabelaSaidas(saidas);
    calcularResumo(saidas);
});

function preencherTabelaSaidas(saidas) {
    const tbody = document.querySelector('#tabelaSaidas tbody');
    saidas.forEach(saida => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${new Date(saida.data).toLocaleDateString('pt-BR')}</td>
            <td>R$ ${saida.valor.toFixed(2)}</td>
            <td>${saida.motivo}</td>
            <td>${saida.responsavel}</td>
        `;
        tbody.appendChild(tr);
    });
}

function calcularResumo(saidas) {
    const totalSaidas = saidas.reduce((total, saida) => total + saida.valor, 0);
    document.getElementById('totalSaidas').textContent = totalSaidas.toFixed(2);

    const responsaveis = {};
    saidas.forEach(saida => {
        responsaveis[saida.responsavel] = (responsaveis[saida.responsavel] || 0) + 1;
    });

    const responsavelMaisSaidas = Object.keys(responsaveis).reduce((a, b) => responsaveis[a] > responsaveis[b] ? a : b);
    document.getElementById('responsavelMaisSaidas').textContent = responsavelMaisSaidas;
}