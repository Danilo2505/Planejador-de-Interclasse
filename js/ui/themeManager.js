function defineCurrentTheme() {}

window.onload = () => {
  const btnDarkModeToggle = document.getElementById("button-theme");
  const themeSystem = localStorage.getItem("themeSystem") || "light";

  function defineCurrentTheme(theme) {
    const darkSvg =
      '<img src="../icons/moon-fill.svg" alt="Ícone de Lua" onload="buscarSvg(this)" />';
    const lightSvg =
      '<img src="../icons/sun-fill.svg" alt="Ícone de Sol" onload="buscarSvg(this)" />';
    document.documentElement.setAttribute("data-theme", theme);
    if (theme == "light") {
      btnDarkModeToggle.innerHTML = darkSvg;
      return;
    }
    btnDarkModeToggle.innerHTML = lightSvg;
  }

  btnDarkModeToggle.addEventListener("click", () => {
    let oldTheme = localStorage.getItem("themeSystem") || "light";
    let newTheme = oldTheme == "light" ? "dark" : "light";
    localStorage.setItem("themeSystem", newTheme);
    defineCurrentTheme(newTheme);
  });

  defineCurrentTheme(themeSystem);
};
