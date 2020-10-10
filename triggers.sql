DROP TRIGGER IF EXISTS update_stock;
DELIMITER $$

CREATE TRIGGER update_stock
AFTER INSERT ON Orders
FOR EACH ROW
BEGIN
	UPDATE Stock
  SET NumInStock = NumInStock - 1
  WHERE Stock.ISBN = new.ISBN;
END $$
DELIMITER ;

DROP TRIGGER IF EXISTS process_refund;
DELIMITER $$
