import DataManager from './dataManager.js';

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
    const produtos = DataManager.getProducts();
    preencherTabelaProdutos(produtos);
    preencherFiltroCategoria(produtos);
}

function preencherTabelaProdutos(produtos) {
    const tbody = document.querySelector('#tabela-estoque tbody');
    tbody.innerHTML = '';
    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto['product-code']}</td>
            <td>${produto['product-name']}</td>
            <td>${produto['product-category']}</td>
            <td>${produto['product-quantity']}</td>
            <td>R$ ${parseFloat(produto['product-price']).toFixed(2)}</td>
            <td>R$ ${(produto['product-quantity'] * produto['product-price']).toFixed(2)}</td>
            <td><input type="number" class="contagem-manual" data-codigo="${produto['product-code']}"></td>
            <td class="diferenca"></td>
        `;
        tbody.appendChild(tr);
    });
}

function preencherFiltroCategoria(produtos) {
    const categorias = [...new Set(produtos.map(p => p['product-category']))];
    const filtroCategoria = document.getElementById('filtro-categoria');
    filtroCategoria.innerHTML = '<option value="">Todas as categorias</option>';
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        filtroCategoria.appendChild(option);
    });
}

function imprimirContagem() {
    window.print();
}

function lancarContagem() {
    const contagemManual = obterContagemManual();
    const produtos = DataManager.getProducts();
    produtos.forEach(produto => {
        if (contagemManual[produto['product-code']]) {
            produto['product-quantity'] = contagemManual[produto['product-code']];
        }
    });
    DataManager.setProducts(produtos);
    alert('Contagem lançada no sistema');
    carregarProdutos();
    atualizarResumo();
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
    const produtos = DataManager.getProducts();
    const totalProdutos = produtos.length;
    const valorTotalEstoque = produtos.reduce((total, produto) => 
        total + (produto['product-quantity'] * produto['product-price']), 0);
    const produtosEstoqueBaixo = produtos.filter(produto => 
        produto['product-quantity'] < produto['product-min-stock']).length;

    document.getElementById('totalProdutos').textContent = totalProdutos;
    document.getElementById('valorTotalEstoque').textContent = `R$ ${valorTotalEstoque.toFixed(2)}`;
    document.getElementById('produtosEstoqueBaixo').textContent = produtosEstoqueBaixo;
}