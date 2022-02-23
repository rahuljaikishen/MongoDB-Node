# MongoDB-Node

### Project Setup
- npm install
- add .env file with MongoDB endpoint
- npm run dev


### Api Endpoints
- BASE_URL+'/countries/search/:country_name' - Get list of countries starting with string pattern provided in country_name
- BASE_URL+'/continents/' - Get list of continents with the number of countries in them
- BAE_URL+'/continents/:continent_name' - Get first four countries alphabetically sorted for the continent name provided in continent_name
- BASE_URL+'/countries/sort/population' - Get list of countries sorted by population in ascending order
- BASE_URL+'/countries/filter/name_and_population' - Get all countries having the letter `u` in it and a population greater than 100000
