CREATE DATABASE ecomerce

-- USE ecomerce

CREATE TABLE users (
	Id INT NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	subject varchar(255) NOT NULL,
	origin varchar(255) NOT NULL,
	createdAt DATE DEFAULT GETDATE(),
    PRIMARY KEY(Id)
)

CREATE TABLE categories(
	Id INT NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
    PRIMARY KEY(Id)
)

CREATE TABLE products (
	Id INT NOT NULL AUTO_INCREMENT,
	title varchar(255) NOT NULL,
	description varchar(255) NOT NULL,
	price float DEFAULT 0,
	userId INT,
	categoryId INT,
	createtAd DATE DEFAULT GETDATE(),
	active BIT DEFAULT 1,
    PRIMARY KEY (Id)
    FOREIGN KEY (userId) REFERENCES users(Id),
	FOREIGN KEY (categoryId) REFERENCES categories(Id)
)

CREATE TABLE rating (
	Id INT AUTO_INCREMENT,
	stars INT NOT NULL,
	comment_title varchar(255),
	comment_payload varchar(255),
	productId INT,
	userId INT,
    PRIMARY KEY(Id),
    FOREIGN KEY (userId) REFERENCES users(Id),
    FOREIGN KEY (productId) REFERENCES products(Id),
)

CREATE TABLE comments(
	Id INT AUTO_INCREMENT,
	payload varchar(255) NOT NULL,
	productId INT,
	userId INT,
	parent_comment_id INT,
    PRIMARY KEY(Id),
	FOREIGN KEY (userId) REFERENCES users(Id),
    FOREIGN KEY (productId) REFERENCES products(Id),
    FOREIGN KEY (parent_comment_id) REFERENCES comments(Id),
)


INSERT INTO categories(name) VALUES ('Televisores')
INSERT INTO categories(name) VALUES ('Computadoras')
INSERT INTO categories(name) VALUES ('Ropa')
INSERT INTO categories(name) VALUES ('Heladeras')
INSERT INTO categories(name) VALUES ('Cocinas')
INSERT INTO categories(name) VALUES ('Bebes')
INSERT INTO categories(name) VALUES ('Juguetes')
INSERT INTO categories(name) VALUES ('Vehiculos')
INSERT INTO categories(name) VALUES ('Belleza')
INSERT INTO categories(name) VALUES ('Casa')
INSERT INTO categories(name) VALUES ('Muebles')

SELECT * FROM categories

SELECT * FROM users

SELECT * FROM products

DELETE FROM products WHERE Id IN (1, 2, 4)