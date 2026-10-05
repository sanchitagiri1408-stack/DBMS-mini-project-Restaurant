-- Restaurant Management System Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS restaurant_management;
USE restaurant_management;

-- Table: Restaurant
CREATE TABLE IF NOT EXISTS restaurant (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Table (seats in the restaurant)
CREATE TABLE IF NOT EXISTS dining_table (
  id INT PRIMARY KEY AUTO_INCREMENT,
  table_number INT UNIQUE NOT NULL,
  capacity INT NOT NULL CHECK (capacity > 0),
  status ENUM('free', 'occupied') DEFAULT 'free',
  table_type ENUM('two_person', 'four_person', 'family') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Menu Items
CREATE TABLE IF NOT EXISTS menu_item (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  availability BOOLEAN DEFAULT TRUE,
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Orders
CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  table_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
  total_amount DECIMAL(10, 2) DEFAULT 0,
  FOREIGN KEY (table_id) REFERENCES dining_table(id) ON DELETE CASCADE
);

-- Table: Order Items (items in each order)
CREATE TABLE IF NOT EXISTS order_item (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_item_id) REFERENCES menu_item(id) ON DELETE RESTRICT
);

-- Insert sample restaurant
INSERT INTO restaurant (name, address, phone) VALUES
('The Golden Fork', '123 Main Street, Downtown', '555-0123');

-- Insert 6 tables (2 two-person, 2 four-person, 2 family)
INSERT INTO dining_table (table_number, capacity, status, table_type) VALUES
(1, 2, 'free', 'two_person'),
(2, 2, 'free', 'two_person'),
(3, 4, 'free', 'four_person'),
(4, 4, 'free', 'four_person'),
(5, 6, 'free', 'family'),
(6, 6, 'free', 'family');

-- Insert sample menu items
INSERT INTO menu_item (name, description, price, availability, category) VALUES
('Grilled Chicken', 'Juicy grilled chicken breast', 12.99, TRUE, 'Main'),
('Pasta Carbonara', 'Classic Italian pasta with cream sauce', 14.99, TRUE, 'Main'),
('Caesar Salad', 'Fresh romaine with Caesar dressing', 8.99, TRUE, 'Appetizer'),
('Garlic Bread', 'Crispy bread with garlic butter', 4.99, TRUE, 'Appetizer'),
('Chocolate Cake', 'Rich chocolate dessert', 6.99, TRUE, 'Dessert'),
('Ice Cream Sundae', 'Vanilla ice cream with toppings', 5.99, TRUE, 'Dessert'),
('Coca Cola', 'Cold soft drink', 2.99, TRUE, 'Beverage'),
('Orange Juice', 'Fresh orange juice', 3.99, TRUE, 'Beverage'),
('Fish & Chips', 'Crispy fried fish with chips', 13.99, FALSE, 'Main'),
('Vegetable Soup', 'Seasonal vegetables in broth', 6.99, TRUE, 'Appetizer');

-- Create index for faster queries
CREATE INDEX idx_table_status ON dining_table(status);
CREATE INDEX idx_menu_availability ON menu_item(availability);
CREATE INDEX idx_order_table ON orders(table_id);
CREATE INDEX idx_order_item_order ON order_item(order_id);
