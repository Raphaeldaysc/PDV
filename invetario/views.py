from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import auth


@login_required(login_url='http://127.0.0.1:8000/auth/login/')
def index(request):
    return render(request, "invetario/pages/index.html")


@login_required(login_url='http://127.0.0.1:8000/auth/login/')
def vendas(request):
    return render(request, "invetario/pages/vendas.html")


@login_required(login_url='http://127.0.0.1:8000/auth/login/')
def realizar_venda(request):
    return render(request, 'invetario/pages/realizar-vendas.html')


@login_required(login_url='http://127.0.0.1:8000/auth/login/')
def logout(request):
    auth.logout(request)
    return redirect('/auth/login')


@login_required(login_url='http://127.0.0.1:8000/auth/login/')
def entrada_saida(request):
    return render(request, 'invetario/pages/entrada-saida.html')


@login_required(login_url='http://127.0.0.1:8000/auth/login/')
def cadastro_produto(request):
    return render(request, 'invetario/pages/cadastro-produtos.html')


@login_required(login_url='http://127.0.0.1:8000/auth/login/')
def controle_estoque(request):
    return render(request, 'invetario/pages/controle-estoque.html')


@login_required(login_url='http://127.0.0.1:8000/auth/login/')
def estoque(request):
    return render(request, 'invetario/pages/estoque.html')
