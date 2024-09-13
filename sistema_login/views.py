from django.shortcuts import render, redirect
from django.contrib import messages, auth
from django.contrib.messages import constants
from .models import Usuario as User


def login(request):
    if request.user.is_authenticated:
        return redirect("http://127.0.0.1:8000/inventario/index/")
    return render(request, 'sistema_login/login.html')


def cadastro(request):
    if request.user.is_authenticated:
        return redirect("http://127.0.0.1:8000/inventario/index/")
    return render(request, 'sistema_login/cadastro.html')


def valida_cadastro(request):
    nome = request.POST.get('username')
    email = request.POST.get('email')
    senha = request.POST.get('password')
    img = request.POST.get('imgProfile')

    if len(nome.strip()) < 0 or len(email.strip()) < 0:
        messages.add_message(request, constants.WARNING,
                             'Nome e/ou Email estão Vazio.')
        return redirect('/auth/cadastro/')
    if len(senha) < 8:
        messages.add_message(request, constants.WARNING,
                             'A senha tem que ter mais que 8 Caracteres.')
        return redirect('/auth/cadastro/')
    if request.POST.get('password') != request.POST.get('confirmPassword'):
        messages.add_message(request, constants.ERROR,
                             'As Senhas não são iguais.')
        return redirect('/auth/cadastro/')
    if User.objects.filter(email=email).exists():
        messages.add_message(request, constants.WARNING,
                             'E-mail ja Cadastrado.')
        return redirect('/auth/cadastro/')
    if User.objects.filter(username=nome).exists():
        messages.add_message(request, constants.WARNING,
                             'Nome de Usuario ja existe.')
        return redirect('/auth/cadastro/')
    try:
        usuario = User.objects.create_user(
            username=nome, email=email, password=senha, img=img)
        usuario.save()
        return redirect('/auth/login')
    except:
        messages.add_message(request, constants.ERROR,
                             'Erro no Sistema.')
        return redirect('/auth/cadastro/')


def valida_login(request):
    user = request.POST.get('username')
    senha = request.POST.get('password')
    usuario = auth.authenticate(request, username=user, password=senha)
    if not usuario:
        messages.add_message(request, constants.ERROR,
                             'Usuario não encontrado.')
        return redirect('/auth/login/')
    else:
        auth.login(request, usuario)
        return redirect('inventario/index/')


def logout(request):
    auth.logout(request)
    messages.add_message(request, constants.SUCCESS,
                         'Logout realizado com sucesso.')
    return redirect('/auth/login')
