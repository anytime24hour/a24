const packageJSON = require('./package.json');

const data = {};
data.services = require('./src/data/services.json');

module.exports = {
    locals: {
        name: 'A Anytime Anywhere',
        description: '24 Hour Mobile Truck & Trailer Repair',
        author: 'A Anytime Anywhere of Georgia, LLC.',
        website: 'https://a24.newagain.site',
        gtag: 'UA-18436925-2',
        packageJSON,
        data,
    },
};
