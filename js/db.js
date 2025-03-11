// Cria um variável que será o banco de dados
let bancoDeDados;
let primeiraExecucao = false;
// Faz uma requisição de abertura do banco
const requisicaoBanco = window.indexedDB.open("InterclasseDB", 1);

// Se for necessário uma atualização do banco de dados
// ou se for a primeira vez que o banco é aberto
requisicaoBanco.onupgradeneeded = (evento) => {
  // Define o banco de dados como o resultado
  // do evento retornado pela requisição
  bancoDeDados = evento.target.result;

  // --- Criação das Object Stores ---
  // - Modalidades -
  let Modalidades = bancoDeDados.createObjectStore("Modalidades", {
    keyPath: "id",
    autoIncrement: true,
  });
  // - Equipes -
  let equipes = bancoDeDados.createObjectStore("Equipes", {
    keyPath: "id",
    autoIncrement: true,
  });
  // - Salas -
  let salas = bancoDeDados.createObjectStore("Salas", {
    keyPath: "id",
    autoIncrement: true,
  });
  // - Grupos -
  let grupos = bancoDeDados.createObjectStore("Grupos", {
    keyPath: "id",
    autoIncrement: true,
  });
  // - Horários -
  let horarios = bancoDeDados.createObjectStore("Horarios", {
    keyPath: "id",
    autoIncrement: true,
  });
  // - Configurações -
  let configuracoes = bancoDeDados.createObjectStore("Configuracoes", {
    keyPath: "id",
    autoIncrement: true,
  });
  // ---------------------------------

  // Define a primeira execução como verdadeira
  primeiraExecucao = true;
};

requisicaoBanco.onsuccess = (evento) => {
  // Define o banco de dados como o resultado
  // do evento retornado pela requisição
  bancoDeDados = evento.target.result;

  // --- Inserção de dados iniciais ---
  // Se for a primeira execução...
  if (primeiraExecucao == true) {
    // Chama a função para definir os dados iniciais, passando o banco de dados
    definirDadosIniciais(bancoDeDados);
    primeiraExecucao = false;
  }

  // Chama a função que carrega os dados
  carregarDadosNaPagina(bancoDeDados);
};

requisicaoBanco.onerror = (evento) => {
  // Informa que houve algum erro ao abrir o banco de dados e o informa
  console.error("Erro ao abrir o banco de dados:", evento.target.error);
};

function definirDadosIniciais(banco) {
  // ----- Salas -----
  const salas = ["A", "B", "C", "D"];
  for (let i = 0; i < 12; i++) {
    const ano = (i - (i % 4)) / 4 + 1;
    const sala = salas[i % 4];
    adicionarDados(banco, "Salas", { id: i + 1, nome: `${ano}º ano ${sala}` });
  }

  // ----- Modalidades -----
  adicionarDados(banco, "Modalidades", {
    id: 1,
    nome: "⚽ Futsal - Masculino",
    duracao_partida: 20,
    equipes_por_grupo: 4,
  });
  adicionarDados(banco, "Modalidades", {
    id: 2,
    nome: "⚽ Futsal - Feminino",
    duracao_partida: 20,
    equipes_por_grupo: 3,
  });
  adicionarDados(banco, "Modalidades", {
    id: 3,
    nome: "🔥 Queimada - Mista",
    duracao_partida: 10,
    equipes_por_grupo: 4,
  });
  adicionarDados(banco, "Modalidades", {
    id: 4,
    nome: "🏐 Voleibol - Misto",
    duracao_partida: 20,
    equipes_por_grupo: 3,
  });
  adicionarDados(banco, "Modalidades", {
    id: 5,
    nome: "🏀 Basquetebol - Masculino",
    duracao_partida: 10,
    equipes_por_grupo: 3,
  });
}
