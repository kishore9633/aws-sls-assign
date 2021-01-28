const mongoose = require('mongoose');

let mongojsDB = null;

mongoose.connect('mongodb://localhost/awsusers', {
    useNewUrlParser: true
});

module.exports.db = mongoose.connection;

module.exports.connectDBMongoJs = (mongojs, tables) => {
    if (mongojsDB) {
        mongojsDB.collection(tableArr);
        console.log('=> using cached database instance');
        return mongojsDB
    }
    var mongoDbConnection = 'mongodb://localhost/awsusers'
    var tableArr = tables
    mongojsDB = mongojs(mongoDbConnection)
    mongojsDB.on('error', function (err) {
        console.log(err)
    });
    mongojsDB.collection(tableArr)
    return mongojsDB
};