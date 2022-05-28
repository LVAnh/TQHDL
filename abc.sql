
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,  
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `level` INTEGER DEFAULT 0,
  `age` INTEGER DEFAULT 0,
  `gender` varchar(45) DEFAULT NULL,
  `rfToken` varchar(255) DEFAULT NULL,
  `shop_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `idx_fk_shop_id` (`shop_id`),
  CONSTRAINT `fk_user_shop` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`shop_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `shops`;
CREATE TABLE `shops` (
  `shop_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `address` varchar(255) DEFAULT NULL,  
  `phone` varchar(20) DEFAULT NULL,
  `customer_service_staff_name` varchar(50) DEFAULT NULL,
  `logo` varchar(100) DEFAULT NULL,
  `status` INTEGER DEFAULT 0,
  `user_id` smallint(5) unsigned NOT NULL,
  `opening_date` VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (`shop_id`),
  CONSTRAINT `fk_shop_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `category_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`category_id`))
ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `shop_category`;
CREATE TABLE `shop_category` (
  `shop_id` smallint(5) unsigned NOT NULL,
  `category_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`shop_id`,`category_id`),
  CONSTRAINT `fk_shop_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_category_shop` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`shop_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `image_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `data` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `product_image`;
CREATE TABLE `product_image` (
  `product_id` smallint(5) unsigned NOT NULL,
  `image_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`product_id`,`image_id`),
  CONSTRAINT `fk_product_image` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_image_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `product_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` smallint(5) unsigned NOT NULL,
  `shop_id` smallint(5) unsigned NOT NULL,
  `name` varchar(45) DEFAULT NULL,  
  `phone` varchar(20) DEFAULT NULL,
  `specification` varchar(255) DEFAULT NULL,
  `quantity` INTEGER DEFAULT 1,
  `origin` varchar(255) DEFAULT NULL,
  `import_time` DATE DEFAULT NULL,
  `dom` DATE DEFAULT NULL,
  `exp` DATE DEFAULT NULL,
  `price` INTEGER DEFAULT 0,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_product_shop` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`shop_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `order_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` smallint(5) unsigned NOT NULL,
  `product_id` smallint(5) unsigned NOT NULL,
  `quantity` INTEGER DEFAULT 1,
  `price` INTEGER DEFAULT 0,
  `status` INTEGER DEFAULT 0,
  `order_date` DATE DEFAULT NULL,
  `delivery_date` DATE DEFAULT NULL,
  `date_of_receipt` DATE DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  CONSTRAINT `fk_order_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_order_customer` FOREIGN KEY (`customer_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8;

BEGIN;
INSERT INTO `categories` VALUES (1, 'Thịt, Cá, Trứng, Hải sản');
INSERT INTO `categories` VALUES (2, 'Rau, Củ, Trái cây');
INSERT INTO `categories` VALUES (3, 'Hàng đông lạnh');
INSERT INTO `categories` VALUES (4, 'Mì, Miến, Cháo, Phở');
INSERT INTO `categories` VALUES (5, 'Gạo, Bột, Đồ khô');
INSERT INTO `categories` VALUES (6, 'Dầu ăn, Nước chấm, Gia vị');
INSERT INTO `categories` VALUES (7, 'Sữa');
INSERT INTO `categories` VALUES (8, 'Nước giải khát');
INSERT INTO `categories` VALUES (9, 'Bánh kẹo');
INSERT INTO `categories` VALUES (10, 'Chăm sóc cá nhân');
INSERT INTO `categories` VALUES (11, 'Vệ sinh nhà cửa');
INSERT INTO `categories` VALUES (12, 'Mẹ và bé');
INSERT INTO `categories` VALUES (13, 'Khác');
COMMIT;







