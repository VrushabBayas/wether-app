const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const wether = require('./Wether/Wether');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for ',
			string: true
		}
	})
	.help()
	.alias('help', 'h').argv;

geocode
	.geocodeAddressP(argv.a)
	.then((result) => {
		if (result) {
			console.log('Address:', result.address);

			wether
				.getWether(result.latitude, result.longitude)
				.then((data) => {
					console.log('tempreture: ', data.tempreture);
					console.log('apparentTemperature: ', data.apparentTemperature);
				})
				.catch((error) => {
					console.log('error: ', error);
				});
		}
	})
	.catch((error) => {
		console.log('error: ', error);
	});
