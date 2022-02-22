require('dotenv').config();
require('./config/db')
const express = require('express');
const CountryModel = require('./models/Country')
const app = express()
app.use(express.json())

const countriesRoutes = require('./routes/countries');
const continentsRoutes = require('./routes/continents');

app.use('/countries', countriesRoutes);
app.use('/continents', continentsRoutes);

app.get('/', function (req, res) {
    res.send('Hello World')
})



app.listen(3000)
  
