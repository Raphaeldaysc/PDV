from django.contrib import admin
from .models import Produto, Categoria, Unidade, Venda, Inventario, Relatorio, Fornecedor, Pagamento, Cliente


@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
    list_display = ['nome_produto', 'valor_venda', 'qtd_estoque', 'categoria',
                    'valor_compra', 'qtd_minimum', 'foto_produto', 'descricao']


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ['nome_categoria']


@admin.register(Unidade)
class UnidadeAdmin(admin.ModelAdmin):
    list_display = ['nome_unidade']


@admin.register(Venda)
class VendaAdmin(admin.ModelAdmin):
    list_display = ['produto', 'quantidade', 'valor_total', 'data_venda']


@admin.register(Inventario)
class InventarioAdmin(admin.ModelAdmin):
    list_display = ['produto', 'quantidade']


@admin.register(Relatorio)
class RelatorioAdmin(admin.ModelAdmin):
    ...


@admin.register(Fornecedor)
class FornecedorAdmin(admin.ModelAdmin):
    ...


@admin.register(Pagamento)
class PagamentoAdmin(admin.ModelAdmin):
    list_display = ['venda', 'forma_pagamento', 'valor_pago', 'data_pagamento']


@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ['nome', 'email', 'telefone', 'endereco']