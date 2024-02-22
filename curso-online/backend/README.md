# Backend

Teste para candidatos à vaga de Desenvolvedor REACT PLENO

## Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento e executar o projeto.

## Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina antes de prosseguir.

## Passos para executar o projeto

### 1. Clone o repositório

```
git clone https://github.com/pedrohygorveras/Desafio.git
```

### 2. Configurar o arquivo .env

Copie o arquivo .env.example e renomeie a cópia para ".env", em seguida, faça os ajustes necessários nos dados conforme suas configurações específicas.

**Este projeto utiliza o PostgreSQL como banco de dados. Abaixo estão algumas informações relevantes sobre as configurações:**

Serviço PostgreSQL: (Configurável no arquivo docker-compose.yml)

**Nome do banco de dados:** course

**Porta Exposta:** 5432

**Usuário:** edu

**Senha:** c8596sgw

**Configurações Adicionais:** O diretório ./data contém o script de inicialização do banco de dados.

### 3. Execute o Docker Compose

Certifique-se de estar no diretório: '\\**caminho-do-projeto**\\Desafio\curso-online\backend' e execute o seguinte comando:

```
docker-compose up -d
```

### 4. Aguarde a inicialização

Aguarde até que os contêineres estejam totalmente inicializados. Pode levar alguns minutos na primeira execução.

### 5. Acesse a aplicação

Após a inicialização, a aplicação estará disponível em http://localhost:8686. Você pode testar a API acessando esse endpoint.

### 6. Encerre os serviços

Quando terminar de usar o projeto, você pode parar e remover os contêineres com o seguinte comando:

```
docker-compose down
```

Isso encerrará os serviços e liberará as portas no seu sistema.
