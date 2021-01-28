# aws-sls-assign
i have used Mongodb as a database and mongoose, mongojs as ORM

Robo3t for testing purpose.

Postman for 'CRUD' operations.

JWT for generating and authenticating tokens for user.

1.Install via npm:
  npm install -g serverless

2.createad a database connection mongodb(mongoose, mongojs) with collection name : awsusers.


3.created a users model.

4.In handler.js, first created 'postusers' for create method, everytime posting the user, a token will be generated using JWT.

5.findall users for 'get' method.

6.findone{id} for 'get' method // for finding particular user using 'id'.

7.update for 'put' method.

8.in Serverless.yml, setted region as us-south-1 (mumbai) with plugins: serverless-offline and httpport:4000

  lambda functions
  
     --path:findAll
       method:get
       
       
     --path:create
       method:post
       
       
     --path:findone/{id}
       method:get
       
       
     --path:update
       method:put
