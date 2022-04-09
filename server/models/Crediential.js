const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Crediential = new Schema({
    fname:{
        type: String,
    },
    lname:{
        type: String,
    },
    email:{
        type: String,
    },
    type:{
        type: String,
    },
    number:{
        type: Number,
    },
    company:{
        type: String,
    },
})

module.exports = mongoose.model('crediential', Crediential)