//create an interface to the mongoose module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
    taskName : String,
    taskPriority : {type: String, enum: ["high", "medium", "low"]},
    assignee : String,
    completed : Boolean
}, {timestamps : true });

module.exports = mongoose.model("Task", taskSchema)