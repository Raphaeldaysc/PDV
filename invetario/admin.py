from django.contrib import admin
from .models import Produto, Categoria, Unidade, Venda


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
