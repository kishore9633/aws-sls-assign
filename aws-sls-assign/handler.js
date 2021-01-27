const connection = require("./connection/connection");
const User = require("./model/user.js");
const Mongoose  = require("mongoose");
const mongojs = require("mongojs")

const db = connection.db;
// db.sequelize.sync();




// url ---https://abcdefg.execute-api.ap-south-1.amazonaws.com/dev/create/postUser
// method -- post

module.exports.postUser = async event => {

  var reqJSON = {
    user_name: 'naidu23',
    user_mobilenumber: 8919138
  } // JSON.parse(event.body)


  const newuser = new User(reqJSON);
  newuser.save(function (err, data) {
    if (err) {
      console.log(err)
      // saved!
    } else {
      console.log("inserted")
    }

  });



}



// url ---https://abcdefg.execute-api.ap-south-1.amazonaws.com/dev/findAll/getAllUsers
// method -- GET


module.exports.getAllUsers = async event => {

User.find({},function (err, data) {
  if (err) {
    console.log(err)
    // saved!
  } else {
    console.log(data)
  }

});

};



// url ---https://abcdefg.execute-api.ap-south-1.amazonaws.com/dev/findOne/getUsers/{id}
// method -- GET

module.exports.getUser = async event => {
var paramsId ='6010120872326a34acff335e' //event.pathParameter.id
var reqId = Mongoose.Types.ObjectId(paramsId)
  User.find({_id:reqId},function (err, data) {
    if (err) {
      console.log(err)
      // saved!
    } else {
      console.log(data)
    }
  
  });
  
  };