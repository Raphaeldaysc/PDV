from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('vendas/', views.vendas, name='vendas'),
    path('logout/', views.logout, name='logout'),
    path('realizarVendas/', views.realizar_venda, name='realizar_venda'),
    path('entrada-saida/', views.entrada_saida, name='entrada_saida'),
    path('cadastro-produto/', views.cadastro_produto, name='cadastro-produto'),
    path('controle-estoque', views.controle_estoque, name='controle-estoque'),
    path('estoque', views.estoque, name='estoque')

]
