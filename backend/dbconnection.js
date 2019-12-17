const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'ncc_qweb',
    password: 'ncc_qweb',
    database: 'ncc_qweb'
});

const app = express();
app.use(cors());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


// Creating a GET route that returns data from the 'users' table.
app.get('/agency', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM agency', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.post('/insertAgency',function(req,res){
    console.log(req.body);
    var a = {
        name: req.body.name,
        city: req.body.city,
        province: req.body.province,
        cap: req.body.cap,
        vat: req.body.vat,
        phone: req.body.phone,
        cf: req.body.cf,
        address: req.body.address
    };
    connection.getConnection(function (err,connection){
        connection.query('INSERT INTO agency (name_agency,city,province,cap,vat,phone,cf,address) VALUES (?,?,?,?,?,?,?,?)', [a.name,a.city,a.province,a.cap,a.vat,a.phone,a.cf,a.address], function(err,result) {
            if(err) throw err;
            console.log("add agency");
            
        });
    });
});

app.post('/insertDriver',function(req,res){
  console.log(req.body);
  var a = {
      name: req.body.name,
      surname: req.body.surname,
      cf: req.body.cf,
      phone: req.body.phone,
      email: req.body.email
  };
  connection.getConnection(function (err,connection){
      connection.query('INSERT INTO driver (name,surname,cf,phone,email) VALUES (?,?,?,?,?)', [a.name,a.surname,a.cf,a.phone,a.email], function(err,result) {
          if(err) throw err;
          console.log("add driver");
          
      });
  });
});

// Starting our server.
app.listen(3000, () => {
 console.log('Server is running at http://localhost:3000/');
});
