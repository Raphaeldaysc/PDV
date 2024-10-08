from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import auth
from sistema_login.models import Usuario as User


@login_required(login_url='http://127.0.0.1:8000/auth/login/')
def index(request):
    usuario = User.objects.get(username=request.user)
    context = {
        'usuario': usuario
    }
    return render(request, "invetario/pages/index.html", context)


@login_required(login_url='http://127.0.0.1:8000/auth/login/')
def vendas(request):
    usuario = User.objects.get(username=request.user)
    context = {
        'usuario': usuario
    }
    return render(request, "invetario/pages/vendas.html", context)


@login_required(login_url='http://127.0.0.1:8000/auth/login/')
def realizar_venda(request):
    usuario = User.objects.get(username=request.user)
    context = {
        'usuario': usuario
    }
    return render(request, 'invetario/pages/realizar-vendas.html', context)


@login_required(login_url='http://127.0.0.1:8000/auth/login/')
def logout(request):
    auth.logout(request)
    return redirect('/auth/login')


@login_required(login_url='http://127.0.0.1:8000/auth/login/')
def entrada_saida(request):
    try:
        usuario = User.objects.get(username=request.user)
    except:
        usuario = None
    context = {
        'usuario': usuario
    }
    return render(request, 'invetario/pages/entrada-saida.html', context)


@login_required(login_url='http://127.0.0.1:8000/auth/login/')
def cadastro_produto(request):
    usuario = User.objects.get(username=request.user)
    context = {
        'usuario': usuario
    }
    return render(request, 'invetario/pages/cadastro-produtos.html', context)


@login_required(login_url='http://127.0.0.1:8000/auth/login/')
def controle_estoque(request):
    usuario = User.objects.get(username=request.user)
    context = {
        'usuario': usuario
    }
    return render(request, 'invetario/pages/controle-estoque.html', context)


@login_required(login_url='http://127.0.0.1:8000/auth/login/')
def estoque(request):
    usuario = User.objects.get(username=request.user)
    context = {
        'usuario': usuario
    }
    return render(request, 'invetario/pages/estoque.html', context)
