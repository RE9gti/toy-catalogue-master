
# Exemplos de Consultas SQL para o Banco de Dados da Loja de Brinquedos

Este documento apresenta exemplos práticos de consultas SQL para operações comuns no banco de dados da Loja de Brinquedos.

## Consultas Básicas

### Listar Todos os Produtos de uma Categoria

```sql
SELECT p.id, p.name, p.price, p.stock, p.image_url 
FROM products p
WHERE p.category_id = 1
ORDER BY p.name;
```

### Encontrar Produtos com Estoque Baixo

```sql
SELECT p.id, p.name, p.sku, p.stock, c.name as category
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.stock < 10 AND p.status = 'active'
ORDER BY p.stock ASC;
```

### Listar Produtos Mais Vendidos

```sql
SELECT p.id, p.name, SUM(oi.quantity) as total_vendido
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.status IN ('processing', 'shipped', 'delivered')
GROUP BY p.id, p.name
ORDER BY total_vendido DESC
LIMIT 10;
```

## Consultas para Administração

### Verificar Pedidos Recentes

```sql
SELECT o.id, u.name as cliente, o.total_amount, o.status, o.created_at
FROM orders o
JOIN users u ON o.user_id = u.id
ORDER BY o.created_at DESC
LIMIT 20;
```

### Detalhes Completos de um Pedido Específico

```sql
SELECT o.id, o.created_at, o.status, o.total_amount, o.payment_method,
  u.name as cliente, u.email, u.phone,
  a.street, a.city, a.state, a.zip_code,
  p.name as produto, oi.quantity, oi.price
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN addresses a ON o.shipping_address_id = a.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.id = 1;
```

### Estatísticas de Vendas por Mês

```sql
SELECT 
  YEAR(o.created_at) as ano,
  MONTH(o.created_at) as mes,
  COUNT(DISTINCT o.id) as total_pedidos,
  SUM(o.total_amount) as valor_total
FROM orders o
WHERE o.status IN ('processing', 'shipped', 'delivered')
GROUP BY YEAR(o.created_at), MONTH(o.created_at)
ORDER BY ano DESC, mes DESC;
```

### Verificar Avaliações Pendentes de Moderação

```sql
SELECT r.id, p.name as produto, u.name as cliente, r.rating, r.comment, r.created_at
FROM reviews r
JOIN products p ON r.product_id = p.id
JOIN users u ON r.user_id = u.id
WHERE r.status = 'pending'
ORDER BY r.created_at;
```

## Consultas para Relatórios

### Relatório de Vendas por Categoria

```sql
SELECT 
  c.name as categoria,
  COUNT(DISTINCT o.id) as total_pedidos,
  SUM(oi.quantity) as total_itens,
  SUM(oi.quantity * oi.price) as valor_total
FROM categories c
JOIN products p ON c.id = p.category_id
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.status IN ('processing', 'shipped', 'delivered')
GROUP BY c.id, c.name
ORDER BY valor_total DESC;
```

### Eficácia de Promoções

```sql
SELECT 
  pr.name as promocao,
  COUNT(DISTINCT o.id) as pedidos_com_promocao,
  SUM(o.discount) as desconto_total
FROM promotions pr
JOIN promotion_products pp ON pr.id = pp.promotion_id
JOIN products p ON pp.product_id = p.id
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.created_at BETWEEN pr.start_date AND pr.end_date
GROUP BY pr.id, pr.name
ORDER BY desconto_total DESC;
```

### Análise de Clientes Fiéis

```sql
SELECT 
  u.id, u.name, u.email,
  COUNT(DISTINCT o.id) as total_pedidos,
  SUM(o.total_amount) as valor_total_gasto
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status IN ('processing', 'shipped', 'delivered')
GROUP BY u.id, u.name, u.email
ORDER BY valor_total_gasto DESC
LIMIT 20;
```

## Consultas para Manutenção

### Produtos Sem Vendas nos Últimos 90 Dias

```sql
SELECT p.id, p.name, p.price, p.stock
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.created_at > DATE_SUB(NOW(), INTERVAL 90 DAY)
WHERE o.id IS NULL AND p.status = 'active'
ORDER BY p.price DESC;
```

### Verificar Inconsistências no Estoque

```sql
SELECT 
  p.id, p.name, p.sku, p.stock,
  SUM(oi.quantity) as vendido_pendente
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.status = 'processing'
GROUP BY p.id, p.name, p.sku, p.stock
HAVING p.stock < SUM(oi.quantity);
```

### Atualização de Status de Promoções Expiradas

```sql
UPDATE promotions
SET status = 'expired'
WHERE status = 'active' AND end_date < NOW();
```

## Consultas para Funcionalidades do Site

### Busca de Produtos por Termo

```sql
SELECT p.id, p.name, p.price, p.image_url, c.name as categoria
FROM products p
JOIN categories c ON p.category_id = c.id
LEFT JOIN product_tags pt ON p.id = pt.product_id
WHERE p.status = 'active' AND (
  p.name LIKE '%termo%' OR
  p.description LIKE '%termo%' OR
  pt.tag LIKE '%termo%'
)
GROUP BY p.id, p.name, p.price, p.image_url, c.name
ORDER BY p.name;
```

### Produtos Relacionados

```sql
SELECT p.id, p.name, p.price, p.image_url
FROM products p
JOIN product_tags pt1 ON p.id = pt1.product_id
JOIN product_tags pt2 ON pt1.tag = pt2.tag
WHERE pt2.product_id = 1 AND p.id != 1 AND p.status = 'active'
GROUP BY p.id, p.name, p.price, p.image_url
ORDER BY COUNT(*) DESC
LIMIT 6;
```

### Lista de Favoritos de um Cliente

```sql
SELECT p.id, p.name, p.price, p.image_url, f.created_at as adicionado_em
FROM favorites f
JOIN products p ON f.product_id = p.id
WHERE f.user_id = 1
ORDER BY f.created_at DESC;
```

## Índices Recomendados

Para otimizar as consultas acima, recomenda-se manter os seguintes índices no banco de dados:

```sql
-- Índices já definidos no schema principal
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_promotions_dates ON promotions(start_date, end_date);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_product_tags_tag ON product_tags(tag);
```
