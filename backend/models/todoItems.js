const mongoose = require("mongoose")


const TodoItemSchema = mongoose.Schema({
    item: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("todo", TodoItemSchema)