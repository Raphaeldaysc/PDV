document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const nomeUsuarioLogado = document.getElementById('nomeUsuarioLogado');
    const filtroCategoria = document.getElementById('filtro-categoria');
    const ordenarPor = document.getElementById('ordenar-por');
    const btnAtualizarLista = document.getElementById('atualizar-lista');
    const dataImpressao = document.getElementById('dataImpressao');
    const tabelaEstoque = document.getElementById('tabela-estoque').getElementsByTagName('tbody')[0];

    // Simulação de dados do usuário logado
    const usuarioLogado = 'João Silva';
    nomeUsuarioLogado.textContent = usuarioLogado;

    // Atualizar a data de impressão
    function atualizarDataImpressao() {
        const agora = new Date();
        dataImpressao.textContent = agora.toLocaleString();
    }

    // Simular carregamento de categorias
    function carregarCategorias() {
        const categorias = ['Eletrônicos', 'Alimentos', 'Vestuário', 'Livros'];
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.toLowerCase();
            option.textContent = categoria;
            filtroCategoria.appendChild(option);
        });
    }

    // Simular carregamento de produtos
    function carregarProdutos() {
        const produtos = [
            { codigo: '001', nome: 'Smartphone', quantidade: 50, categoria: 'eletrônicos' },
            { codigo: '002', nome: 'Arroz 5kg', quantidade: 100, categoria: 'alimentos' },
            { codigo: '003', nome: 'Camiseta', quantidade: 200, categoria: 'vestuário' },
            { codigo: '004', nome: 'Livro de JavaScript', quantidade: 30, categoria: 'livros' }
        ];
        return produtos;
    }

    // Renderizar tabela de produtos
    function renderizarTabelaProdutos(produtos) {
        tabelaEstoque.innerHTML = '';
        produtos.forEach(produto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto.codigo}</td>
                <td>${produto.nome}</td>
                <td>${produto.quantidade}</td>
                <td><input type="number" class="contagem-manual" min="0"></td>
                <td class="diferenca"></td>
            `;
            tabelaEstoque.appendChild(tr);
        });

        // Adicionar evento para calcular a diferença
        const inputsContagem = document.querySelectorAll('.contagem-manual');
        inputsContagem.forEach((input, index) => {
            input.addEventListener('input', () => {
                const quantidadeSistema = produtos[index].quantidade;
                const quantidadeContada = parseInt(input.value) || 0;
                const diferenca = quantidadeContada - quantidadeSistema;
                const diferencaCell = input.closest('tr').querySelector('.diferenca');
                diferencaCell.textContent = diferenca;
                diferencaCell.style.color = diferenca < 0 ? 'red' : diferenca > 0 ? 'green' : 'black';
            });
        });
    }

    // Filtrar e ordenar produtos
    function filtrarEOrdenarProdutos() {
        let produtos = carregarProdutos();
        const categoriaFiltro = filtroCategoria.value;
        const ordenacao = ordenarPor.value;

        if (categoriaFiltro) {
            produtos = produtos.filter(p => p.categoria === categoriaFiltro);
        }

        produtos.sort((a, b) => {
            if (ordenacao === 'codigo') return a.codigo.localeCompare(b.codigo);
            if (ordenacao === 'quantidade') return b.quantidade - a.quantidade;
            return a.nome.localeCompare(b.nome); // padrão: ordenar por nome
        });

        renderizarTabelaProdutos(produtos);
    }

    // Event listeners
    btnAtualizarLista.addEventListener('click', filtrarEOrdenarProdutos);

    // Inicialização
    atualizarDataImpressao();
    carregarCategorias();
    filtrarEOrdenarProdutos();
});