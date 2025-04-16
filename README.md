
# Toy Store - Instruções para o Banco de Dados

## Requisitos

- Docker
- Docker Compose

## Configuração do Ambiente

1. Clone este repositório
2. Navegue até a pasta raiz do projeto

## Iniciar o Banco de Dados

Execute o comando abaixo para iniciar os containers:

```bash
docker-compose up -d
```

Isso irá iniciar:
- MySQL na porta 3306
- phpMyAdmin na porta 8080 (acesse http://localhost:8080)

## Importar o Banco de Dados

Execute o script de importação:

```bash
chmod +x scripts/import-database.sh
./scripts/import-database.sh
```

## Fazer Backup do Banco de Dados

Execute o script de backup:

```bash
chmod +x scripts/backup-database.sh
./scripts/backup-database.sh
```

O backup será salvo na pasta `./backups` com um timestamp.

## Credenciais do Banco de Dados

- **Host**: localhost
- **Porta**: 3306
- **Banco de dados**: toy_store
- **Usuário**: re9
- **Senha**: rg51gti66

Para acessar o phpMyAdmin:
- **URL**: http://localhost:8080
- **Servidor**: mysql
- **Usuário**: re9
- **Senha**: rg51gti66

## Estrutura do Banco de Dados

O schema do banco de dados está disponível em `docs/database-schema.sql`.
