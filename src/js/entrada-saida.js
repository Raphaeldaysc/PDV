import DataManager from './dataManager.js';

document.addEventListener('DOMContentLoaded', function() {
    const movementForm = document.getElementById('movementForm');
    const movementTable = document.getElementById('movementTable').getElementsByTagName('tbody')[0];
    const currentBalanceSpan = document.getElementById('currentBalance');
    const totalOutflowSpan = document.getElementById('totalOutflow');
    const totalInflowSpan = document.getElementById('totalInflow');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    const searchMovements = document.getElementById('searchMovements');
    
    let currentPage = 1;
    const itemsPerPage = 10;

    init();

    function init() {
        loadMovements();
        updateSummary();
        setupEventListeners();
    }

    function setupEventListeners() {
        movementForm.addEventListener('submit', handleFormSubmit);
        prevPageBtn.addEventListener('click', () => changePage(-1));
        nextPageBtn.addEventListener('click', () => changePage(1));
        searchMovements.addEventListener('input', handleSearch);
        document.getElementById('imprimir-saidas').addEventListener('click', gerarRelatorioSaidas);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        if (validateForm()) {
            const formData = new FormData(movementForm);
            const movement = Object.fromEntries(formData.entries());
            movement.date = new Date().toISOString();
            movement.amount = parseFloat(movement['movement-amount']);

            DataManager.addMovement(movement);
            loadMovements();
            updateSummary();
            movementForm.reset();
            showMessage('Movimentação registrada com sucesso!', 'success');
        }
    }

    function validateForm() {
        // Implementar validação de formulário
        return true;
    }

    function loadMovements() {
        const movements = DataManager.getMovements();
        const filteredMovements = filterMovements(movements);
        const paginatedMovements = paginateMovements(filteredMovements);

        renderMovements(paginatedMovements);
        updatePagination(filteredMovements.length);
    }

    function filterMovements(movements) {
        const searchTerm = searchMovements.value.toLowerCase();
        return movements.filter(movement => 
            movement['movement-reason'].toLowerCase().includes(searchTerm) ||
            movement['movement-person'].toLowerCase().includes(searchTerm)
        );
    }

    function paginateMovements(movements) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return movements.slice(startIndex, startIndex + itemsPerPage);
    }

    function renderMovements(movements) {
        movementTable.innerHTML = '';
        movements.forEach(movement => {
            const row = movementTable.insertRow();
            row.innerHTML = `
                <td>${new Date(movement.date).toLocaleString()}</td>
                <td>${movement['movement-type'] === 'entrada' ? 'Entrada' : 'Saída'}</td>
                <td>R$ ${movement.amount.toFixed(2)}</td>
                <td>${movement['movement-reason']}</td>
                <td>${movement['movement-person']}</td>
            `;
        });
    }

    function updatePagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
        currentPageSpan.textContent = `${currentPage} / ${totalPages}`;
    }

    function changePage(direction) {
        currentPage += direction;
        loadMovements();
    }

    function handleSearch() {
        currentPage = 1;
        loadMovements();
    }

    function updateSummary() {
        const movements = DataManager.getMovements();
        let balance = 0;
        let totalOutflow = 0;
        let totalInflow = 0;

        movements.forEach(movement => {
            if (movement['movement-type'] === 'entrada') {
                balance += movement.amount;
                totalInflow += movement.amount;
            } else {
                balance -= movement.amount;
                totalOutflow += movement.amount;
            }
        });

        currentBalanceSpan.textContent = `R$ ${balance.toFixed(2)}`;
        totalOutflowSpan.textContent = `R$ ${totalOutflow.toFixed(2)}`;
        totalInflowSpan.textContent = `R$ ${totalInflow.toFixed(2)}`;
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
        
        document.getElementById('dataImpressao').textContent = new Date().toLocaleDateString('pt-BR');

        const totalSaidas = calcularTotalSaidas();
        document.getElementById('totalSaidas').textContent = totalSaidas.toFixed(2);

        const responsavelMaisSaidas = calcularResponsavelMaisSaidas();
        document.getElementById('responsavelMaisSaidas').textContent = responsavelMaisSaidas;

        preencherTabelaSaidas();

        relatorioSaidas.style.display = 'block';
        window.print();
        setTimeout(() => {
            relatorioSaidas.style.display = 'none';
        }, 100);
    }

    function calcularTotalSaidas() {
        const movements = DataManager.getMovements();
        return movements
            .filter(m => m['movement-type'] === 'saida')
            .reduce((total, m) => total + m.amount, 0);
    }

    function calcularResponsavelMaisSaidas() {
        const movements = DataManager.getMovements();
        const responsaveis = {};
        movements
            .filter(m => m['movement-type'] === 'saida')
            .forEach(m => {
                responsaveis[m['movement-person']] = (responsaveis[m['movement-person']] || 0) + 1;
            });
        return Object.entries(responsaveis).sort((a, b) => b[1] - a[1])[0][0];
    }

    function preencherTabelaSaidas() {
        const tbody = document.querySelector('#tabelaSaidas tbody');
        tbody.innerHTML = '';

        const movements = DataManager.getMovements();
        const saidas = movements.filter(m => m['movement-type'] === 'saida');

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