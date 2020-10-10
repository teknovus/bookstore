INSERT INTO Customers VALUES ('123456789', "Jane Doe", 1, 24.99);
INSERT INTO Customers VALUES ('987654321', "John Smith", 0, 0.0);
INSERT INTO Customers VALUES ('222222222', "John Smith", 1, 14.99);
INSERT INTO Customers VALUES ('123123123', "James Baker", 1, 0.0);
INSERT INTO Customers VALUES ('555555555', "Hugh Grant", 0, 0.99);
INSERT INTO Customers VALUES ('452467389', "Jane Smith", 1, 2.99);
INSERT INTO Customers VALUES ('912254321', "Daniel Li", 0, 0.0);
INSERT INTO Customers VALUES ('145833123', "Thomas Reilly", 1, 0.0);
INSERT INTO Customers VALUES ('111111111', "Daniel Mayer", 0, 0.99);
INSERT INTO Customers VALUES ('000000001', "Jeremy Brown", 0, 0.0);
INSERT INTO Customers VALUES ('999999999', "Jack Hoff", 1, 1.0);
INSERT INTO Customers VALUES ('783278377', "Joe Ma", 0, 0.99);

INSERT INTO Catalog VALUES ("The Grapes of Wrath", "John Steinbeck", "American,Social Realism,Fiction", STR_TO_DATE('19390414','%Y%m%d'));
INSERT INTO Catalog VALUES ("The Great Gatsby", "F. Scott Fitzgerald", "American,Tragedy,Historical Fiction", STR_TO_DATE('19250410','%Y%m%d'));
INSERT INTO Catalog VALUES ("Il problema dei tre corpi", "Liu Cixin", "Science Fiction", STR_TO_DATE('20080101','%Y%m%d'));
INSERT INTO Catalog VALUES ("The Three-Body Problem", "Liu Cixin", "Science Fiction", STR_TO_DATE('20080101','%Y%m%d'));
INSERT INTO Catalog VALUES ("Harry Potter and the Philosopher's Stone", "J. K. Rowling", "Fantasy,Young Adult,Fiction", STR_TO_DATE('19970626','%Y%m%d'));
INSERT INTO Catalog VALUES ("Harry Potter and the Chamber of Secrets", "J. K. Rowling", "Fantasy,Young Adult,Fiction", STR_TO_DATE('19980702','%Y%m%d'));
INSERT INTO Catalog VALUES ("Harry Potter and the Prisoner of Azkaban", "J. K. Rowling", "Fantasy,Young Adult,Fiction", STR_TO_DATE('19990708','%Y%m%d'));
INSERT INTO Catalog VALUES ("Harry Potter and the Goblet of Fire", "J. K. Rowling", "Fantasy,Young Adult,Fiction", STR_TO_DATE('20000708','%Y%m%d'));

INSERT INTO Stock VALUES ("9780140008333", "The Grapes of Wrath", 85, 'Paperback', 'English', 9.99);
INSERT INTO Stock VALUES ("9780747408741", "The Great Gatsby", 158, 'Hardcover', 'English', 12.99);
INSERT INTO Stock VALUES ("9780747408742", "The Great Gatsby", 222, 'Paperback', 'English', 24.99);
INSERT INTO Stock VALUES ("9788804680604", "Il problema dei tre corpi", 4, 'Paperback', 'Italian', 14.99);
INSERT INTO Stock VALUES ("9780765377067", "The Three-Body Problem", 37, 'Paperback', 'English', 9.99);
INSERT INTO Stock VALUES ("9780747532699", "Harry Potter and the Philosopher's Stone", 0, 'Paperback', 'English', 9.99);
INSERT INTO Stock VALUES ("9780747532705", "Harry Potter and the Chamber of Secrets", 1, 'Paperback', 'English', 9.99);
INSERT INTO Stock VALUES ("9780747532804", "Harry Potter and the Prisoner of Azkaban", 12, 'Paperback', 'English', 9.99);
INSERT INTO Stock VALUES ("9780747533012", "Harry Potter and the Goblet of Fire", 14, 'Paperback', 'English', 9.99);

INSERT INTO Orders VALUES ('987654321','123543765',"9780140008333",STR_TO_DATE('20200101','%Y%m%d'),9.99,"Refunded");
INSERT INTO Orders VALUES ('123123123','254635785',"9780747408741",STR_TO_DATE('20200509','%Y%m%d'),12.99,"Shipped");
INSERT INTO Orders VALUES ('123456789','365785365',"9788804680604",STR_TO_DATE('20120401','%Y%m%d'),24.99,"Refunded");
INSERT INTO Orders VALUES ('555555555','738435447',"9780765377067",STR_TO_DATE('20201010','%Y%m%d'),14.99,"Preparing");
INSERT INTO Orders VALUES ('999999999','720045044',"9780747532699",STR_TO_DATE('20201010','%Y%m%d'),9.99,"Shipped");
INSERT INTO Orders VALUES ('999999999','720045045',"9780747532705",STR_TO_DATE('20201010','%Y%m%d'),9.99,"Shipped");
INSERT INTO Orders VALUES ('999999999','720045046',"9780747532804",STR_TO_DATE('20201010','%Y%m%d'),9.99,"Shipped");
INSERT INTO Orders VALUES ('999999999','720045047',"9780747533012",STR_TO_DATE('20201010','%Y%m%d'),9.99,"Shipped");

INSERT INTO Wholesale VALUES ("9780140008333",'Penguin', 4.99, 100, 499.0, "3783412", STR_TO_DATE('20191225','%Y%m%d'));
INSERT INTO Wholesale VALUES ("9780747408741",'Penguin', 6.99, 200, 1398.0, "38762784", STR_TO_DATE('20170401','%Y%m%d'));
INSERT INTO Wholesale VALUES ("9780765377067",'Chongqing Press', 7.99, 50, 399.5, "143873", STR_TO_DATE('20201001','%Y%m%d'));
INSERT INTO Wholesale VALUES ("9788804680604",'Chongqing Press', 14.99, 10, 149.9, "143874", STR_TO_DATE('20201001','%Y%m%d'));
INSERT INTO Wholesale VALUES ("9780747532699",'Bloomsbury', 4.99, 20, 99.8, "30001", STR_TO_DATE('20201001','%Y%m%d'));
INSERT INTO Wholesale VALUES ("9780747532705",'Bloomsbury', 4.99, 20, 99.8, "30002", STR_TO_DATE('20201001','%Y%m%d'));
INSERT INTO Wholesale VALUES ("9780747532804",'Bloomsbury', 4.99, 20, 99.8, "30003", STR_TO_DATE('20201001','%Y%m%d'));
INSERT INTO Wholesale VALUES ("9780747533012",'Bloomsbury', 4.99, 20, 99.8, "30004", STR_TO_DATE('20201001','%Y%m%d'));