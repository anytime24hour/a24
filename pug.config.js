const packageJSON = require('./package.json');

module.exports = {
    locals: {
        name: packageJSON.name,
        desc: packageJSON.description,
        author: packageJSON.author,
    },
};
