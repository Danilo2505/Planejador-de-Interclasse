// !!! Ajeitar !!!
/**
 * Carrega os dados em uma tabela de acordo com o ID dela.
 * @param {string} idTabela - ID do elemento <table>.
 * @param {Array[Object]} dados - `Array` de `Object` com as informações a colocar na tabela.
 * @param {Array} chavesIgnoradas - `Array` com as as chaves a ignorar.
 * @param {boolean} botoesDeAcao - Define se cria
 * @returns {undefined} Retorna `undefined`.
 */
function carregarDadosEmTabela(
  idTabela,
  dados,
  tbody = true,
  chavesIgnoradas = [],
  botoesDeAcao = true
) {
  let tabela;

  const fragmento = document.createDocumentFragment();
  let tr;
  let td;

  // Se quiser que um tbody contenha todas as células com informações
  if (tbody) {
    // Se o tbody ainda não existir, cria um
    if (document.querySelector(`#${idTabela} > tbody`) == null) {
      document
        .querySelector(`#${idTabela}`)
        .appendChild(document.createElement("tbody"));
    }
    // Define a tabela como sendo ele
    tabela = document.querySelector(`#${idTabela} > tbody`);
    // Limpa o conteúdo da tabela
    tabela.innerHTML = "";
  } else {
    // Define a tabela como sendo a própria tabela
    tabela = document.querySelector(`#${idTabela}`);
    // Limpa o conteúdo da tabela
    tabela.innerHTML = tabela.children[0].innerHTML;
  }

  chavesIgnoradas = new Set(chavesIgnoradas);

  // Percorre todos os objetos dentro dos dados
  dados.forEach((objeto) => {
    // Cria uma nova linha
    tr = document.createElement("tr");

    // Filtra as chaves do objeto para ignorar as especificadas
    Object.keys(objeto).forEach((chave) => {
      if (!chavesIgnoradas.has(chave)) {
        td = document.createElement("td");
        // Usando textContent para segurança e performance
        td.textContent = objeto[chave];
        tr.appendChild(td);
      }
    });
    if (botoesDeAcao == true) {
      td = document.createElement("td");
      // ----- !!! Implementar o innerHTML dos botões de ação !!! -----
      td.innerHTML = `<button>A</button>`;
      tr.appendChild(td);
    }

    fragmento.appendChild(tr);
  });

  tabela.appendChild(fragmento);
}

/**
 * Carrega as <option> em um <select> de acordo com o ID dele.
 * @param {string} idSelect - ID do elemento <select>.
 * @param {Array[string]} valor - `Array` de `string` com os atributos `value` a colocar no seletor.
 * @param {Array[string]} conteudo - `Array` de `string`com as strings a colocar no seletor.
 * @returns {undefined} Retorna `undefined`.
 */
function carregarDadosEmSeletor(idSelect, valor, conteudo) {
  const seletor = document.querySelector(`#${idSelect}`);
  const fragmento = document.createDocumentFragment();
  let option;

  // Limpa o conteúdo do seletor
  seletor.textContent = "";
  // Faz um loop de 0 até o último índice de valor
  for (let i = 0; i < valor.length; i++) {
    // Cria uma nova opção, define o valor e o conteúdo
    option = document.createElement("option");
    option.value = valor[i];
    option.textContent = conteudo[i];
    // Acrescenta a opção ao fragmento
    fragmento.appendChild(option);
  }
  // Acrescenta o fragmento ao seletor
  seletor.appendChild(fragmento);
}

/**
 * Carrega os dados na sessão "Modalidades".
 * @param {IDBDatabase} banco - Instância do banco de dados.
 * @returns {undefined} Retorna `undefined`.
 */
async function carregarSessionModalidades(banco) {
  // Tabela
  carregarDadosEmTabela(
    "tabela-modalidades",
    await obterTodosDados(banco, "Modalidades"),
    true
  );
}

/**
 * Carrega os dados na sessão "Equipes".
 * @param {IDBDatabase} banco - Instância do banco de dados.
 * @returns {undefined} Retorna `undefined`.
 */
async function carregarSessionEquipes(banco) {
  // Salas
  const salas = converterObjetosEmObjetoDeArrays(
    await obterTodosDados(banco, "Salas")
  );
  const idsSalas = salas["id"];
  const nomesSalas = salas["nome"];

  // Modalidades
  const modalidades = converterObjetosEmObjetoDeArrays(
    await obterTodosDados(banco, "Modalidades")
  );
  const idsModalidades = modalidades["id"];
  const nomesModalidades = modalidades["nome"];

  // Tabela
  carregarDadosEmTabela(
    "tabela-equipes",
    await obterTodosDados(banco, "Equipes"),
    true
  );

  // Seletores
  carregarDadosEmSeletor(
    "select-session-equipes-adicionar",
    idsSalas,
    nomesSalas
  );
  carregarDadosEmSeletor("select-session-equipes-editar", idsSalas, nomesSalas);
  carregarDadosEmSeletor(
    "select-session-equipes-adicionar-modalidades",
    idsModalidades,
    nomesModalidades
  );
  carregarDadosEmSeletor(
    "select-session-equipes-editar-modalidades",
    idsModalidades,
    nomesModalidades
  );
}

/**
 * Carrega os dados na sessão "Grupos".
 * @param {IDBDatabase} banco - Instância do banco de dados.
 * @returns {undefined} Retorna `undefined`.
 */
async function carregarSessionGrupos(banco) {
  // Modalidades
  const modalidades = converterObjetosEmObjetoDeArrays(
    await obterTodosDados(banco, "Modalidades")
  );
  const idsModalidades = modalidades["id"];
  const nomesModalidades = modalidades["nome"];

  // Tabela
  carregarDadosEmTabela(
    "tabela-grupos",
    await obterTodosDados(banco, "Grupos"),
    true
  );

  // Seletores
  carregarDadosEmSeletor(
    "select-session-grupos-adicionar-modalidades",
    idsModalidades,
    nomesModalidades
  );
  carregarDadosEmSeletor(
    "select-session-grupos-editar-modalidades",
    idsModalidades,
    nomesModalidades
  );
}

/**
 * Carrega os dados na sessão "Horários".
 * @param {IDBDatabase} banco - Instância do banco de dados.
 * @returns {undefined} Retorna `undefined`.
 */
async function carregarSessionHorarios(banco) {}

/**
 * Carrega os dados na página.
 * @param {IDBDatabase} banco - Instância do banco de dados.
 * @returns {undefined} Retorna `undefined`.
 */
async function carregarDadosNaPagina(banco) {
  // ----- Sessões -----
  // Modalidades
  carregarSessionModalidades(banco);
  // Equipes
  carregarSessionEquipes(banco);
  // Grupos
  carregarSessionGrupos(banco);
  // Horários
  carregarSessionHorarios(banco);
  // -------------------
}

function enviarForm(banco, this, event) {
  event.preventDefault();

  // Percorrer os filhos
  // Procurar o atributo name dos filhos
}
