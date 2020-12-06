/**
Calculates the profits of a given period, subtracting order revenue from wholesale expenses

Usage Example:
CALL get_profits(STR_TO_DATE('20100101','%Y%m%d'),STR_TO_DATE('20201231','%Y%m%d'));

OR

EXECUTE get_profits_report USING @start, @end;
*/

DROP PROCEDURE IF EXISTS get_profits;
DELIMITER $$

CREATE PROCEDURE get_profits(IN start_date DATE, IN end_date DATE)
BEGIN    
  SET @profits = (
    select SUM(Price) 
    from Orders USE INDEX (Orders_Date_Index) 
    where OrderDate >= start_date AND OrderDate <= end_date) - 
  (
    select SUM(TotalPrice) from Wholesale USE INDEX (Wholesale_Date_Index) 
    where OrderDate >= start_date AND OrderDate <= end_date
    ); 
  SELECT @profits;
END $$

DELIMITER ;

PREPARE get_profits_report FROM 'CALL get_profits(?,?)';


/**
Gets a list of the top n bestsellers for a given period

Usage Example:
CALL get_bestsellers(STR_TO_DATE('20000101','%Y%m%d'),STR_TO_DATE('20201231','%Y%m%d'), 5);

OR

EXECUTE get_bestsellers_report USING @start, @end, @top_n
*/

DROP PROCEDURE IF EXISTS get_bestsellers;
DELIMITER $$

CREATE PROCEDURE get_bestsellers(IN start_date DATE, IN end_date DATE, IN top_n INTEGER)
BEGIN
  SELECT Catalog.Title, Author, COUNT(OrderNumber) as Sales
  FROM Stock USE INDEX (Stock_Title_Index)
  JOIN Catalog on Catalog.Title=Stock.Title
  JOIN Orders USE INDEX (Orders_ISBN_Index, Orders_Date_Index) on Orders.ISBN=Stock.ISBN
  WHERE OrderDate >= start_date AND OrderDate <= end_date
  GROUP BY Catalog.Title
  ORDER BY Sales DESC
  LIMIT top_n;
END $$

DELIMITER ;

PREPARE get_bestsellers_report FROM 'CALL get_bestsellers(?,?,?)';


/**
Given a customerID, finds a list of books that customer can afford to purchase with their credit and that are in stock

Usage Example:
CALL get_purchasable_books('123456789');

OR

EXECUTE get_purchasable_books_report USING @start, @end, @top_n
*/

DROP PROCEDURE IF EXISTS get_purchasable_books;
DELIMITER $$

CREATE PROCEDURE get_purchasable_books(IN CustomerID_ VARCHAR(255))
BEGIN 
  SELECT Catalog.Title, Author, Stock.ISBN, PrintType, Price
  FROM Stock USE INDEX (Stock_Title_Index, Stock_Price_Index)
  JOIN Catalog on Catalog.Title=Stock.Title
  WHERE Price < (SELECT Credit FROM Customers WHERE CustomerID=CustomerID_)
  AND NumInStock > 0;
END $$

DELIMITER ;

PREPARE get_purchasable_books_report FROM 'CALL get_purchasable_books(?)';

/**
Given a customerID, gets their order history

Usage Example:
CALL get_customer_order_history('123456789');

OR

EXECUTE get_purchasable_books_report USING @start, @end, @top_n
*/

DROP PROCEDURE IF EXISTS get_customer_order_history;
DELIMITER $$

CREATE PROCEDURE get_customer_order_history(IN CustomerID_ VARCHAR(255))
BEGIN 
  SELECT OrderNumber, ISBN, OrderDate, Price, Status
  FROM Orders
  JOIN Customers ON Orders.CustomerID=Customers.CustomerID 
  WHERE Customers.CustomerID=CustomerID_;
END $$

DELIMITER ;

PREPARE get_customer_order_history_report FROM 'CALL get_customer_order_history(?)';


/**
Use in place of inserts on the order table
This transaction checks to ensure the order is possible and that their is sufficient stock to fulfill the order
As well as updates the stock

This is not a report

Usage Example:
EXECUTE new_order USING @customerID,@orderNumber,@isbn,@orderDate,@price,@status
Sample data example: '987654321','123543760',"9780140008333",STR_TO_DATE('20200101','%Y%m%d'),9.99,"Refunded"
*/
DROP PROCEDURE IF EXISTS new_order;
DELIMITER $$

CREATE PROCEDURE new_order(IN CustomerID_ VARCHAR(255),
	                         IN OrderNumber_ VARCHAR(255),
                           IN ISBN_ VARCHAR(255),
                           IN OrderDate_ DATE,
                           IN Price_ DECIMAL(5,2),
                           IN Status_ VARCHAR(255))
BEGIN
SET @OLD_AUTOCOMMIT = (SELECT @@SESSION.AUTOCOMMIT);
SET AUTOCOMMIT = 0;
SET GLOBAL TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
  INSERT INTO Orders(CustomerID,OrderNumber,ISBN,OrderDate,Price,Status) VALUES(CustomerID_,OrderNumber_,ISBN_,OrderDate_,Price_,Status_);
  UPDATE Stock
  SET NumInStock = NumInStock - 1
  WHERE Stock.ISBN = ISBN_;
  IF (SELECT NumInStock FROM Stock WHERE Stock.ISBN = ISBN_) < 0 THEN
    ROLLBACK;
  ELSE
    COMMIT;
  END IF;
  SET AUTOCOMMIT = @OLD_AUTOCOMMIT;
END $$

DELIMITER ;

PREPARE insert_new_order FROM 'CALL new_order(?,?,?,?,?,?)';
