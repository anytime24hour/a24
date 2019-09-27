const packageJSON = require('./package.json');

const data = {};
data.services = require('./src/data/services.json');

module.exports = {
    locals: {
        name: packageJSON.name,
        desc: packageJSON.description,
        author: packageJSON.author,
        data,
    },
};
