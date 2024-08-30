document.addEventListener('DOMContentLoaded', function() {
    const movementForm = document.getElementById('movementForm');
    const movementTable = document.getElementById('movementTable').getElementsByTagName('tbody')[0];
    const currentBalanceSpan = document.getElementById('currentBalance');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    
    let movements = JSON.parse(localStorage.getItem('cashMovements')) || [];
    let currentPage = 1;
    const itemsPerPage = 10;

    // Carregar movimentações existentes
    loadMovements();
    updateBalance();

    movementForm.addEventListener('submit', handleFormSubmit);
    prevPageBtn.addEventListener('click', () => changePage(-1));
    nextPageBtn.addEventListener('click', () => changePage(1));

    const imprimirSaidasBtn = document.getElementById('imprimir-saidas');
    imprimirSaidasBtn.addEventListener('click', gerarRelatorioSaidas);

    function handleFormSubmit(e) {
        e.preventDefault();
        if (validateForm()) {
            const formData = new FormData(movementForm);
            const movement = Object.fromEntries(formData.entries());
            movement.date = new Date().toISOString();
            movement.amount = parseFloat(movement['movement-amount']);
            movement.type = 'saida';

            movements.push(movement);
            saveMovements();
            loadMovements();
            updateBalance();
            movementForm.reset();
            showMessage('Saída registrada com sucesso!', 'success');
        }
    }

    function validateForm() {
        // Implementar validação de formulário
        return true;
    }

    function loadMovements() {
        movementTable.innerHTML = '';
        const paginatedMovements = paginateMovements(movements);

        paginatedMovements.forEach(movement => {
            const row = movementTable.insertRow();
            row.innerHTML = `
                <td>${new Date(movement.date).toLocaleString()}</td>
                <td>${movement.type === 'entrada' ? 'Entrada' : 'Saída'}</td>
                <td>R$ ${movement.amount.toFixed(2)}</td>
                <td>${movement['movement-reason']}</td>
                <td>${movement['movement-person']}</td>
            `;
        });

        updatePagination();
    }

    function paginateMovements(allMovements) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return allMovements.slice(startIndex, startIndex + itemsPerPage);
    }

    function updatePagination() {
        const totalPages = Math.ceil(movements.filter(m => m.type === 'saida').length / itemsPerPage);
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
        currentPageSpan.textContent = `${currentPage} / ${totalPages}`;
    }

    function changePage(direction) {
        currentPage += direction;
        loadMovements();
    }

    function updateBalance() {
        let balance = 0;
        movements.forEach(movement => {
            if (movement.type === 'entrada') {
                balance += movement.amount;
            } else {
                balance -= movement.amount;
            }
        });
        currentBalanceSpan.textContent = `R$ ${balance.toFixed(2)}`;
    }

    function saveMovements() {
        localStorage.setItem('cashMovements', JSON.stringify(movements));
    }

    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        document.body.appendChild(messageDiv);
        setTimeout(() => messageDiv.remove(), 3000);
    }

    function gerarRelatorioSaidas() {
        const relatorioSaidas = document.getElementById('relatorio-saidas');
        
        // Preencher data de impressão
        document.getElementById('dataImpressao').textContent = new Date().toLocaleDateString('pt-BR');

        // Calcular e preencher resumo
        const totalSaidas = calcularTotalSaidas();
        document.getElementById('totalSaidas').textContent = totalSaidas.toFixed(2);

        const responsavelMaisSaidas = calcularResponsavelMaisSaidas();
        document.getElementById('responsavelMaisSaidas').textContent = responsavelMaisSaidas;

        // Preencher tabela de saídas
        preencherTabelaSaidas();

        // Mostrar o relatório
        relatorioSaidas.style.display = 'block';

        // Imprimir
        window.print();

        // Ocultar o relatório após a impressão
        setTimeout(() => {
            relatorioSaidas.style.display = 'none';
        }, 100);
    }

    function calcularTotalSaidas() {
        return movements
            .filter(m => m.type === 'saida')
            .reduce((total, m) => total + m.amount, 0);
    }

    function calcularResponsavelMaisSaidas() {
        const responsaveis = {};
        movements
            .filter(m => m.type === 'saida')
            .forEach(m => {
                responsaveis[m['movement-person']] = (responsaveis[m['movement-person']] || 0) + 1;
            });
        return Object.entries(responsaveis).sort((a, b) => b[1] - a[1])[0][0];
    }

    function preencherTabelaSaidas() {
        const tbody = document.querySelector('#tabelaSaidas tbody');
        tbody.innerHTML = ''; // Limpar tabela existente

        const saidas = movements.filter(m => m.type === 'saida');

        saidas.forEach(saida => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${new Date(saida.date).toLocaleDateString('pt-BR')}</td>
                <td>R$ ${saida.amount.toFixed(2)}</td>
                <td>${saida['movement-reason']}</td>
                <td>${saida['movement-person']}</td>
            `;
            tbody.appendChild(tr);
        });
    }
});