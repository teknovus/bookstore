SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS Customers (
  CustomerID VARCHAR(255),
	Name VARCHAR(255),
  IsMember BOOLEAN,
  Credit Decimal(16,2),
  PRIMARY KEY (CustomerID)
);

CREATE TABLE IF NOT EXISTS Catalog (
	Title VARCHAR(255),
  Author VARCHAR(255),
  Genres VARCHAR(255),
  PublicationDate DATE,
  PRIMARY KEY (Title)
);

CREATE TABLE IF NOT EXISTS Stock (
  ISBN VARCHAR(255),
  Title VARCHAR(255),
  NumInStock INTEGER,
  PrintType VARCHAR(255),
  Language VARCHAR(255),
	Price DECIMAL(5,2),
  PRIMARY KEY (ISBN),
  FOREIGN KEY (Title) references Catalog(Title)
);

CREATE TABLE IF NOT EXISTS Orders (
  CustomerID VARCHAR(255),
	OrderNumber VARCHAR(255),
  ISBN VARCHAR(255),
  OrderDate DATE,
  Price DECIMAL(5,2),
  Status VARCHAR(255),
  PRIMARY KEY (OrderNumber),
  FOREIGN KEY (CustomerID) references Customers(CustomerID),
  FOREIGN KEY (ISBN) references Stock(ISBN)
);

CREATE TABLE IF NOT EXISTS Wholesale (
	ISBN VARCHAR(255),
  Publisher VARCHAR(255),
	UnitPrice DECIMAL(5,2),
  UnitsPurchased INTEGER,
  TotalPrice DECIMAL(16,2),
	OrderID VARCHAR(255),
  OrderDate DATE,
  PRIMARY KEY (OrderID),
  FOREIGN KEY (ISBN) references Stock(ISBN)
);

SET FOREIGN_KEY_CHECKS = 1;