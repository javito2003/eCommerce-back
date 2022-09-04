CREATE DATABASE ecomerce

USE ecomerce

CREATE TABLE users (
	Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	name varchar(255) NOT NULL,
	subject varchar(255) NOT NULL,
	origin varchar(255) NOT NULL,
	createdAt DATE DEFAULT GETDATE(),
)

CREATE TABLE categories(
	Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	name varchar(255) NOT NULL
)

CREATE TABLE products (
	Id INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	title varchar(255) NOT NULL,
	description varchar(255) NOT NULL,
	price float DEFAULT 0,
	userId INT FOREIGN KEY REFERENCES users(Id),
	categoryId INT FOREIGN KEY REFERENCES categories(Id),
	createtAd DATE DEFAULT GETDATE(),
	active BIT DEFAULT 1,
)

CREATE TABLE rating (
	Id INT IDENTITY(1, 1) PRIMARY KEY,
	stars INT NOT NULL,
	comment_title varchar(255),
	comment_payload varchar(255),
	productId INT FOREIGN KEY REFERENCES products(Id),
	userId INT FOREIGN KEY REFERENCES users(Id)
)

CREATE TABLE comments(
	Id INT IDENTITY(1, 1) PRIMARY KEY,
	payload varchar(255) NOT NULL,
	productId INT FOREIGN KEY REFERENCES products(Id),
	userId INT FOREIGN KEY REFERENCES users(Id),
	parent_comment_id INT FOREIGN KEY REFERENCES comments(Id)
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