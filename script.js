document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-livro");
  const listaLivros = document.getElementById("lista-livros");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const status = document.getElementById("status").value;

    const novoLivro = document.createElement("div");
    novoLivro.classList.add("livro");

    novoLivro.innerHTML = `
      <h3>${titulo}</h3>
      <p><strong>Autor:</strong> ${autor}</p>
      <p><strong>Status:</strong> ${status}</p>
      <button class="btn-excluir">Excluir</button>
    `;

    // Adiciona evento ao botão de excluir
    novoLivro.querySelector(".btn-excluir").addEventListener("click", function () {
      listaLivros.removeChild(novoLivro);
    });

    listaLivros.appendChild(novoLivro);
    form.reset();
  });
});
