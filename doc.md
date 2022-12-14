## DOCUMENTAÇÃO DA API

# Instituições
- [POST] "/instituicoes/criar"
- 400: erro para a não inclusão do nome_instituicao
- 400: erro para a não inclusão da descricao
- 400: erro para a não inclusão do endereco
- 400: erro para a não inclusão do telefone
- 400: erro para a não inclusão do site
- 400: erro para um telefone já cadastrado no banco de dados
- 201: cadastro criado com sucesso
- 500: erro de servidor

- [GET] "/instituicoes/buscar"
- 200: sucesso para o retorno de todos os cadastros
- 500: erro de servidor

- [GET] "/instituicoes/encontrar"
- 200: sucesso para encontrar uma instituicao por bairro
- 500: erro de servidor

- [GET] "/instituicoes/achar"
- 200: sucesso para achar uma instituicao por telefone
- 500: erro de servidor

- [PATCH] "/instituicoes/atualizar/:id"
- 404: erro para quando id não foi encontrado
- 200: sucesso para atualizar um cadastro
- 500: erro de servidor

- [DELETE] "/instituicoes/deletar/:id"
- 404: erro para quando id digitado não foi encontrado
- 200: sucesso para deletar um cadastro pelo id
- 500: erro de servidor

# User
- [GET] "/users/all"
- 200: sucesso para carregar todos os cadastros
- 500: erro de servidor

- [POST] "/users/create"
- 400: erro para tentativa de cadastro de um email já existente
- 400: erro para tentativa de cadastro de um email sem o "@"
- 400: erro para tentiva de cadastro de um email sem o ".com"
- 201: sucesso ao criar um novo usuário
- 500: erro de servidor

- [PATCH] "/users/update"
- 404: erro para usuário não encontrado
- 200: sucesso para atualizar cum cadastro
- 500: erro de servidor


# Auth / Login
- [POST] "/users/login"
- 404: erro para usuário não encontrado
- 401: sem autorização; senha inválida
- 200: sucesso no login
- 500: erro de servidor