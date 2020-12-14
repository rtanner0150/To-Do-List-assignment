//create an interface to the mongoose module
//create an interface to the mongoose module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new mongoose.Schema({
        name : { type:String }, 
        task : [
            {
                type: Schema.Types.ObjectId,
                ref: "Task"
            }
        ]
});

module.exports = mongoose.model("List", listSchema);