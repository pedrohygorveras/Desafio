# Backend

![image-env-file](./doc/MER/curso-online.drawio.png)

Bem vindo ao Beta Shop.

## Tecnologias Utilizadas

Este projeto foi desenvolvido seguindo os princípios do SOLID e incorpora as seguintes tecnologias:

- **Docker:** Utilizado para facilitar o ambiente de desenvolvimento.

- **TypeScript:** Linguagem utilizada para o desenvolvimento do projeto.

- **PostgreSQL:** Banco de dados relacional utilizado para armazenar e gerenciar os dados do Beta Shop.

- **Prisma:** ORM (Object-Relational Mapping) utilizado para simplificar as operações de banco de dados.

## Testes

O projeto inclui um arquivo dedicado para testes, permitindo a fácil criação de novos registros e a validação das funcionalidades implementadas.

### Executando Testes

Para executar os testes, siga os passos abaixo:

1. Certifique-se de que o ambiente de desenvolvimento e o projeto estão configurados corretamente.

2. Navegue até o diretório do projeto no terminal.

3. Execute o seguinte comando:

   ```bash
   npm test
   ```

## Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento e executar o projeto.

## Pré-requisitos

Certifique-se de ter o **Docker** e o **Docker Compose** instalados em sua máquina antes de prosseguir. Se ainda não tiver, siga as instruções de instalação disponíveis [aqui](https://docs.docker.com/get-docker/).

## Passos para executar o projeto

### 1. Clone o repositório

```
git clone https://github.com/pedrohygorveras/Desafio.git
```

### 2. Configure o arquivo .env

Copie o arquivo .env.example e renomeie a cópia para ".env", em seguida, faça os ajustes necessários nos dados conforme suas configurações específicas.

Exemplo:

![image-env-file](./doc/prints/env-file.png)

Se preferir não alterar as informações de conexão, copie e cole a seguinte URL no seu arquivo `.env`:

```dotenv
DATABASE_URL=postgresql://user_betashop:c8596sgw@postgresql:5432/db_betashop
```

**Este projeto utiliza o PostgreSQL como banco de dados. Abaixo estão algumas informações relevantes sobre as configurações:**

Serviço PostgreSQL: (Configurável no arquivo `docker-compose.yml`)

**Nome do banco de dados:** `db_betashop`

**Host:** `postgresql` (Nome do serviço no arquivo docker-compose.yml)

**Porta Exposta:** `5432`

**Usuário:** `user_betashop`

**Senha:** `c8596sgw`

**Configurações Adicionais:** O diretório ./data contém o script de inicialização do banco de dados.

### 3. Execute o Docker Compose

Certifique-se de estar no diretório: '\\**caminho-do-projeto**\\Desafio\curso-online\backend' e execute o seguinte comando:

```
docker-compose up
```

### 4. Aguarde a inicialização

Aguarde até que os contêineres estejam completamente inicializados, conforme ilustrado na imagem abaixo. **O processo pode demandar alguns minutos durante a primeira execução.**

![image-server-is-running](./doc/prints/server-is-running.png)

### 5. Acesse a aplicação

Após a inicialização, a aplicação estará disponível em http://localhost:8686. Você pode testar a API acessando esse endpoint.

### 6. Encerre os serviços

Quando terminar de usar o projeto, você pode parar e remover os contêineres com o seguinte comando:

```
docker-compose down
```

Isso encerrará os serviços e liberará as portas no seu sistema.
