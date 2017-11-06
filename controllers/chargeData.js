var express = require('express');
var chargeData = express.Router();
var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://localhost:27017/AC_test', (err, database) =>{
  if (err) return;
  db = database;

})

chargeData.get('/:id', (req,res) =>{
	db.collection('chargepoints').find({ChargeDeviceId: req.params['id']}).toArray(function(err, results){
		if(err) console.log("error with request" + err)
		res.json(results);
	})
})


chargeData.get('/', (req,res) =>{

	var collection;
	if(req.query[0] !== undefined ){
		//if a query is passed in make a call to the db using the variable data
		var array = [];
		for(let connector in req.query){
			array.push({ConnectorType:req.query[connector]})
		}
		var query = {Connector: {$elemMatch: {$or:array}}}
		collection = db.collection('locations').find(query)
	}
	else{
		collection = db.collection('locations').find()
	}

	collection.toArray(function(err, results){
		if(err) console.log("error with request" + err)
		res.json(results);
	})
})


module.exports = chargeData;