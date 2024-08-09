# RAFFLE Backend (Node.js)

### Documentação (API) [http://localhost:3333/docs/](http://localhost:3333/docs/)

## Reproduzir localmente

### Clonar repositório

```bash
git clone https://github.com/progmateus/raffle-challenge.git
```

### Entrar no diretório

```bash
cd raffle-challenge
```

### Instalar depêncencias

```bash
npm install
```

### Rodar o container do banco de dados

```
docker compose up
```

### Rodar as migrations

```
npx sequelize db:migrate
```

### Rodar a aplicação

```
npm run dev
```

### Rodar os testes

```
npm run test
```