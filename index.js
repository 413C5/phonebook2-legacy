//Servidor express
const { request, response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"

    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"

    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"

    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"

    }
]


//Rutas
app.get('/', (request, response) => {
    response.send('Prueba')
})

//Devolución de todo
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//Devolución cantidad de notas con fecha
app.get('/info', (request, response) => {
    let size = (persons.length).toString()
    console.log(size)

    const date = new Date()
    /* const today = date.toDateString()
    const time = date.toTimeString()

    console.log('Date:', today)
    console.log('Time:', time) */

    response.send(
        `Phonebook has info for ${size} people` +
        `</br> </br>${date}`)
})

//Devolución id especifico
app.get('/api/persons/:id', (request, response) => {
    let id = Number(request.params.id)
    const person = persons.find(x => x.id === id)
    console.log(person)

    if (person !== undefined) {
        response.json(person)
    } else {
        response.status(404).send()
    }

})

//Definición de puerto y que escuhe dicho puerto
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Sever running on port ${PORT}`)
})
