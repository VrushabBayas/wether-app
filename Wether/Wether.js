const request = require('request');
//fetching wether data
var getWether = (lat, lng) => {
	return new Promise((resolve, reject) => {
		request(
			{ url: `https://api.darksky.net/forecast/76417cc9d223be671be8957da7ac8d86/${lat},${lng}`, json: true },
			(error, response, body) => {
				if (!error && response.statusCode === 200) {
					resolve({
						tempreture: body.currently.temperature,
						apparentTemperature: body.currently.apparentTemperature
					});
				} else {
					reject('Unable to fetch Wether from forecast.io!');
				}
			}
		);
	});
};

module.exports.getWether = getWether;
