const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://kschieferecke:Catcake44@cluster0.cnmg5.mongodb.net/ToDoListDB?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
var Task = require('./models/ToDoTask.js');
var List = require('./models/ToDo.js');
const { listIndexes } = require('./models/ToDoTask.js');

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if(err) return console.error(err);
    console.log('Connected to database');
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.once('open', function(){
    //your tutorial and new code go here.
    console.log("We're connected");
    //schema
     let task1 = new Task ({
        taskName : "Do Dishes",
        taskPriority : "high",
        assignee : "Katie",
        completed : false
     })

     task1.save(function(err, task){
         if (err) return console.error(err);
         console.log(task);
     });

     var myList = new List({
        name : "Katie's list", 
        tasks : [
            {
               task : task1._id
            }
        ],
     });

     myList.save();

//how to add items to the list 

/* copy and paste this
Task.create(
    {
    taskName : "String",
    taskPriority : ["high", "medium", "low"],
    assignee : "String",
    completed : [true, false]
    },
function(err,) {
    if (err) return console.error(err);
    console.log();
    });
*/

Task.create(
    {
    taskName : "relax",
    taskPriority : "low",
    assignee : "Katie",
    completed : false
    },
function(err,) {
    if (err) return console.error(err);
    console.log();
    });

Task.create(
    {
    taskName : "vacuum",
    taskPriority : "medium",
    assignee : "Katie",
    completed : false
    },
function(err,) {
    if (err) return console.error(err);
    console.log();
    });

Task.create(
    {
    taskName : "clean litter box",
    taskPriority : "high",
    assignee : "Katie",
    completed : false
    },
function(err,) {
    if (err) return console.error(err);
    console.log();
    });

//how to find an item
//we are going to find by assignee
//for some reason, it is printing the tasks 3 times. 
Task
  .find({
    taskPriority : "high"   // search query
  })
  .then(doc => {
    console.log("found")
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })

//how to update an item
// we are going to update the "priority" on a task

Task
  .findOneAndUpdate ({
    taskName : "relax",
    taskPriority : "low",
  },
  {
    taskName : "relax",
    taskPriority : "medium",
  },
  {
      new: true,
      runValidators: true
  } )
  .then(doc => {
    console.log("updated")
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })

//how to delete an item
//we are going to delete the "clean litter box" item
Task
  .findOneAndDelete({
    taskName : "clean litter box"
  })
  .then(response => {
    console.log("deleted baby")
    console.log(response)
  })
  .catch(err => {
    console.error(err)
  })


}); //once