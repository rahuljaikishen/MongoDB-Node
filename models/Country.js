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
    },
    noOfPeople: {
        type:Number
    },
    continent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Continent'
    }
})

module.exports = CountryModel;