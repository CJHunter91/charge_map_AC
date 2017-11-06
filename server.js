const express = require('express');
const app = express();
const parser = require('body-parser');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.use(require('./controllers'));
app.use(express.static('.'))

app.listen(3001, function(){
    console.log("Listening on port "+ this.address().port + '...........')
});
