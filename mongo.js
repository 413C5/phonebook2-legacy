//mongodb+srv://fullstack:<password>@cluster0.ezwn4oa.mongodb.net/?retryWrites=true&w=majority

const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('ERROR, need provide password : node mongo.js <password>')
    process.exit(1)
}

if (process.argv.length < 5) {
    console.log('ERROR, need provide name and number : node mongo.js <password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]
const name=process.argv[3]
const number=process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.ezwn4oa.mongodb.net/app-person?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name:String,
    number:String
})

const Person= mongoose.model('Person',personSchema)

const person=new Person({
    name:name,
    number:number
})

/* const person=new Person({
    name:'Test Person',
    number:'1'
}) */

//Insert
person.save().then(result=>{
    console.log('person added!')
    console.log(result)
    mongoose.connection.close()
})

//Select
/* Person.find({name:'a'}).then(result=>{
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
}) */