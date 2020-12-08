require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database');

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/bookstore/Profit/submit').post(function(req, res, next) {
  connection.query(
    "CALL get_profits(STR_TO_DATE('"+req.body.StartDate+"','%Y%m%d'),STR_TO_DATE('"+req.body.EndDate+"','%Y%m%d'));",
    //"CALL get_profits(STR_TO_DATE('20100101','%Y%m%d'),STR_TO_DATE('20201231','%Y%m%d'));",
    req.params.userId,
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

app.route('/bookstore/BestSeller/submit').post(function(req, res, next) {
  connection.query(
    "CALL get_bestsellers(STR_TO_DATE('"+req.body.StartDate+"','%Y%m%d'),STR_TO_DATE('"+req.body.EndDate+"','%Y%m%d'), '"+req.body.Top+"');",
    //"CALL get_bestsellers(STR_TO_DATE('20000101','%Y%m%d'),STR_TO_DATE('20201231','%Y%m%d'), 5);",
    req.params.userId,
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

app.route('/bookstore/Purchasable/submit').post(function(req, res, next) {
  connection.query(
    "CALL get_purchasable_books('"+req.body.customerID+"');",
    //"CALL get_bestsellers(STR_TO_DATE('20000101','%Y%m%d'),STR_TO_DATE('20201231','%Y%m%d'), 5);",
    req.params.userId,
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

app.route('/bookstore/History/submit').post(function(req, res, next) {
  connection.query(
    "CALL get_customer_order_history('"+req.body.customerID+"');",
    //"CALL get_bestsellers(STR_TO_DATE('20000101','%Y%m%d'),STR_TO_DATE('20201231','%Y%m%d'), 5);",
    req.params.userId,
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

app.route('/bookstore/Catalog')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM Catalog", req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
  });

app.route('/bookstore/Catalog/insert')
  .post(function(req, res, next) {
    connection.query(
      "insert into Catalog(Title,Author,Genres,PublicationDate) values('"+req.body.Title+"','"+req.body.Author+"','"+req.body.Genres+"','"+req.body.PublicationDate+"')", 
      req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
});

app.route('/bookstore/Catalog/delete')
  .post(function(req, res, next) {
    connection.query(
      "DELETE from Catalog where Title = '"+req.body.pk+"'", 
      req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
});

app.route('/bookstore/Catalog/update')
  .post(function(req, res, next) {
    connection.query(
      "update Catalog set Author = '"+req.body.Author+"', Genres = '"+req.body.Genres+"', PublicationDate = '"+req.body.PublicationDate+"' where Title = '"+req.body.pk+"'", 
      req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
});


app.route('/bookstore/Customers')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM Customers", req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
  });

app.route('/bookstore/Customers/insert')
  .post(function(req, res, next) {
    connection.query(
      "insert into Customers(CustomerID,Name,IsMember,Credit) values('"+req.body.CustomerID+"','"+req.body.Name+"','"+req.body.IsMember+"','"+req.body.Credit+"')", 
      req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
});

app.route('/bookstore/Customers/delete')
  .post(function(req, res, next) {
    connection.query(
      "DELETE from Customers where CustomerID = '"+req.body.pk+"'", 
      req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
});

app.route('/bookstore/Customers/update')
  .post(function(req, res, next) {
    connection.query(
      "update Customers set Name = '"+req.body.Name+"', IsMember = '"+req.body.IsMember+"', Credit = '"+req.body.Credit+"' where CustomerID = '"+req.body.pk+"'", 
      req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
});

app.route('/bookstore/Stock')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM Stock", req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
  });

app.route('/bookstore/Stock/insert')
  .post(function(req, res, next) {
    connection.query(
      "insert into Stock(ISBN,Title,NumInStock,PrintType,Language,Price) values('"+req.body.ISBN+"','"+req.body.Title+"','"+req.body.NumInStock+"','"+req.body.PrintType+"','"+req.body.Language+"','"+req.body.Price+"')", 
      req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
});

app.route('/bookstore/Stock/delete')
  .post(function(req, res, next) {
    connection.query(
      "DELETE from Stock where ISBN = '"+req.body.pk+"'", 
      req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
});

app.route('/bookstore/Stock/update')
  .post(function(req, res, next) {
    connection.query(
      "update Stock set Title='"+req.body.Title+"', NumInStock='"+req.body.NumInStock+"', PrintType='"+req.body.PrintType+"', Language='"+req.body.Language+"', Price='"+req.body.Price+"' where ISBN = '"+req.body.pk+"'", 
      req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
});

app.route('/bookstore/Orders')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM Orders", req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
  });

app.route('/bookstore/Orders/insert')
  .post(function(req, res, next) {
    connection.query(
      "insert into Orders(CustomerID,OrderNumber,ISBN,OrderDate,Price,Status) values('"+req.body.CustomerID+"','"+req.body.OrderNumber+"','"+req.body.ISBN+"','"+req.body.OrderDate+"','"+req.body.Price+"','"+req.body.Status+"')", 
      // Unable to run these due to GCP SUPERUSER/SYSADMIN Requirements, which we could not find online to elevate user priviledges to
      //"EXECUTE new_order USING '"+req.body.CustomerID+"','"+req.body.OrderNumber+"','"+req.body.ISBN+"', STR_TO_DATE('"+req.body.OrderDate+"'),'"+req.body.Price+"','"+req.body.Status+"'",
      //"CALL new_order('987654321', '123543760', '9780140008333', STR_TO_DATE('20200101','%Y%m%d'), "+9.99+", 'Refunded')",
      req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
});

app.route('/bookstore/Orders/delete')
  .post(function(req, res, next) {
    connection.query(
      "DELETE from Orders where OrderNumber = '"+req.body.pk+"'", 
      req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
});

app.route('/bookstore/Orders/update')
  .post(function(req, res, next) {
    connection.query( 
      "update Orders set CustomerID='"+req.body.CustomerID+"', ISBN='"+req.body.ISBN+"', OrderDate='"+req.body.OrderDate+"', Price='"+req.body.Price+"', Status='"+req.body.Status+"' where OrderNumber = '"+req.body.pk+"'", 
      req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
});

app.route('/bookstore/Wholesale')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM Wholesale", req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
  });

  app.route('/bookstore/Wholesale/insert')
  .post(function(req, res, next) {
    connection.query(
      "insert into Wholesale(ISBN,Publisher,UnitPrice,UnitsPurchased,TotalPrice,OrderID,OrderDate) values('"+req.body.ISBN+"','"+req.body.Publisher+"','"+req.body.UnitPrice+"','"+req.body.UnitsPurchased+"','"+req.body.TotalPrice+"','"+req.body.OrderID+"','"+req.body.OrderDate+"')", 
      req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
});

app.route('/bookstore/Wholesale/delete')
  .post(function(req, res, next) {
    connection.query(
      "DELETE from Wholesale where OrderID = '"+req.body.pk+"'", 
      req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
});

app.route('/bookstore/Wholesale/update')
  .post(function(req, res, next) {
    connection.query(
      "update Wholesale set ISBN='"+req.body.ISBN+"',Publisher='"+req.body.Publisher+"',UnitPrice='"+req.body.UnitPrice+"',UnitsPurchased='"+req.body.UnitsPurchased+"',TotalPrice='"+req.body.TotalPrice+"',OrderDate='"+req.body.OrderDate+"' where OrderID = '"+req.body.pk+"'", 
      req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
});

app.get('/status', (req, res) => res.send('Working!'));

// Port 8080 for Google App Engine
app.set('port', process.env.PORT || 5000);
app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});