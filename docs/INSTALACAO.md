
# Manual de Instalação - Loja de Brinquedos

Este guia contém instruções detalhadas para instalação e configuração da aplicação Loja de Brinquedos.

## Índice
1. [Pré-requisitos](#pré-requisitos)
2. [Instalação Passo a Passo](#instalação-passo-a-passo)
3. [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
4. [Configurações Avançadas](#configurações-avançadas)
5. [Solução de Problemas](#solução-de-problemas)

## Pré-requisitos

Antes de começar, certifique-se de que seu ambiente atende aos seguintes requisitos:

### Software Necessário
- **Node.js**: Versão 18.x ou superior
  - [Download Node.js](https://nodejs.org/)
  - Verifique a instalação: `node --version`
- **npm**: Versão 9.x ou superior (instalado com Node.js)
  - Verifique a instalação: `npm --version`
- **MySQL**: Versão 8.x ou superior
  - [Download MySQL](https://dev.mysql.com/downloads/)
  - Verifique a instalação: `mysql --version`
- **Git**: Mais recente
  - [Download Git](https://git-scm.com/downloads)
  - Verifique a instalação: `git --version`

### Hardware Recomendado
- CPU: 2 cores ou superior
- RAM: 4GB ou superior
- Espaço em disco: 1GB disponível

## Instalação Passo a Passo

Siga estas etapas para instalar e configurar a aplicação:

### 1. Clone o Repositório

```bash
# Abra o terminal/prompt de comando
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_DIRETORIO>
```

### 2. Instale as Dependências

```bash
npm install
```

Isso instalará todas as dependências listadas no arquivo `package.json`.

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```
VITE_API_URL=http://localhost:8080/api
VITE_DATABASE_URL=mysql://re9:rg51gti66@localhost:3306/loja_brinquedos
```

### 4. Inicialize o Banco de Dados

#### Criação do Banco de Dados MySQL

Conecte-se ao MySQL:

```bash
mysql -u root -p
```

Execute os seguintes comandos SQL:

```sql
CREATE DATABASE loja_brinquedos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 're9'@'localhost' IDENTIFIED BY 'rg51gti66';
GRANT ALL PRIVILEGES ON loja_brinquedos.* TO 're9'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### Importe o Esquema Inicial (se disponível)

```bash
mysql -u re9 -p loja_brinquedos < docs/schema.sql
```

### 5. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:8080`.

### 6. Verifique a Instalação

Acesse `http://localhost:8080` no navegador para verificar se a aplicação está funcionando corretamente.

## Configuração do Banco de Dados

### Estrutura das Tabelas Principais

A aplicação utiliza as seguintes tabelas principais:

#### users
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### products
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  category_id INT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

#### categories
```sql
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### orders
```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  status ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled') NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  shipping_address_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (shipping_address_id) REFERENCES addresses(id)
);
```

### Dados Iniciais

Para inserir dados iniciais de administrador:

```sql
INSERT INTO users (name, email, password, is_admin)
VALUES ('Admin', 'admin@exemplo.com', '$2a$12$1234567890abcdef1234567890abcdef', TRUE);
```

## Configurações Avançadas

### Personalização do Layout

Edite o arquivo `src/components/layout/Header.tsx` para personalizar o cabeçalho, incluindo logotipo e menu de navegação.

### Configuração de Email

Para configurar o sistema de envio de emails:

1. Adicione as seguintes variáveis ao arquivo `.env`:
```
VITE_SMTP_HOST=smtp.exemplo.com
VITE_SMTP_PORT=587
VITE_SMTP_USER=seu-usuario
VITE_SMTP_PASS=sua-senha
```

2. Reinicie o servidor de desenvolvimento.

### Configuração de SSL/HTTPS

Para configurar HTTPS em ambiente de produção:

1. Obtenha certificados SSL para seu domínio
2. Configure seu servidor web (Nginx, Apache) para usar os certificados
3. Atualize a configuração do Vite para suportar HTTPS

## Solução de Problemas

### Problemas Comuns e Soluções

#### Erro de conexão com o banco de dados
**Problema**: "Error: ER_ACCESS_DENIED_ERROR: Access denied for user"

**Solução**: Verifique se as credenciais do MySQL estão corretas no arquivo `.env`. Certifique-se de que o usuário tem permissões adequadas para o banco de dados.

#### Erro ao iniciar o servidor
**Problema**: "Error: listen EADDRINUSE: address already in use"

**Solução**: A porta 8080 já está em uso. Encerre o processo que está usando essa porta ou altere a porta da aplicação no arquivo `vite.config.ts`.

#### Módulos não encontrados
**Problema**: "Error: Cannot find module 'react'"

**Solução**: Reinstale as dependências do projeto:
```bash
rm -rf node_modules
npm install
```

### Contato de Suporte

Se você encontrar problemas não cobertos neste guia:

- **Email**: suporte@lojadetoys.com.br
- **Telefone**: (11) 1234-5678
- **Horário**: Segunda a Sexta, das 9h às 18h
