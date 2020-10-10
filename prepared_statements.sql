PREPARE get_books_by_attribute FROM 'SELECT Title FROM Catalog WHERE ? = ?';

PREPARE get_customer_order_history FROM 'SELECT OrderNumber, ISBN, OrderDate, Price, Status FROM Orders join Customers ON Orders.CustomerID=Customers.CustomerID WHERE Customers.CustomerID=?';
