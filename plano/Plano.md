# Faça básico e vá melhorando, pouco a pouco!

## Obs.: Usar inglês no nome dos arquivos, os comentários, nomes de variáveis e funções podem ser em português

## Ordem de criação

- [x] Criar os arquivos básicos (index.html, style.css, main.js & db.js)
- [x] Criar uma estrutura mínima em index.html e estilizar o básico em style.css
- [ ] Criar a lógica do banco de dados com IndexedDB
- [ ] Conectar o banco de dados a UI
- [ ] Melhorar a performance, procurando erros de lógica e usando recursos mais modernos:

  - https://dev.to/wizdomtek/mastering-dom-manipulation-10-essential-tips-for-efficient-and-high-performance-web-development-3mke#10-use-addeventlistener-options-for-better-control

- [ ] Trabalhar na geração de tabelas
- [ ] Exportar as tabelas em um arquivo .xlsx
  - Usar a biblioteca xlsx-js-style
    - https://stackoverflow.com/questions/74865329/how-to-add-styles-to-an-excel-column-with-xlsx-javascript
- [ ] Fazer ajustes finos
- [ ] Melhorar a UI, mas focando em uma UI simples e prática (sem perder muito tempo)
  - Criar um sistema de compartilhamento para o banco de dados. Exemplo:
    - Converter o banco de dados em json
    - Usar IPFS para criar um link para o json
    - Encurtar o link e gerar um QR Code

## O que é preciso?

## Integrar com IndexedDB

- https://www.youtube.com/watch?v=xaXsir6GmB4

### Registrar os Modalidades

- Nome
  - Nome do modalidade (ex.: Futebol, Vôlei, Basquete)
- Duração das partidas
  - Duração em minutos
- Equipes por grupo
  - Quantidade de equipes por grupo

### Registrar as equipes de cada modalidade

- Sala
  - Nome da sala ou turma da equipe

### Criar os horários dos jogos

- Obter os horários do interclasse
  - Por padrão:
    - 3 dias
    - Intervalo da manhã: 09:00 - 09:20
    - Almoço: 12:00 - 13:00
    - Intervalo da tarde: 15:00 - 15:20
