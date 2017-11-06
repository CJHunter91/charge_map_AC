// seeds database
const fs = require('fs');
const mongojs = require('mongojs')
const db = mongojs('AC_test', ['chargepoints', 'locations'])

db.chargepoints.drop()
db.locations.drop()

fs.readFile(__dirname + '/chargepoints.json', 'utf8', function (err, data) {
	if (err) throw err;

	var json = JSON.parse(data);
	populateLocations(json);
	addToDB(json);
	
})

const addToDB = (data) => {
	db.chargepoints.insert(data.ChargeDevice, ()=>{process.exit()});
}

const populateLocations = (data) =>{
	data.ChargeDevice.forEach((device)=>{
		if(!device.AccessRestrictionFlag  && !device.SubscriptionRequiredFlag){
			const locationObj = {}
			locationObj['ChargeDeviceId'] = device.ChargeDeviceId
			locationObj['Latitude'] = device.ChargeDeviceLocation.Latitude
			locationObj['Longitude'] = device.ChargeDeviceLocation.Longitude
			locationObj['Connector'] = device.Connector
			db.locations.insert(locationObj)
		}
	})
}