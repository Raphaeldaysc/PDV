from django.http import HttpResponse


def middleware_forbidden(get_response):
    """Middleware to check if the user is forbidden to access the page

    Args:
        get_response (): The response of the request
    """
    def middleware(request):
        """Tudo que for feito aqui vai ser executado antes de a view ser chamada,
        ou seja, se eu quiser mexer na request da view, eu faço aqui"""
        if request.META['REMOTE_ADDR'] == '127.1.0.1':
            return HttpResponse('Você esta Bloqueado', status=403)
        response = get_response(request)
        html = b"<h1> Voce Foi Hackeado </h1>"
        response.content = html
        # Tudo que for feito aqui vai ser executado depois de a view ser chamada,
        # ou seja, se eu quiser mexer na resposta da view, eu faço aqui
        return response
    return middleware
