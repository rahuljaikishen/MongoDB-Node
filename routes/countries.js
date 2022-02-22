
const express = require('express');
const router = express.Router()

const CountryModel = require('../models/Country')

router.post('/', function (req, res) { //Api to create a country or countries
	if (req.body instanceof Array) {
		let insertData = []
		req.body.map(function (country, index) {
			insertData.push({
				"name": country.name,
				"isoCode": country.isoCode,
				"noOfPeople": country.noOfPeople
			})
		})
		if (insertData.length) {
			CountryModel.insertMany(insertData, function (err, result) {
				if (err)
					res.status(400).json({ 'message': 'Countries could not be created' })
				else
					res.status(200).json({ 'message': 'Countries created successfully', 'data': req.body })
			})
		} else {
			res.status(400).json({ 'message': 'Data cannot be empty' })
		}
	} else {
		let { name, isoCode, continent, noOfPeople } = req.body
		CountryModel.create({
			name: name,
			isoCode: isoCode,
			// continent: continent,
			noOfPeople: noOfPeople
		}, function (err, result) {
			if (err)
				res.status(400).json({ 'message': 'Country ' + name + ' could not be created', 'error':err })
			else
				res.status(200).json({ 'message': 'Country ' + name + ' created successfully', 'data':req.body })
		})
	}

})
router.get('/', function (req, res) { //Api to get all countries
	CountryModel.find({}, function (err, result) {
		if (err)
			res.status(400).json({ 'message': 'Could not fetch countries', 'error':err })
		else
			res.status(200).json({ 'message': '', 'data':result })	
	});
})

router.get('/:country_id', function (req, res) { //Api to get country by id
	CountryModel.find({ _id: req.params.country_id }, function (err, result) {
		if (err)
			res.status(400).json({ 'message': 'Could not fetch country', 'error':err })
		else 
			res.status(200).json({ 'message': '', 'data':result })	
	});
})

router.delete('/:country_id', function (req, res) { //api to delete country by id
	CountryModel.findOneAndDelete({ _id: req.params.country_id }, function (err, result) {
		if (err)
			res.status(400).json({ 'message': 'Could not delete country', 'error':err })
		else 
			res.status(200).json({ 'message': 'Country deleted successfully' })
	});
})

router.delete('/', function (req, res) { //api to delete all countries
	CountryModel.remove(function (err, result) {
		if (err)
			res.status(400).json({ 'message': 'Could not delete countries', 'error':err })
		else 
			res.status(200).json({ 'message': 'Country db cleared successfully' })
	});
})

router.put('/:country_id', function (req, res) { //api to update country by id
	let country_id = req.params.country_id
	let { name, isoCode } = req.body
	CountryModel.findOneAndUpdate({ _id: country_id }, { name, isoCode }, { new: true }, function (err, result) {
		if (err)
			res.status(400).json({ 'message': 'Could not update country', 'error':err })
		else 
			res.status(200).json({ 'message': 'Country updated successfully', data:req.body })
	});
})

router.get('/search/:country_name', function (req, res) { //api to find country by name starts with 
	let country_name = req.params.country_name;
	let query = { name: { $regex: "^" + country_name, $options: 'i' } }
	CountryModel.find(query, function (err, result) {
		if (err)
			res.status(400).json({ 'message': 'Could not search for country', 'error':err })
		else 
			res.status(200).json({ 'message': '', data:result })
	});
})

router.get('/sort/population', async function (req, res) { //api to find country by name starts with 
	const countries = await CountryModel.find({}, {'name':1,_id:0,'noOfPeople':1}).sort("noOfPeople") 
    res.status(200).json(countries);
})

router.get('/filter/name_and_population', async function (req, res) { //api to find country by name starts with 
	const countries = await CountryModel.find({name: { $regex: 'u', $options: 'i' }, 'noOfPeople':{$gt : 100000}}, {'name':1,_id:0,'noOfPeople':1}).sort("noOfPeople") 
    res.status(200).json(countries);
})


module.exports = router;
