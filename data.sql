INSERT INTO Customers VALUES ('123456789', "Jane Doe", 1, 24.98);
INSERT INTO Customers VALUES ('987654321', "John Smith", 0, 0.0);

INSERT INTO Catalog VALUES ("The Grapes of Wrath", "John Steinbeck", "9780140008333", 9.99, "American,Social Realism", STR_TO_DATE('19390414','%Y%m%d'), "Paperback", "English");

INSERT INTO Stock VALUES ("9780140008333", 85, 'Paperback', 'English');

INSERT INTO Orders VALUES ('987654321','123543765',"9780140008333",STR_TO_DATE('20200101','%Y%m%d'),9.99,"Refunded");

INSERT INTO Wholesale VALUES ("9780140008333",'Penguin', 4.99, 100, 499.0, STR_TO_DATE('20191225','%Y%m%d'));