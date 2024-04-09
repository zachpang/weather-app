# Weather App

## Steps to setup project in your local environment

```bash
> cd {project directory}
> git clone https://github.com/zachpang/weather-app.git
> cd weather-app

# install dependencies
> npm i / pnpm i

# run dev server
> npm run dev / pnpm dev
```

## UX Behavior Assumptions

### 1. Weather API may possibly return more than 1 weather state.

```json
// JSON response from Weather API

{
  ...
  "weather": [
    {
      "id": 501,
      "main": "Rain",
      "description": "moderate rain",
      "icon": "10d"
    }
  ],
  ...
}
```

The `weather` field is an array of multiple weather conditions that may be different. Therefore it would not be possible to display all of them. In my implementation, I defaulted to selecting the object at index 0.

Documentation URL: https://openweathermap.org/current#example_JSON
**Assumption: always choose the first object in the array**

### 2. Weather API does not facilitate searching by country name.

The url-encoded request to retrieve lat lon via Geocoding API is as follows:
`http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`

First of all the API only returns lat lon values of cities. It is not possible to retrieve lat lon values of countries.
I suspect it is because most countries span across a large area
Documentation URL: https://openweathermap.org/api/geocoding-api

Attempting various parameter combinations in the query parameters:

1. Entering a `country` name i.e. "Malaysia", will be treated as a `city` name in the API. A city with the name of "Malaysia" in Dubai country will be returned instead.
2. Entering a `country code` without a `city` will return a list of cities for that country i.e. Malaysian cities or SG will return districts in Singapore.
3. Entering a `country` name in `city` and corresponding `country code` of the `country` also does not work for most cases.

#### Possible solution:

- Requires a mapping of `country` name -> `country code`, and a mapping of `country code` -> `capital`
- First map the search term to a `country code` if it exists. Then using the `country code`, map to its capital city.
- Default to capital? Will require a list of `country code` to capitals.
- enter `city` using the country's capital, and `country code` to narrow the country.

The possible solution was not implemented due to lack of time.
Therefore the current implementation only supports searching for city weather specifically.
