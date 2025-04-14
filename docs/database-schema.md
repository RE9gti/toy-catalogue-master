
# Estrutura do Banco de Dados - Loja de Brinquedos

Este documento detalha a estrutura completa do banco de dados MySQL utilizado na Loja de Brinquedos, incluindo tabelas, relacionamentos e descrições dos campos.

## Diagrama ER

```
┌───────────┐     ┌────────────┐     ┌────────────────┐     ┌──────────────┐
│  users    │     │ products   │     │ orders         │     │ categories   │
├───────────┤     ├────────────┤     ├────────────────┤     ├──────────────┤
│ id        │┐    │ id         │┐    │ id             │┐    │ id           │
│ name      ││    │ name       ││    │ user_id        ││◄───┤ name         │
│ email     ││◄───┤ description││    │ status         ││    │ slug         │
│ password  ││    │ price      ││    │ total_amount   ││    │ description  │
│ role      ││    │ category_id││◄───┤ created_at     ││    │ image        │
│ status    │┘    │ image      ││    │ updated_at     │┘    │ image_url    │
└───────────┘     │ stock      ││    └────────┬───────┘     └──────────────┘
                  │ ...        ││             │
                  └────────────┘│             ▼
                                │      ┌────────────────┐
                                │      │ order_items    │
                                │      ├────────────────┤
                                └─────►│ id             │
                                       │ order_id       │
                                       │ product_id     │
                                       │ quantity       │
                                       │ price          │
                                       └────────────────┘
```

## Tabelas Principais

### users

Armazena os dados dos usuários do sistema, incluindo clientes e administradores.

| Campo       | Tipo                | Descrição                                   |
|-------------|---------------------|---------------------------------------------|
| id          | INT (PK)            | Identificador único do usuário              |
| name        | VARCHAR(100)        | Nome completo do usuário                    |
| email       | VARCHAR(100) UNIQUE | Email do usuário (usado para login)         |
| password    | VARCHAR(255)        | Senha criptografada                         |
| role        | ENUM                | Função: 'admin', 'customer'                 |
| phone       | VARCHAR(20)         | Número de telefone                          |
| birth_date  | DATE                | Data de nascimento                          |
| status      | ENUM                | Status: 'active', 'inactive', 'blocked'     |
| created_at  | TIMESTAMP           | Data de criação do registro                 |
| updated_at  | TIMESTAMP           | Data da última atualização                  |

### categories

Categorias de produtos disponíveis na loja.

| Campo       | Tipo         | Descrição                            |
|-------------|--------------|--------------------------------------|
| id          | INT (PK)     | Identificador único da categoria     |
| name        | VARCHAR(50)  | Nome da categoria                    |
| slug        | VARCHAR(50)  | Slug para URLs (ex: jogos-tabuleiro) |
| description | VARCHAR(255) | Descrição curta da categoria         |
| image       | VARCHAR(255) | Caminho para imagem da categoria     |
| image_url   | VARCHAR(255) | URL completa da imagem               |
| created_at  | TIMESTAMP    | Data de criação do registro          |
| updated_at  | TIMESTAMP    | Data da última atualização           |

### subcategories

Subcategorias para uma organização mais detalhada dos produtos.

| Campo       | Tipo         | Descrição                              |
|-------------|--------------|----------------------------------------|
| id          | INT (PK)     | Identificador único da subcategoria    |
| name        | VARCHAR(50)  | Nome da subcategoria                   |
| slug        | VARCHAR(50)  | Slug para URLs                         |
| description | VARCHAR(255) | Descrição curta da subcategoria        |
| category_id | INT (FK)     | Referência à categoria pai             |
| image       | VARCHAR(255) | Caminho para imagem da subcategoria    |
| image_url   | VARCHAR(255) | URL completa da imagem                 |
| created_at  | TIMESTAMP    | Data de criação do registro            |
| updated_at  | TIMESTAMP    | Data da última atualização             |

### products

Produtos disponíveis na loja.

| Campo           | Tipo          | Descrição                                |
|-----------------|---------------|------------------------------------------|
| id              | INT (PK)      | Identificador único do produto           |
| name            | VARCHAR(100)  | Nome do produto                          |
| description     | TEXT          | Descrição detalhada do produto           |
| price           | DECIMAL(10,2) | Preço atual do produto                   |
| category_id     | INT (FK)      | Referência à categoria                   |
| subcategory_id  | INT (FK)      | Referência à subcategoria (opcional)     |
| image           | VARCHAR(255)  | Caminho para imagem principal            |
| image_url       | VARCHAR(255)  | URL completa da imagem                   |
| stock           | INT           | Quantidade em estoque                    |
| sku             | VARCHAR(50)   | Código único do produto (SKU)            |
| manufacturer    | VARCHAR(100)  | Nome do fabricante                       |
| supplier        | VARCHAR(100)  | Nome do fornecedor                       |
| height          | DECIMAL(10,2) | Altura em centímetros                    |
| width           | DECIMAL(10,2) | Largura em centímetros                   |
| depth           | DECIMAL(10,2) | Profundidade em centímetros              |
| weight          | DECIMAL(10,2) | Peso em kilogramas                       |
| recommended_age | VARCHAR(10)   | Faixa etária recomendada (ex: "3+")      |
| gender          | ENUM          | Gênero: "Unisex", "Boys", "Girls"        |
| material        | VARCHAR(100)  | Material principal do produto            |
| barcode         | VARCHAR(20)   | Código de barras                         |
| status          | ENUM          | Status: "active", "inactive"             |
| created_at      | TIMESTAMP     | Data de criação do registro              |
| updated_at      | TIMESTAMP     | Data da última atualização               |

### product_images

Imagens adicionais para cada produto.

| Campo      | Tipo         | Descrição                         |
|------------|--------------|-----------------------------------|
| id         | INT (PK)     | Identificador único da imagem     |
| product_id | INT (FK)     | Referência ao produto             |
| image_path | VARCHAR(255) | Caminho para arquivo de imagem    |
| image_url  | VARCHAR(255) | URL completa da imagem            |
| main       | BOOLEAN      | Se é a imagem principal           |
| order      | INT          | Ordem de exibição                 |
| created_at | TIMESTAMP    | Data de criação do registro       |

### product_safety

Informações de segurança dos produtos.

| Campo          | Tipo        | Descrição                            |
|----------------|-------------|--------------------------------------|
| id             | INT (PK)    | Identificador único                  |
| product_id     | INT (FK)    | Referência ao produto                |
| certification  | VARCHAR(50) | Nome da certificação (ex: INMETRO)   |
| warning        | VARCHAR(255)| Avisos de segurança                  |
| created_at     | TIMESTAMP   | Data de criação do registro          |

### product_tags

Etiquetas/tags associadas aos produtos para facilitar buscas.

| Campo      | Tipo        | Descrição                       |
|------------|-------------|----------------------------------|
| id         | INT (PK)    | Identificador único              |
| product_id | INT (FK)    | Referência ao produto            |
| tag        | VARCHAR(50) | Nome da tag                      |
| created_at | TIMESTAMP   | Data de criação do registro      |

### orders

Pedidos realizados pelos clientes.

| Campo               | Tipo          | Descrição                                |
|---------------------|---------------|------------------------------------------|
| id                  | INT (PK)      | Identificador único do pedido            |
| user_id             | INT (FK)      | Referência ao usuário                    |
| status              | ENUM          | Status: "processing", "shipped", "delivered", "canceled", "returned", "refunded" |
| total_amount        | DECIMAL(10,2) | Valor total do pedido                    |
| shipping_address_id | INT (FK)      | Referência ao endereço de entrega        |
| payment_method      | VARCHAR(50)   | Método de pagamento                      |
| tracking_number     | VARCHAR(50)   | Número de rastreio da entrega            |
| coupon_code         | VARCHAR(50)   | Código do cupom utilizado                |
| discount            | DECIMAL(10,2) | Valor do desconto aplicado               |
| notes               | TEXT          | Observações sobre o pedido               |
| created_at          | TIMESTAMP     | Data de criação do registro              |
| updated_at          | TIMESTAMP     | Data da última atualização               |

### order_items

Itens incluídos em cada pedido.

| Campo      | Tipo          | Descrição                        |
|------------|---------------|---------------------------------|
| id         | INT (PK)      | Identificador único do item     |
| order_id   | INT (FK)      | Referência ao pedido            |
| product_id | INT (FK)      | Referência ao produto           |
| quantity   | INT           | Quantidade do produto           |
| price      | DECIMAL(10,2) | Preço unitário no momento da compra |
| created_at | TIMESTAMP     | Data de criação do registro     |

### addresses

Endereços dos usuários para entrega e cobrança.

| Campo     | Tipo         | Descrição                       |
|-----------|--------------|--------------------------------|
| id        | INT (PK)     | Identificador único do endereço |
| user_id   | INT (FK)     | Referência ao usuário           |
| street    | VARCHAR(255) | Logradouro, número e complemento |
| city      | VARCHAR(100) | Cidade                         |
| state     | VARCHAR(50)  | Estado                         |
| zip_code  | VARCHAR(20)  | CEP                            |
| country   | VARCHAR(50)  | País                           |
| is_default| BOOLEAN      | Se é o endereço padrão do usuário |
| type      | ENUM         | Tipo: "shipping", "billing", "both" |
| created_at| TIMESTAMP    | Data de criação do registro    |
| updated_at| TIMESTAMP    | Data da última atualização     |

### reviews

Avaliações de produtos feitas pelos clientes.

| Campo       | Tipo         | Descrição                           |
|-------------|--------------|-------------------------------------|
| id          | INT (PK)     | Identificador único da avaliação    |
| product_id  | INT (FK)     | Referência ao produto               |
| user_id     | INT (FK)     | Referência ao usuário               |
| rating      | INT          | Nota de 1 a 5                       |
| comment     | TEXT         | Comentário sobre o produto          |
| status      | ENUM         | Status: "pending", "approved", "rejected" |
| admin_response | TEXT      | Resposta do administrador (opcional) |
| created_at  | TIMESTAMP    | Data de criação do registro         |
| updated_at  | TIMESTAMP    | Data da última atualização          |

### promotions

Promoções e descontos disponíveis na loja.

| Campo       | Tipo          | Descrição                           |
|-------------|---------------|-------------------------------------|
| id          | INT (PK)      | Identificador único da promoção     |
| name        | VARCHAR(100)  | Nome da promoção                    |
| description | TEXT          | Descrição da promoção               |
| discount    | DECIMAL(10,2) | Valor ou percentual de desconto     |
| is_percent  | BOOLEAN       | Se o desconto é percentual          |
| start_date  | DATETIME      | Data de início                      |
| end_date    | DATETIME      | Data de término                     |
| status      | ENUM          | Status: "active", "inactive", "expired" |
| created_at  | TIMESTAMP     | Data de criação do registro         |
| updated_at  | TIMESTAMP     | Data da última atualização          |

### promotion_products

Relacionamento entre promoções e produtos.

| Campo        | Tipo      | Descrição                        |
|--------------|-----------|----------------------------------|
| id           | INT (PK)  | Identificador único do registro  |
| promotion_id | INT (FK)  | Referência à promoção            |
| product_id   | INT (FK)  | Referência ao produto            |
| created_at   | TIMESTAMP | Data de criação do registro      |

### coupons

Cupons de desconto para uso único ou múltiplo.

| Campo        | Tipo          | Descrição                           |
|--------------|---------------|-------------------------------------|
| id           | INT (PK)      | Identificador único do cupom        |
| code         | VARCHAR(20)   | Código do cupom                     |
| description  | VARCHAR(255)  | Descrição do cupom                  |
| discount     | DECIMAL(10,2) | Valor ou percentual de desconto     |
| is_percent   | BOOLEAN       | Se o desconto é percentual          |
| min_purchase | DECIMAL(10,2) | Valor mínimo de compra              |
| max_uses     | INT           | Número máximo de utilizações        |
| used_count   | INT           | Número de vezes já utilizado        |
| start_date   | DATETIME      | Data de início da validade          |
| end_date     | DATETIME      | Data de término da validade         |
| status       | ENUM          | Status: "active", "inactive", "expired" |
| created_at   | TIMESTAMP     | Data de criação do registro         |
| updated_at   | TIMESTAMP     | Data da última atualização          |

### favorites

Lista de produtos favoritos dos usuários.

| Campo      | Tipo      | Descrição                        |
|------------|-----------|----------------------------------|
| id         | INT (PK)  | Identificador único do registro  |
| user_id    | INT (FK)  | Referência ao usuário            |
| product_id | INT (FK)  | Referência ao produto            |
| created_at | TIMESTAMP | Data de criação do registro      |

## Índices Recomendados

Para otimização de desempenho, recomenda-se a criação dos seguintes índices:

- `users`: índice em `email` (já deve ser único)
- `products`: índices em `category_id`, `subcategory_id`, `sku` e `name`
- `orders`: índices em `user_id`, `status` e `created_at`
- `order_items`: índices em `order_id` e `product_id`
- `reviews`: índices em `product_id`, `user_id` e `rating`

## Script SQL de Criação

O script completo para criação do banco de dados está disponível em `docs/database-schema.sql`. Este script contém todas as definições de tabelas, restrições de chave estrangeira e índices recomendados.

## Diagrama ER Completo

Um diagrama Entidade-Relacionamento completo e atualizado do banco de dados está disponível em `docs/database-er-diagram.png`.
