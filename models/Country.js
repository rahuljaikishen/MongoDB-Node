const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const CountryModel = mongoose.model('Country',{
    name:{
        required:true,
        type:String,
        unique:true
    },
    isoCode: {
        type:String
    }
})

module.exports = CountryModel;