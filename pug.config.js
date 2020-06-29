const packageJSON = require('./package.json');

const data = {};
data.services = require('./src/data/services.json');

const GTAG_anytime24hour = 'UA-18436925-3';
const GTAG_a24 = 'UA-18436925-2';

module.exports = {
    locals: {
        name: 'A Anytime Anywhere',
        description: '24 Hour Mobile Truck & Trailer Repair in Georgia',
        author: 'A Anytime Anywhere 24 Hour Mobile Truck Repair of Georgia, LLC',
        website: 'https://anytime24hour.com',
        gtag: GTAG_anytime24hour,
        packageJSON,
        data,
    },
};
