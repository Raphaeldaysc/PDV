document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('As senhas não coincidem. Tente novamente.');
  } else {
    // Aqui você pode enviar o formulário via AJAX ou outro método
    alert('Cadastro realizado com sucesso!');
    // Exemplo de envio do formulário
    // this.submit();
  }
});
