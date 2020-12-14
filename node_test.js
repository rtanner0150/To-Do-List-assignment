// //load in the express module
// const express = require('express');
// const ToDoTask = require('./models/ToDoTask');

// //creates fa new express application
// const app = express();

// //declare the hostname and port we want to connect to
// const port = 3000;

// ///opening up our server to listen on listen on a specific ip address and port
// //is addresses are also knows as hostnames
// app.listen(port, function(){
//     console.log("the server is running at port " + port)
// });

// //first API call
// //127.0.0.1:3000/
// app.get('/', function(request, response){
//     response.send("hello it is today YAYPI!\n");
// });
// // another api call 
// app.get('Tasks/', function (request, response){
//     Task.find(function(err, tasks) {
//         if (err) return console.error(err);
//         response.send(tasks)
//     })
// })

// //127.0.0.1:3000/name
// app.get('/name', function(request, response){
//     response.send("Katie!");
// });