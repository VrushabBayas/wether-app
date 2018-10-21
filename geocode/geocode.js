const request = require('request');
//using call back function
var geocodeAddress = (address, callback) => {
	const encodedAddress = encodeURIComponent(address);
	request(
		{
			url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDnEMsMhLErj-NfA97eHjyW6FAGrC5MzjE&address=${encodedAddress}`,
			json: true
		},
		(error, response, body) => {
			if (error) {
				callback('Unable connect to google server.');
			} else if (body.status === 'ZERO_RESULTS') {
				callback('Unable to find that address..!');
			} else if (body.status === 'OK') {
				callback(undefined, {
					address: `${body.results[0].formatted_address}`,
					latitude: `${body.results[0].geometry.location.lat}`,
					longitude: `${body.results[0].geometry.location.lng}`
				});
			}
		}
	);
};
//usign Promises
var geocodeAddressP = (address) => {
	const encodedAddress = encodeURIComponent(address);
	return new Promise((resolve, reject) => {
		request(
			{
				url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDnEMsMhLErj-NfA97eHjyW6FAGrC5MzjE&address=${encodedAddress}`,
				json: true
			},
			(error, response, body) => {
				if (error) {
					reject('Unable connect to google server.');
				} else if (body.status === 'ZERO_RESULTS') {
					reject('Unable to find that address..!');
				} else if (body.status === 'OK') {
					resolve({
						address: `${body.results[0].formatted_address}`,
						latitude: `${body.results[0].geometry.location.lat}`,
						longitude: `${body.results[0].geometry.location.lng}`
					});
				}
			}
		);
	});
};

module.exports = {
	geocodeAddressP
};
