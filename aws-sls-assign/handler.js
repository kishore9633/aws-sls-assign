const connection = require("./connection/connection");
const User = require("./model/user.js");
const Mongoose = require("mongoose");
const mongojs = require("mongojs")
const jwt = require('jsonwebtoken')
var tables = ['users']
var db = connection.connectDBMongoJs(mongojs, tables)

// url ---https://abcdefg.execute-api.ap-south-1.amazonaws.com/dev/create
// method -- post

module.exports.postUser = async event => {
  var reqJSON = JSON.parse(event.body)
  return new Promise(function (resolve, reject) {
    var newuser = new User(reqJSON);

    newuser.save(function (err, data) {
      if (err) {
        reject({
          statusCode: 400,
          body: JSON.stringify({
            message: err
          })
        })
      } else {
        const token = jwt.sign({
          _id: data._id
        }, "mycourse")
        db.users.update({
          _id: Mongoose.Types.ObjectId(data._id)
        }, {
          $set: {
            token: token
          }
        }, function (error, inserted) {
          if (error) {
            reject({
              statusCode: 400,
              body: JSON.stringify({
                message: error
              })
            })
          } else {
            resolve({
              statusCode: 200,
              body: JSON.stringify({
                message: "user created in the database"
              })
            })
          }
        })
      }
    })
  })
}


// url ---https://abcdefg.execute-api.ap-south-1.amazonaws.com/dev/findAll
// method -- GET


module.exports.getAllUsers = async event => {
  return new Promise(function (resolve, reject) {
    console.log(db);

    db.users.find({}, function (err, data) {
      if (err) {
        console.log(err)
        // saved!
      } else {
        console.log(data)

        resolve({
          statusCode: 200,
          body: JSON.stringify({
            message: "succesfull",
            output: data
          })
        })
      }
    });
  })
};



// url ---https://abcdefg.execute-api.ap-south-1.amazonaws.com/dev/findOne/{id}
// method -- GET

module.exports.getUser = async event => {
  var paramsId = event.pathParameters.id
  var reqId = Mongoose.Types.ObjectId(paramsId)
  User.find({
    _id: reqId
  }, function (err, data) {
    if (err) {
      console.log(err)
      // saved!
    } else {
      console.log(data)
    }
  });
};



// url ---https://abcdefg.execute-api.ap-south-1.amazonaws.com/dev/update/{id}
// method -- put
module.exports.updateUser = async event => {
  return new Promise(function (resolve, reject) {
    if (event && event.pathParameters && event.pathParameters.id) {
      var reqId = Mongoose.Types.ObjectId(event.pathParameters.id)
    } else {
      reject('missing path parameter')
    }

    var reqJSON = JSON.parse(event.body || "{}")
    if (reqJSON && reqJSON.user_name) { // to update name
      var updateQuery = {
        user_name: reqJSON.user_name,
        updatedOn: new Date(Date.now())
      }
    } else if (reqJSON && reqJSON.user_mobilenumber) { // to update mobile number
      var updateQuery = {
        user_mobilenumber: reqJSON.user_mobilenumber,
        updatedOn: new Date(Date.now())
      }
    } else if (!reqJSON.user_name && !reqJSON.user_mobilenumber) { // if missing fields from body
      reject('missing update field')
    };
    auth({
      _id: reqId
    }).then((data) => {
      db.users.update({
        _id: reqId
      }, {
        $set: updateQuery
      }, function (err, data) {
        if (err) {
          reject({
            statusCode: 400,
            body: JSON.stringify(err)
          })
        } else {
          resolve({
            statusCode: 200,
            body: JSON.stringify({
              message: "user updated"
            })
          })
        }
      })
    }).catch((err) => {
      reject({
        statusCode: 400,
        body: JSON.stringify(err)
      })
    })
  })
};

function auth(query) {
  return new Promise(function (resolve, reject) {
    db.users.findOne(query, function (err, data) {
      if (err) {
        reject({
          statusCode: 400,
          body: JSON.stringify({
            message: err
          })
        })
      } else {
        const decoded = jwt.verify(data.token, "mycourse")
        db.users.find({
          _id: decoded._id,
          token: data.token
        }, function (err, data1) {
          if (data1) {
            resolve()
          } else {
            reject({
              statusCode: 400,
              body: JSON.stringify({
                message: "user not authenticated"
              })
            })
          }
        })
      }
    })
  })
}