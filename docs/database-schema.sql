
-- -----------------------------------------------------
-- Banco de Dados Loja de Brinquedos
-- Script de Criação
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Criação do Banco de Dados
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `loja_brinquedos` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `loja_brinquedos`;

-- -----------------------------------------------------
-- Tabela `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'customer') NOT NULL DEFAULT 'customer',
  `phone` VARCHAR(20) NULL,
  `birth_date` DATE NULL,
  `status` ENUM('active', 'inactive', 'blocked') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela `categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `slug` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  `image` VARCHAR(255) NULL,
  `image_url` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `slug_UNIQUE` (`slug` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela `subcategories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `subcategories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `slug` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  `category_id` INT NOT NULL,
  `image` VARCHAR(255) NULL,
  `image_url` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `slug_UNIQUE` (`slug` ASC),
  INDEX `fk_subcategories_categories_idx` (`category_id` ASC),
  CONSTRAINT `fk_subcategories_categories`
    FOREIGN KEY (`category_id`)
    REFERENCES `categories` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela `products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `category_id` INT NOT NULL,
  `subcategory_id` INT NULL,
  `image` VARCHAR(255) NULL,
  `image_url` VARCHAR(255) NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `sku` VARCHAR(50) NOT NULL,
  `manufacturer` VARCHAR(100) NULL,
  `supplier` VARCHAR(100) NULL,
  `height` DECIMAL(10,2) NULL,
  `width` DECIMAL(10,2) NULL,
  `depth` DECIMAL(10,2) NULL,
  `weight` DECIMAL(10,2) NULL,
  `recommended_age` VARCHAR(10) NULL,
  `gender` ENUM('Unisex', 'Boys', 'Girls') NOT NULL DEFAULT 'Unisex',
  `material` VARCHAR(100) NULL,
  `barcode` VARCHAR(20) NULL,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `sku_UNIQUE` (`sku` ASC),
  INDEX `fk_products_categories_idx` (`category_id` ASC),
  INDEX `fk_products_subcategories_idx` (`subcategory_id` ASC),
  INDEX `idx_products_name` (`name` ASC),
  CONSTRAINT `fk_products_categories`
    FOREIGN KEY (`category_id`)
    REFERENCES `categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_subcategories`
    FOREIGN KEY (`subcategory_id`)
    REFERENCES `subcategories` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela `product_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `image_path` VARCHAR(255) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `main` TINYINT(1) NOT NULL DEFAULT 0,
  `order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_product_images_products_idx` (`product_id` ASC),
  CONSTRAINT `fk_product_images_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela `product_safety`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_safety` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `certification` VARCHAR(50) NULL,
  `warning` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_product_safety_products_idx` (`product_id` ASC),
  CONSTRAINT `fk_product_safety_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela `product_tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_tags` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `tag` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_product_tags_products_idx` (`product_id` ASC),
  INDEX `idx_product_tags_tag` (`tag` ASC),
  CONSTRAINT `fk_product_tags_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela `addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `street` VARCHAR(255) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(50) NOT NULL,
  `zip_code` VARCHAR(20) NOT NULL,
  `country` VARCHAR(50) NOT NULL DEFAULT 'Brasil',
  `is_default` TINYINT(1) NOT NULL DEFAULT 0,
  `type` ENUM('shipping', 'billing', 'both') NOT NULL DEFAULT 'both',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_addresses_users_idx` (`user_id` ASC),
  CONSTRAINT `fk_addresses_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela `orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `status` ENUM('processing', 'shipped', 'delivered', 'canceled', 'returned', 'refunded') NOT NULL DEFAULT 'processing',
  `total_amount` DECIMAL(10,2) NOT NULL,
  `shipping_address_id` INT NOT NULL,
  `payment_method` VARCHAR(50) NOT NULL,
  `tracking_number` VARCHAR(50) NULL,
  `coupon_code` VARCHAR(50) NULL,
  `discount` DECIMAL(10,2) NULL DEFAULT 0.00,
  `notes` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_orders_users_idx` (`user_id` ASC),
  INDEX `fk_orders_addresses_idx` (`shipping_address_id` ASC),
  INDEX `idx_orders_status` (`status` ASC),
  INDEX `idx_orders_created_at` (`created_at` ASC),
  CONSTRAINT `fk_orders_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_addresses`
    FOREIGN KEY (`shipping_address_id`)
    REFERENCES `addresses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela `order_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_order_items_orders_idx` (`order_id` ASC),
  INDEX `fk_order_items_products_idx` (`product_id` ASC),
  CONSTRAINT `fk_order_items_orders`
    FOREIGN KEY (`order_id`)
    REFERENCES `orders` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_items_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela `reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `rating` INT NOT NULL,
  `comment` TEXT NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `admin_response` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_reviews_products_idx` (`product_id` ASC),
  INDEX `fk_reviews_users_idx` (`user_id` ASC),
  INDEX `idx_reviews_rating` (`rating` ASC),
  CONSTRAINT `fk_reviews_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reviews_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela `promotions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `promotions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `discount` DECIMAL(10,2) NOT NULL,
  `is_percent` TINYINT(1) NOT NULL DEFAULT 1,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NOT NULL,
  `status` ENUM('active', 'inactive', 'expired') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_promotions_status` (`status` ASC),
  INDEX `idx_promotions_dates` (`start_date` ASC, `end_date` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela `promotion_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `promotion_products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `promotion_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_promotion_products_promotions_idx` (`promotion_id` ASC),
  INDEX `fk_promotion_products_products_idx` (`product_id` ASC),
  CONSTRAINT `fk_promotion_products_promotions`
    FOREIGN KEY (`promotion_id`)
    REFERENCES `promotions` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_promotion_products_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela `coupons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coupons` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(20) NOT NULL,
  `description` VARCHAR(255) NULL,
  `discount` DECIMAL(10,2) NOT NULL,
  `is_percent` TINYINT(1) NOT NULL DEFAULT 1,
  `min_purchase` DECIMAL(10,2) NULL,
  `max_uses` INT NULL,
  `used_count` INT NOT NULL DEFAULT 0,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NOT NULL,
  `status` ENUM('active', 'inactive', 'expired') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC),
  INDEX `idx_coupons_status` (`status` ASC),
  INDEX `idx_coupons_dates` (`start_date` ASC, `end_date` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela `favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `favorites` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `user_product_UNIQUE` (`user_id` ASC, `product_id` ASC),
  INDEX `fk_favorites_users_idx` (`user_id` ASC),
  INDEX `fk_favorites_products_idx` (`product_id` ASC),
  CONSTRAINT `fk_favorites_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_favorites_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Inserção de Dados Iniciais - Administrador Padrão
-- -----------------------------------------------------
INSERT INTO `users` (`name`, `email`, `password`, `role`, `status`) 
VALUES ('Administrador', 'admin@exemplo.com', '$2a$12$1234567890abcdef1234567890abcdef', 'admin', 'active');

-- -----------------------------------------------------
-- Inserção de Dados Iniciais - Categorias
-- -----------------------------------------------------
INSERT INTO `categories` (`name`, `slug`, `description`, `image`, `image_url`) VALUES 
('Brinquedos Educativos', 'brinquedos-educativos', 'Brinquedos que estimulam o aprendizado', '/images/categories/educativos.jpg', '/images/categories/educativos.jpg'),
('Jogos de Tabuleiro', 'jogos-de-tabuleiro', 'Jogos para toda a família', '/images/categories/tabuleiro.jpg', '/images/categories/tabuleiro.jpg'),
('Bonecas e Bonecos', 'bonecas-e-bonecos', 'Diversos personagens e estilos', '/images/categories/bonecas.jpg', '/images/categories/bonecas.jpg');
