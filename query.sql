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
	categoryId INT FOREIGN KEY REFERENCES categories(Id)
)

CREATE TABLE rating (
	stars INT NOT NULL,
	comment_title varchar(255),
	comment_payload varchar(255),
	productId INT FOREIGN KEY REFERENCES products(Id),
	userId INT FOREIGN KEY REFERENCES users(Id)
)



SELECT * FROM users