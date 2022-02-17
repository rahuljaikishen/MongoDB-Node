require('dotenv').config();
require('./config/db')
const express = require('express');
const CountryModel = require('./models/Country')
const app = express()
app.use(express.json())

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.post('/countries', async function (req, res) { //Api to create a country
    let {name,isoCode} = req.body
    CountryModel.create({
      name: name,
      isoCode: isoCode
    },function(err,result){
      if(err)
        res.status(400).json({'message':'Country '+name+' could not be created'})
      else
        res.status(200).json({'message':'Country '+name+' successfully'})
    })
})
app.get('/countries/', async function (req, res) { //Api to get all countries
    CountryModel.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
})

app.get('/countries/:country_id', async function (req, res) { //Api to get country by id
  CountryModel.find({_id:req.params.country_id}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
})

app.delete('/countries/:country_id', async function (req, res) { //api to delete country by id
  CountryModel.findOneAndDelete({_id:req.params.country_id}, function(err, result) {
    if (err) {
      res.send({'msg':'Cannot delete country'});
    } else {
      res.send({'msg':'Country deleted successfully'});
    }
  });
})

app.put('/countries/:country_id', async function (req, res) { //api to update country by id
  let country_id = req.params.country_id
  let {name,isoCode} = req.body
  CountryModel.findOneAndUpdate({_id:country_id}, {name, isoCode}, {new:true}, function(err, result) {
    if (err) {
      res.status(500).json(err);
      
    } else {
      res.status(200).json(result);
    }
  });
})

app.get('/countries/search/:country_name', async function (req, res) { //api to find country by name starts with 
  let country_name = req.params.country_name;
  let query = { name: { $regex: "^"+country_name, $options: 'i' }}
  CountryModel.find(query, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
})

app.listen(3000)
  
