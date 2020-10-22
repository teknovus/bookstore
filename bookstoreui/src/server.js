require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database');

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

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


app.get('/status', (req, res) => res.send('Working!'));

// Port 8080 for Google App Engine
app.set('port', process.env.PORT || 5000);
app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});