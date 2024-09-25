from django.db import models
from datetime import timezone


class Produto(models.Model):
    nome_produto = models.CharField(max_length=100)
    valor_venda = models.DecimalField(max_digits=10, decimal_places=2)
    qtd_estoque = models.IntegerField(default=0)
    categoria = models.ForeignKey('Categoria', on_delete=models.CASCADE)
    valor_compra = models.DecimalField(max_digits=10, decimal_places=2)
    qtd_minimum = models.IntegerField(default=0)
    foto_produto = models.ImageField(
        upload_to='fotos_produtos', null=True, blank=True)
    descricao = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.nome_produto}'

    def diminuir_estoque(self, quantidade):
        if self.qtd_estoque >= quantidade:
            self.qtd_estoque -= quantidade
            self.save()
        else:
            raise ValueError("Estoque insuficiente")

    def adicionar_estoque(self, quantidade):
        if quantidade < 0:
            raise ValueError("Quantidade a adicionar não pode ser negativa.")
        self.qtd_estoque += quantidade
        self.save()

    def ajustar_estoque(self, nova_quantidade):
        if nova_quantidade < 0:
            raise ValueError("A quantidade ajustada não pode ser negativa.")
        self.qtd_estoque = nova_quantidade
        self.save()


class Unidade(models.Model):
    nome_unidade = models.CharField(max_length=100)
    produtos_unidade = models.ManyToManyField(Produto, blank=True)

    def __str__(self):
        return str(self.nome_unidade)


class Venda(models.Model):
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    quantidade = models.IntegerField()
    unidade_venda = models.ForeignKey(Unidade, on_delete=models.CASCADE)
    valor_total = models.DecimalField(max_digits=10, decimal_places=2)
    data_venda = models.DateTimeField(auto_now_add=True)  # type: ignore

    def __str__(self):
        return f"Venda de {self.produto.nome_produto} - {self.quantidade} {self.unidade_venda.nome_unidade}"


class Categoria(models.Model):
    nome_categoria = models.CharField(max_length=100)
    produtos_categoria = models.ManyToManyField(
        Produto, related_name='produtos', blank=True)

    def __str__(self):
        return str(self.nome_categoria)


class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(null=True, blank=True)
    telefone = models.CharField(max_length=15, null=True, blank=True)
    endereco = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.nome


class Pagamento(models.Model):
    venda = models.OneToOneField(Venda, on_delete=models.CASCADE)
    # e.g., "Cartão", "Dinheiro", "PIX"
    forma_pagamento = models.CharField(max_length=50)
    valor_pago = models.DecimalField(max_digits=10, decimal_places=2)
    data_pagamento = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Pagamento de {self.valor_pago} para a venda {self.venda.id}'


class Fornecedor(models.Model):
    nome = models.CharField(max_length=100)
    contato = models.CharField(max_length=100, null=True, blank=True)
    telefone = models.CharField(max_length=15, null=True, blank=True)
    endereco = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.nome


class Relatorio(models.Model):
    data_inicio = models.DateTimeField()
    data_fim = models.DateTimeField()
    total_vendas = models.DecimalField(max_digits=10, decimal_places=2)
    total_produtos_vendidos = models.IntegerField()

    def __str__(self):
        return f'Relatório de Vendas de {self.data_inicio} até {self.data_fim}'


class Inventario(models.Model):
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    quantidade = models.IntegerField()
    data_atualizacao = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Inventário de {self.produto.nome_produto} - {self.quantidade}'
