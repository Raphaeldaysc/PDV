from django.db import models
from datetime import timezone


class Produto(models.Model):
    nome = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    qtd_estoque = models.IntegerField(default=0)

    def __str__(self) -> str:
        return f'{self.nome}'

    def diminuir_estoque(self, quantidade):
        if self.quantidade_estoque >= quantidade:
            self.quantidade_estoque -= quantidade
            self.save()
        else:
            raise ValueError("Estoque insuficiente")


class Venda(models.Model):
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    quantidade = models.IntegerField()
    valor_total = models.DecimalField(max_digits=10, decimal_places=2)
    data_venda = models.DateTimeField()  # type: ignore

    def __str__(self):
        return f"Venda de {self.produto.nome} - {self.quantidade} unidades"
