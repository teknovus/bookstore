DROP PROCEDURE IF EXISTS get_profits;
DELIMITER $$

CREATE PROCEDURE get_profits(IN start_date DATE, IN end_date DATE, OUT profits DECIMAL(16,2))
BEGIN
  DECLARE revenue DECIMAL(16,2) DEFAULT 0;
  DECLARE expense DECIMAL(16,2) DEFAULT 0;
    
  SET revenue = (select SUM(Price) from Orders where OrderDate >= start_date AND OrderDate <= end_date); 
	SET expense = (select SUM(TotalPrice) from Wholesale where OrderDate >= start_date AND OrderDate <= end_date);
  SET profits = revenue - expense;
END $$

DELIMITER ;