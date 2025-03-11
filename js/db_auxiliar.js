/**
 * Adiciona um novo registro ao object store.
 * @param {IDBDatabase} banco - Instância do banco de dados.
 * @param {string} nomeStore - Nome do object store.
 * @param {Object} dados - Objeto a ser armazenado.
 * @returns {Promise<true | error>} Retorna uma Promise resolvendo em `true` se der certo ou rejeitando em um `error` se der errado.
 */
function adicionarDados(banco, nomeStore, dados) {
  return new Promise((resolve, reject) => {
    const store = banco
      .transaction([nomeStore], "readwrite")
      .objectStore(nomeStore);
    const requisicao = store.add(dados);
    requisicao.onsuccess = () => resolve(true);
    requisicao.onerror = (erro) => reject(erro);
  });
}

/**
 * Busca um item específico pelo seu ID (chave primária).
 * @param {IDBDatabase} banco - Instância do banco de dados.
 * @param {string} nomeStore - Nome do object store.
 * @param {any} chave - Chave primária do item.
 * @returns {Promise<Object | undefined>} Retorna uma Promise resolvendo no objeto encontrado ou `undefined` se não existir.
 */
function obterDados(banco, nomeStore, chave) {
  return new Promise((resolve, reject) => {
    const store = banco
      .transaction([nomeStore], "readonly")
      .objectStore(nomeStore);
    const requisicao = store.get(chave);
    requisicao.onsuccess = (event) => resolve(event.target.result);
    requisicao.onerror = () => reject(undefined);
  });
}

/**
 * Retorna todos os registros armazenados no object store.
 * @param {IDBDatabase} banco - Instância do banco de dados.
 * @param {string} nomeStore - Nome do object store.
 * @returns {Promise<Object[]>} Retorna uma Promise resolvendo em um array de objetos armazenados.
 */
function obterTodosDados(banco, nomeStore) {
  return new Promise((resolve, reject) => {
    const store = banco
      .transaction([nomeStore], "readonly")
      .objectStore(nomeStore);
    const requisicao = store.getAll();
    requisicao.onsuccess = (evento) => resolve(evento.target.result);
    requisicao.onerror = () => reject([]);
  });
}

/**
 * Atualiza um registro existente com base na chave primária.
 * @param {IDBDatabase} banco - Instância do banco de dados.
 * @param {string} nomeStore - Nome do object store.
 * @param {Object} dados - Objeto atualizado (deve conter a chave primária).
 * @returns {Promise<true | error>} Retorna uma Promise resolvendo em `true` se der certo ou rejeitando em um `error` se der errado.
 */
function atualizarDados(banco, nomeStore, dados) {
  return new Promise((resolve, reject) => {
    const store = banco
      .transaction([nomeStore], "readwrite")
      .objectStore(nomeStore);
    const requisicao = store.put(dados);
    requisicao.onsuccess = () => resolve(true);
    requisicao.onerror = (error) => reject(error);
  });
}

/**
 * Remove um item específico do banco de dados usando sua chave.
 * @param {IDBDatabase} banco - Instância do banco de dados.
 * @param {string} nomeStore - Nome do object store.
 * @param {any} chave - Chave primária do item a ser removido.
 * @returns {Promise<true | error>} Retorna uma Promise resolvendo em `true` se der certo ou rejeitando em um `error` se der errado.
 */
function removerDados(banco, nomeStore, chave) {
  return new Promise((resolve, reject) => {
    const store = banco
      .transaction([nomeStore], "readwrite")
      .objectStore(nomeStore);
    const requisicao = store.delete(chave);
    requisicao.onsuccess = () => resolve(true);
    requisicao.onerror = (erro) => reject(erro);
  });
}

/**
 * Remove todos os registros do object store.
 * @param {IDBDatabase} banco - Instância do banco de dados.
 * @param {string} nomeStore - Nome do object store.
 * @returns {Promise<true | error>} Retorna uma Promise resolvendo em `true` se der certo ou rejeitando em um `error` se der errado.
 */
function limparStore(banco, nomeStore) {
  return new Promise((resolve, reject) => {
    const store = banco
      .transaction([nomeStore], "readwrite")
      .objectStore(nomeStore);
    const requisicao = store.clear();
    requisicao.onsuccess = () => resolve(true);
    requisicao.onerror = (error) => reject(error);
  });
}

/**
 * Retorna o número total de registros no object store.
 * @param {IDBDatabase} banco - Instância do banco de dados.
 * @param {string} nomeStore - Nome do object store.
 * @returns {Promise<number>} Retorna uma Promise resolvendo com a quantidade de registros ou `-1` se der erro.
 */
function contarRegistros(banco, nomeStore) {
  return new Promise((resolve, reject) => {
    const store = banco
      .transaction([nomeStore], "readonly")
      .objectStore(nomeStore);
    const requisicao = store.count();
    requisicao.onsuccess = (evento) => resolve(evento.target.result);
    requisicao.onerror = () => reject(-1);
  });
}

/**
 * Retorna todos os objetos de acordo com um índice.
 * @param {IDBDatabase} banco - Instância do banco de dados.
 * @param {string} nomeStore - Nome do object store.
 * @param {string} nomeIndice - Nome do índice a ser usado na busca.
 * @returns {Promise<Object[]>} Retorna uma Promise resolvendo em um array de objetos encontrados.
 */
function obterDadosPorIndice(banco, nomeStore, nomeIndice) {
  return new Promise((resolve, reject) => {
    const store = banco
      .transaction([nomeStore], "readonly")
      .objectStore(nomeStore);
    const requisicao = store.index(nomeIndice).getAll();
    requisicao.onsuccess = (event) => resolve(event.target.result);
    requisicao.onerror = () => reject(undefined);
  });
}

/**
 * Retorna todos os objetos, que têm o valor passado, de acordo com um índice.
 * @param {IDBDatabase} banco - Instância do banco de dados.
 * @param {string} nomeStore - Nome do object store.
 * @param {string} nomeIndice - Nome do índice a ser usado na busca.
 * @param {any} valor - Valor a ser pesquisado no índice.
 * @returns {Promise<Object[]>} Retorna uma Promise resolvendo em um array de objetos encontrados.
 */
function obterDadosPorIndiceEValor(banco, nomeStore, nomeIndice, valor) {
  return new Promise((resolve, reject) => {
    const store = banco
      .transaction([nomeStore], "readonly")
      .objectStore(nomeStore);
    const requisicao = store.index(nomeIndice).getAll(valor);
    requisicao.onsuccess = (event) => resolve(event.target.result);
    requisicao.onerror = () => reject(undefined);
  });
}
