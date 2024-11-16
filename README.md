# API de Gestão de Usuários, Categorias e Produtos

Este é um projeto de API RESTful construída com Node.js, Express e MongoDB. A aplicação permite gerenciar usuários, categorias e produtos. Inclui funcionalidades de cadastro, login, atualização e exclusão de usuários, bem como o gerenciamento de categorias e produtos.

## Tecnologias Utilizadas

- **Node.js** - JavaScript runtime
- **Express** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM (Object Data Modeling) para MongoDB
- **Dotenv** - Gerenciamento de variáveis de ambiente
- **Bcryptjs** - Hashing de senhas
- **JsonWebToken** - Geração de tokens JWT para autenticação

## Estrutura do Projeto
    **src/**
        **controllers/** - Contém os controladores que definem a lógica das rotas.
            AuthController.js - Contém a lógica para cadastro, login, atualização e exclusão de usuários.
            CategoryController.js - Lógica para criação, listagem, atualização e exclusão de categorias.
            ProductController.js - Lógica para criação, listagem, atualização e exclusão de produtos.
        **models/** - Contém os modelos Mongoose.
            User.js - Modelo de dados do usuário.
            Category.js - Modelo de dados para categorias de produtos.
            Product.js - Modelo de dados para produtos.
        **routes/** - Contém as rotas da aplicação.
            userRoutes.js - Define as rotas para usuários.
            categoryRoutes.js - Define as rotas para categorias.
            productRoutes.js - Define as rotas para produtos.
        **config/** - Contém configurações do banco de dados.
            db.js - Configuração da conexão com o MongoDB.
        **services/** - Contém serviços auxiliares.
            hashGenerator.js - Serviço para gerar senhas hash.
        **utils/** - Contém utilitários auxiliares.
            generateToken.js - Geração de tokens JWT.

## Configuração do Ambiente

   1. Clone o repositório:
        git clone https://github.com/seu-usuario/seu-repositorio.git
        cd seu-repositorio
   2. Instale as dependências do projeto:
        npm install
   3. Crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente:
        MONGO_URI=your_mongo_connection_string
        JWT_SECRET=your_jwt_secret
        PORT=5000
            MONGO_URI: String de conexão do MongoDB.
            JWT_SECRET: Chave secreta para gerar tokens JWT.
            PORT: Porta em que o servidor será executado (padrão: 5000).
   4. Iniciando o Servidor
        Para iniciar o servidor, basta executar o seguinte comando:
            npm start
            A aplicação estará disponível em http://localhost:5000.

## Rotas da API
    
    ### Usuários
    
        **POST /api/users/register**
        Registra um novo usuário.

        **Corpo da requisição:**

            {
            "username": "nome_do_usuario",
            "password": "senha_do_usuario"
            }

        **Resposta de sucesso:**

            {
            "message": "Usuário criado com sucesso!"
            }

        **POST /api/users/login**
        Faz login do usuário.

        **Corpo da requisição:**

            {
            "username": "nome_do_usuario",
            "password": "senha_do_usuario"
            }

            **Resposta de sucesso:**
            
            {
            "message": "Login bem-sucedido!",
            "token": "jwt_token_aqui"
            }

        **PUT /api/users/**
        Atualiza as informações de um usuário.
        
        **Corpo da requisição:**

            {
            "username": "novo_nome_do_usuario",
            "password": "nova_senha_do_usuario"
            }

        **DELETE /api/users/**
        Deleta um usuário com o ID fornecido na URL.
        Exemplo de URL: /api/users/6738dabcc4fd4a0b04b978f0

    ### Categorias

        **POST /api/categories**
        Cria uma nova categoria.

        **Corpo da requisição:**

            {
            "name": "Nome da Categoria"
            "description": "Descrição da categoria"
            }

        **Resposta de sucesso:**

            {
            "message": "Categoria criada com sucesso!"
            }

        **GET /api/categories**
        Retorna todas as categorias.

        **PUT /api/categories/**
        Atualiza uma categoria existente.

        **Corpo da requisição:**

            {
            "name": "Nome atualizado da Categoria"
            "description": "Descrição atualizada da categoria"
            }

        **DELETE /api/categories/**
        Deleta uma categoria com o ID fornecido.

    ### Produtos

        **POST /api/products**
        Cria um novo produto.

        **Corpo da requisição:**

            {
            "name": "Nome do Produto",
            "description": "Smartphone de última geração",
            "amount": 50,
            "price": 99.99,
            "category": "Categoria do Produto(ID da Categoria)"
            }

        **GET /api/products**
        Retorna todos os produtos.

        **PUT /api/products/**
        Atualiza um produto existente.

        **Corpo da requisição:**

            {
            "name": "Nome atualizado do Produto",
            "description": "Descrição atualizada do produto",
            "amount": 50,
            "price": 109.99,
            "category": "Categoria atualizada do Produto(ID da Categoria)"
            }

        **DELETE /api/products/**
        Deleta um produto com o ID fornecido.

## Testando a API
    Você pode testar as rotas da API utilizando o Postman, Insomnia ou qualquer outra ferramenta de sua escolha.

        ### Exemplo de requisição no Postman

            **Registrar um usuário**

            Método: POST

            URL: http://localhost:5000/api/users/register
            Corpo:
            
                {
                "username": "Jesse",
                "password": "123456789"
                }

            **Login**

            Método: POST

            URL: http://localhost:5000/api/users/login
            Corpo:
            
                {
                "username": "Jesse",
                "password": "123456789"
                }

            **Criar Produto**

            Método: POST

            URL: http://localhost:5000/api/products
            Corpo:
        
                {
                "name": "Produto X",
                "description": "Descrição Produto X",
                "amount": 50,
                "price": 100.0,
                "category": "Categoria A(ID da Categoria)"
                }

## Considerações Finais

    Certifique-se de ter o **MongoDB** configurado e rodando localmente ou usando um serviço na nuvem.
    O **JWT** gerado no login deve ser usado para autenticação nas rotas protegidas.