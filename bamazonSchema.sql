-- Uses the DB
USE bamazon_DB;

-- Creates the product table with variable columns
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT default 0,
  product_sales DECIMAL(10,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (item_id)
);

-- Inserts initial data into table
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('bed', 'furniture', 600, 10),
	     ('laptop', 'electronics', 2000, 5),
       ('exercise ball', 'lifestyle', 39.99, 20),
       ('tv', 'entertainment', 799, 10),
       ('curio', 'antiques', 10, 3),
       ('map', 'travel', 5, 50),
       ('turntable', 'entertainment', 300, 10),
       ('record', 'entertainment', 4.99, 25),
       ('otter box', 'electronics', 60, 30),
       ('cd', 'entertainment', 9.99, 1000);

-- Allows a quick view of table
SELECT * FROM products;

-- Creates the product table with variable columns
CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(100) NOT NULL,
	over_head_costs DECIMAL(10,2) NULL,
	PRIMARY KEY (department_id)
);
-- Inserts initial data into table
INSERT INTO departments(department_name, over_head_costs)
VALUES  ('furniture', 200.00),
		    ('electronics', 125.98),
        ('lifestyle', 200.56),
        ('entertainment', 348.88),
        ('antiques', 3500.28),
        ('travel', 1200.40);
        
SELECT * FROM departments;

