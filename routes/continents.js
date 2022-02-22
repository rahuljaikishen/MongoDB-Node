const express = require('express');
const router = express.Router()

const ContinentModel = require('../models/Continent')

router.get('/', async (request, response) => { //Api to get continents and the number of countries in them
    const continents = await ContinentModel.aggregate([
        {
           $project: {
               _id:0,
              name: "$name",
              countries: { $size: "$countries" } }
           }
     ] )
    response.status(200).json(continents);
});
router.get('/:continent_name', async (req, res) => { //Api to send list of first four countries in a continent sorted alphabetically
    let continent_name = req.params.continent_name;
	const continents = await ContinentModel.find({ name: { $regex: continent_name, $options: 'i' } },{'name':1,_id:0}).populate({ path: 'countries', select: 'name',options: { limit: 4, sort:'name' } })    
    res.status(200).json(continents);
});
router.post('/', function (req, res) { //Api to create a country or countries
	if (req.body instanceof Array) {
		let insertData = []
		req.body.map(function (continent, index) {
			insertData.push({
				"name": continent.name
			})
		})
		if (insertData.length) {
			ContinentModel.insertMany(insertData, function (err, result) {
				if (err)
					res.status(400).json({ 'message': 'Continent could not be created' })
				else
					res.status(200).json({ 'message': 'Continents created successfully', 'data': req.body })
			})
		} else {
			res.status(400).json({ 'message': 'Data cannot be empty' })
		}
	} else {
		let { name } = req.body
		ContinentModel.create({
			name: name
		}, function (err, result) {
			if (err)
				res.status(400).json({ 'message': 'Continent ' + name + ' could not be created' })
			else
				res.status(200).json({ 'message': 'Continents ' + name + ' successfully' })
		})
	}

})
module.exports = router;