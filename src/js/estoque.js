document.addEventListener('DOMContentLoaded', function() {
    inicializarPagina();
});

function inicializarPagina() {
    carregarProdutos();
    configurarEventos();
    atualizarDataContagem();
    atualizarResumo();
}

function configurarEventos() {
    document.getElementById('imprimir-contagem').addEventListener('click', imprimirContagem);
    document.getElementById('lancar-contagem').addEventListener('click', lancarContagem);
    document.getElementById('busca-produto').addEventListener('input', filtrarProdutos);
    document.getElementById('filtro-categoria').addEventListener('change', filtrarProdutos);
}

function carregarProdutos() {
    // Simular carregamento de produtos do backend
    const produtos = [
        { codigo: '001', nome: 'Martelo', categoria: 'Ferramentas', quantidade: 50, preco: 29.90 },
        { codigo: '002', nome: 'Chave de Fenda', categoria: 'Ferramentas', quantidade: 100, preco: 15.50 },
        { codigo: '003', nome: 'Fio 2.5mm', categoria: 'Elétrica', quantidade: 200, preco: 2.75 },
        // Adicione mais produtos conforme necessário
    ];
    preencherTabelaProdutos(produtos);
}

function preencherTabelaProdutos(produtos) {
    const tbody = document.querySelector('#tabela-estoque tbody');
    tbody.innerHTML = '';
    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.nome}</td>
            <td>${produto.categoria}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>R$ ${(produto.quantidade * produto.preco).toFixed(2)}</td>
            <td><input type="number" class="contagem-manual" data-codigo="${produto.codigo}"></td>
            <td class="diferenca"></td>
        `;
        tbody.appendChild(tr);
    });
}

function imprimirContagem() {
    window.print();
}

function lancarContagem() {
    const contagemManual = obterContagemManual();
    // Implementar lógica para lançar contagem no sistema
    alert('Contagem lançada no sistema');
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
}

function obterContagemManual() {
    const inputs = document.querySelectorAll('.contagem-manual');
    const contagem = {};
    inputs.forEach(input => {
        if (input.value) {
            contagem[input.dataset.codigo] = parseInt(input.value);
        }
    });
    return contagem;
}

function atualizarDataContagem() {
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    document.getElementById('dataContagem').textContent = dataAtual;
}

function filtrarProdutos() {
    const busca = document.getElementById('busca-produto').value.toLowerCase();
    const categoria = document.getElementById('filtro-categoria').value;
    const linhas = document.querySelectorAll('#tabela-estoque tbody tr');

    linhas.forEach(linha => {
        const nomeProduto = linha.children[1].textContent.toLowerCase();
        const categoriaProduto = linha.children[2].textContent;
        const mostrar = nomeProduto.includes(busca) && (categoria === '' || categoriaProduto === categoria);
        linha.style.display = mostrar ? '' : 'none';
    });
}

function atualizarResumo() {
    // Implementar lógica para atualizar os valores do resumo
    document.getElementById('totalProdutos').textContent = '350';
    document.getElementById('valorTotalEstoque').textContent = 'R$ 12.345,67';
    document.getElementById('produtosEstoqueBaixo').textContent = '5';
}