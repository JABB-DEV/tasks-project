const mongoose = require('mongoose'),
    { Schema } = mongoose

const Tasks = mongoose.model('Task', new Schema({
    name: String,
    desc: String,
    created_at: String,
    complete: Boolean
}))

module.exports = Tasks