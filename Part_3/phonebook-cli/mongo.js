const mongoose = require('mongoose')
const url = 'mongodb+srv://kpturt:<password>@webmob3.m2e8b.mongodb.net'
mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

if((process.argv[2] || process.argv[3]) == null){
    console.log("No arguments, outputting database...")
    console.log("puhelinluettelo:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else {
    console.log("Arguments given, adding person to database...")
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })
    person.save().then(response => {
        console.log(`adding person ${person.name} number ${person.number}`)
        mongoose.connection.close()
    })
}



