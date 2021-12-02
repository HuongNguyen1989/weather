/** 
 * @typedef {object} Weather
 * @property {number} lat
 * @property {number} lon
 * @property {string} timezone
 * @property {number} timezone_offset
 * @property {object} current
 * @property {number} current.dt
 * @property {number} current.sunrise
 * @property {number} current.sunset
 * @property {number} current.temp
 * @property {number} current.feels_like
 * @property {number} current.pressure
 * @property {number} current.humidity
 * @property {number} current.dew_point
 * @property {number} current.uvi
 * @property {number} current.clouds
 * @property {number} current.visibility
 * @property {number} current.wind_speed
 * @property {number} current.wind_deg
 * @property {number} current.wind_gust
 * @property {object[]} current.weather
 * @property {number} current.weather.id
 * @property {string} current.weather.main
 * @property {string} current.weather.description
 * @property {string} current.weather.icon
 * @property {object[]} minutely
 * @property {number} minutely.dt
 * @property {number} minutely.precipitation
 * @property {object[]} hourly
 * @property {number} hourly.dt
 * @property {number} hourly.temp
 * @property {number} hourly.feels_like
 * @property {number} hourly.pressure
 * @property {number} hourly.humidity
 * @property {number} hourly.dew_point
 * @property {number} hourly.uvi
 * @property {number} hourly.clouds
 * @property {number} hourly.visibility
 * @property {number} hourly.wind_speed
 * @property {number} hourly.wind_deg
 * @property {number} hourly.wind_gust
 * @property {object[]} hourly.weather
 * @property {number} hourly.weather.id
 * @property {string} hourly.weather.main
 * @property {string} hourly.weather.description
 * @property {string} hourly.weather.icon
 * @property {number} hourly.pop
 * @property {object[]} daily
 * @property {number} daily.dt
 * @property {number} daily.sunrise
 * @property {number} daily.sunset
 * @property {number} daily.moonrise
 * @property {number} daily.moonset
 * @property {number} daily.moon_phase
 * @property {object} daily.temp
 * @property {number} daily.temp.day
 * @property {number} daily.temp.min
 * @property {number} daily.temp.max
 * @property {number} daily.temp.night
 * @property {number} daily.temp.eve
 * @property {number} daily.temp.morn
 * @property {object} daily.feels_like
 * @property {number} daily.feels_like.day
 * @property {number} daily.feels_like.night
 * @property {number} daily.feels_like.eve
 * @property {number} daily.feels_like.morn
 * @property {number} daily.pressure
 * @property {number} daily.humidity
 * @property {number} daily.dew_point
 * @property {number} daily.wind_speed
 * @property {number} daily.wind_deg
 * @property {number} daily.wind_gust
 * @property {object[]} daily.weather
 * @property {number} daily.weather.id
 * @property {string} daily.weather.main
 * @property {string} daily.weather.description
 * @property {string} daily.weather.icon
 * @property {number} daily.clouds
 * @property {number} daily.pop
 * @property {number} daily.uvi
 */

/** 
 * @typedef {object} City
 * @property {object} coord
 * @property {number} coord.lon
 * @property {number} coord.lat
 * @property {object[]} weather
 * @property {number} weather.id
 * @property {string} weather.main
 * @property {string} weather.description
 * @property {string} weather.icon
 * @property {string} base
 * @property {object} main
 * @property {number} main.temp
 * @property {number} main.feels_like
 * @property {number} main.temp_min
 * @property {number} main.temp_max
 * @property {number} main.pressure
 * @property {number} main.humidity
 * @property {number} main.sea_level
 * @property {number} main.grnd_level
 * @property {number} visibility
 * @property {object} wind
 * @property {number} wind.speed
 * @property {number} wind.deg
 * @property {number} wind.gust
 * @property {object} clouds
 * @property {number} clouds.all
 * @property {number} dt
 * @property {object} sys
 * @property {number} sys.type
 * @property {number} sys.id
 * @property {string} sys.country
 * @property {number} sys.sunrise
 * @property {number} sys.sunset
 * @property {number} timezone
 * @property {number} id
 * @property {string} name
 * @property {number} cod
 */

let apiKey = '7e62f7501b593a16608f7f0c6a1d755f';

/**
 * Get the weather for a given location.
 * @param { lat: number, lon: number } location The location to get the weather for.
 * @returns { Promise<Weather> } A promise that resolves to the weather.
 */
function getForecastByLocation(location) {
	return new Promise((resolve, reject) => {
		axios.get('https://api.openweathermap.org/data/2.5/onecall', {
    params: {
			lat: location.lat,
			lon: location.lon,
			appid: apiKey,
			units: 'metric'
    },
  }).then((response) => {
			if (response.data) {
				resolve(response.data);
			} else {
				reject(new Error('No data returned'));
			}
		}).catch((error) => {
			reject(error);
		})
	});
}

/**
 * Get city by name
 * @param { string } name The name of the city to get.
 * @returns { Promise<City> } A promise that resolves to the city.
 */
function getCityByName(name) {
	return new Promise((resolve, reject) => {
		axios.get('https://api.openweathermap.org/data/2.5/weather', {
			params: {
				q: name,
				appid: apiKey,
				units: 'metric'
			},
		}).then((response) => {
			if (response.data) {
				resolve(response.data);
			} else {
				reject(new Error('No data returned'));
			}
		}).catch((error) => {
			reject(error);
		})
	});
}