
# Loja de Brinquedos - Documentação Completa

## Sumário
1. [Visão Geral](#visão-geral)
2. [Requisitos do Sistema](#requisitos-do-sistema)
3. [Instalação](#instalação)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Funcionalidades](#funcionalidades)
6. [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
7. [Integração de Pagamentos](#integração-de-pagamentos)
8. [Administração](#administração)
9. [Perguntas Frequentes](#perguntas-frequentes)
10. [Suporte](#suporte)

## Visão Geral

A Loja de Brinquedos é uma aplicação web completa para e-commerce, construída com React, TypeScript, e outras tecnologias modernas. O sistema permite cadastro e gerenciamento de produtos, categorias, usuários, pedidos e promoções.

### Tecnologias Principais
- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Gerenciamento de Estado**: React Context, TanStack Query
- **Roteamento**: React Router
- **Banco de Dados**: MySQL

## Requisitos do Sistema

Para executar o projeto, você precisará das seguintes ferramentas:

- Node.js (versão 18.x ou superior)
- npm (versão 9.x ou superior) ou yarn
- MySQL (versão 8.x ou superior)

## Instalação

Siga estes passos para configurar e executar a aplicação:

1. **Clone o repositório**
```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_DIRETORIO>
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
```
VITE_API_URL=http://localhost:8080/api
VITE_DATABASE_URL=mysql://re9:rg51gti66@localhost:3306/nome_do_banco
```

4. **Configure o banco de dados MySQL**
```bash
# Crie um banco de dados
CREATE DATABASE nome_do_banco;

# Configure as credenciais conforme README.md:
# Usuário: re9
# Senha: rg51gti66
# Host: localhost
# Porta: 3306
```

5. **Execute o projeto em modo de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

6. **Acesse a aplicação**
Abra seu navegador e acesse `http://localhost:8080`

## Estrutura do Projeto

O projeto segue uma estrutura organizada por funcionalidades:

```
src/
  ├── components/        # Componentes reutilizáveis
  │   ├── admin/         # Componentes da área administrativa
  │   ├── auth/          # Componentes de autenticação
  │   ├── catalog/       # Componentes do catálogo de produtos
  │   ├── home/          # Componentes da página inicial
  │   ├── layout/        # Componentes de layout (cabeçalho, rodapé)
  │   ├── profile/       # Componentes da área do cliente
  │   └── ui/            # Componentes de interface genéricos
  ├── context/           # Contextos React para gerenciamento de estado
  ├── data/              # Dados estáticos e mocks
  ├── hooks/             # Hooks personalizados
  ├── lib/               # Bibliotecas e utilitários
  ├── pages/             # Páginas da aplicação
  │   └── Admin/         # Páginas administrativas
  ├── types/             # Definições de tipos TypeScript
  └── utils/             # Funções utilitárias
```

## Funcionalidades

### Área do Cliente
- Cadastro e login de usuários
- Catálogo de produtos com filtros e busca
- Carrinho de compras
- Lista de favoritos
- Histórico de pedidos
- Gerenciamento de endereços
- Perfil do usuário

### Área Administrativa
- Dashboard com indicadores
- Gerenciamento de produtos
- Gerenciamento de categorias
- Visualização e atualização de pedidos
- Gerenciamento de clientes
- Configurações do sistema

## Configuração do Banco de Dados

A aplicação utiliza MySQL para armazenamento de dados. As tabelas principais são:

- `users`: dados dos usuários
- `products`: produtos disponíveis
- `categories`: categorias de produtos
- `orders`: pedidos realizados
- `order_items`: itens dos pedidos
- `addresses`: endereços dos clientes

Para mais detalhes sobre o esquema do banco de dados, consulte a documentação técnica em `docs/database-schema.md`.

## Integração de Pagamentos

O sistema está preparado para integrar com diversas gateways de pagamento. Para configurar:

1. Acesse a área administrativa em `/admin/configuracoes`
2. Selecione o provedor de pagamento desejado
3. Configure as credenciais da API
4. Teste a integração

## Administração

Para acessar a área administrativa:

1. Acesse `/login` e entre com credenciais de administrador
2. Você será redirecionado automaticamente para `/admin`

Credenciais de administrador padrão:
- Email: admin@exemplo.com
- Senha: admin123

**Importante:** Modifique essas credenciais após o primeiro acesso!

## Perguntas Frequentes

**P: Como redefinir a senha de um usuário?**
R: Acesse a área administrativa em `/admin/clientes`, localize o usuário e clique em "Redefinir Senha".

**P: Como adicionar uma nova categoria?**
R: Na área administrativa, acesse `/admin/categorias` e clique em "Adicionar Categoria".

**P: Como configurar promoções?**
R: Acesse `/admin/produtos`, selecione os produtos desejados e clique em "Configurar Promoção".

## Suporte

Para suporte técnico ou dúvidas sobre o sistema:

- Email: suporte@lojadetoys.com.br
- Telefone: (11) 1234-5678
- Horário de atendimento: Segunda a Sexta, das 9h às 18h
