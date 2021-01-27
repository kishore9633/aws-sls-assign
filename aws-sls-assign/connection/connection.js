const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/awsusers',{useNewUrlParser:true});

module.exports.db = mongoose.connection;

// if(!db){
//     console.log("error connecting ")
// }
// else{console.log("db successful")}



