const express = require('express');

//app.use(function(req, res, next) {
   // res.header("Access-Control-Allow-Origin", "*");
   // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //next();
  //  });

// recordRoutes is an instance of the express router.
// we use it to define our routes.
//the router will be added as a middleware and will take control of requests starting with path /record.
//var bodyparser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: false}));
//app.use(bodyParser.json());

const recordRoutes = express.Router(); 

//this will help us connect to the database 
const dbo = require('../db/conn');

//this will convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;



// this section will help you get a list of all the records.
recordRoutes.route('/singlefamilys').get(function (req,res) {
    let db_connect = dbo.getDb('nw3377');
    db_connect
    .collection('singlefamily2122')
    .find({})
    .toArray(function (err, result) {
        if (err) throw err;
    });
});

//app.get('/cors', (req,res) => {
  //  res.set('Access-Control-Allow-Origin', '*');
    //res.send({ 'msg': 'This has CORS enabled'})
//} )



module.exports = recordRoutes;




