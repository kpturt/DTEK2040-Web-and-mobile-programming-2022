const mongoose = require('mongoose')
const url = 'mongodb+srv://kpturt:webmob3password@webmob3.m2e8b.mongodb.net'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

module.exports = Person