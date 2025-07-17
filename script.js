document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-livro");
  const listaLivros = document.getElementById("lista-livros");

  // Carregar livros existentes do banco de dados
  fetch('http://localhost:3000/livros')
    .then(response => response.json())
    .then(data => {
      data.forEach(livro => exibirLivroNaTela(livro));
    });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const status = document.getElementById("status").value;

    const novoLivro = { titulo, autor, status };

    // Enviar para o backend
    fetch('http://localhost:3000/livros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoLivro)
    })
      .then(response => response.json())
      .then(livroCriado => {
        exibirLivroNaTela(livroCriado);
        form.reset();
      });
  });

  function exibirLivroNaTela(livro) {
  const div = document.createElement("div");
  div.classList.add("livro");

  div.innerHTML = `
    <h3>${livro.titulo}</h3>
    <p><strong>Autor:</strong> ${livro.autor}</p>
    <p><strong>Status:</strong> ${livro.status}</p>
    <button class="btn-excluir">Excluir</button>
  `;

  // Adiciona evento ao botão de excluir
  const btnExcluir = div.querySelector(".btn-excluir");
  btnExcluir.addEventListener("click", () => {
    div.remove(); // Remove da tela
    // (depois podemos fazer DELETE no banco)
  });

  listaLivros.appendChild(div);
}

});

