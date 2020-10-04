CREATE TABLE Customers (
  CustomerID VARCHAR(255),
	Name VARCHAR(255),
  IsMember BOOLEAN,
  Credit Decimal(16,2)
);

CREATE TABLE Catalog (
	Title VARCHAR(255),
  Author VARCHAR(255),
  ISBN VARCHAR(255),
	Price DECIMAL(5,2),
  Genres VARCHAR(255),
  PublicationDate DATE,
  PrintType VARCHAR(255),
  Language VARCHAR(255)
);

CREATE TABLE Stock (
  ISBN VARCHAR(255),
  NumInStock INTEGER,
  PrintType VARCHAR(255),
  Language VARCHAR(255)
);

CREATE TABLE Orders (
  CustomerID VARCHAR(255),
	OrderNumber VARCHAR(255),
  ISBN VARCHAR(255),
  OrderDate DATE,
  Price DECIMAL(5,2),
  Status VARCHAR(255)
);

CREATE TABLE Wholesale (
	ISBN VARCHAR(255),
  Publisher VARCHAR(255),
	UnitPrice DECIMAL(5,2),
  UnitsPurchased INTEGER,
  TotalPrice DECIMAL(16,2),
  OrderDate DATE
);