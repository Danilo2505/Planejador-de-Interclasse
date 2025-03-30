// Incluir a top bar em cada página
fetch("../components/topbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header").innerHTML = data;
  });

function incluirComponente(elemento, caminhoComponente) {
  fetch(caminhoComponente)
    .then((response) => response.text())
    .then((data) => {
      elemento.innerHTML = data;
    });
}
