# Projeto

Criei o projeto tentando implementar as boas práticas do clean code, aplicando melhoria de performance fazendo uso do lazy/suspense, useMemo. Tentei deixar o fluxo o mais fácil possível no entendimento do caminho de cadastro dos dados.

Não consegui focar tanto do layout, criei os compoenentes usando styled components, aplicando o atomic design, e tentei componentizar o máximo possível da aplicação para poder reaproveitar cada componente. Deixei a aplicação responsiva e para criação dos gráficos fiz uso da biblioteca apexCharts.

Para o backend fiz um simples uso de json-server para mockar os dados e conseguir imitar um backend funcional.

Para o gerenciamento de dados fiz uso do redux implementando o pattern observable com o fluxo unidirecional, somente uma fonte de verdade onde os dados viriam.

## Rodar Projeto

Primeiro rode o backend que foi feito com json server depois rode o front end, o backend virá sem dados iniciais

### Rodar json-server

entrar na pasta mock

cd ./mock

npx json-server db.json

### Rodar Frontend

clonar o projeto

yarn install

yarn dev

### Rodar Tests

yarn test
