// Função que aguarda a existência de um elemento no DOM
function waitForElement(selector) {
  return new Promise((resolve) => {
    if (document.getElementById(selector)) {
      return resolve(document.getElementById(selector));
    }
    // Observa mutações no DOM para detectar quando o elemento for adicionado
    const observer = new MutationObserver(() => {
      if (document.getElementById(selector)) {
        observer.disconnect(); // Para de observar quando o elemento for encontrado
        resolve(document.getElementById(selector));
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

// Obtém o tema salvo no localStorage ou define como "light" por padrão
const themeSystem = localStorage.getItem("themeSystem") || "light";

// Função para definir o tema atual e alterar o ícone do botão
function defineCurrentTheme(theme, btnDarkModeToggle) {
  const darkSvg =
    '<img src="../icons/moon-fill.svg" alt="Ícone de Lua" onload="buscarSvg(this)" />';
  const lightSvg =
    '<img src="../icons/sun-fill.svg" alt="Ícone de Sol" onload="buscarSvg(this)" />';
  document.documentElement.setAttribute("data-theme", theme);

  if (btnDarkModeToggle) {
    btnDarkModeToggle.innerHTML = theme === "light" ? darkSvg : lightSvg;
  }
}

// Aguarda o botão existir antes de adicionar o evento de clique
waitForElement("button-theme").then((btnDarkModeToggle) => {
  btnDarkModeToggle.addEventListener("click", () => {
    let oldTheme = localStorage.getItem("themeSystem") || "light";
    let newTheme = oldTheme === "light" ? "dark" : "light";
    localStorage.setItem("themeSystem", newTheme);
    defineCurrentTheme(newTheme, btnDarkModeToggle);
  });

  // Define o tema ao carregar a página
  defineCurrentTheme(themeSystem, btnDarkModeToggle);
});
