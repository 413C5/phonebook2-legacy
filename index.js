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

/* const generateId = () => {
    const maxId = (() => {
        if (persons.length > 0) {
            return Math.max(...persons.map(x => x.id))
        }
        else {
            return 0
        }
    })()

    return maxId + 1
} */


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
    /* console.log(size) */

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
    /* console.log(person) */

    if (person !== undefined) {
        response.json(person)
    } else {
        response.status(404).send()
    }

})

//Eliminación de una id especifica
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    let size = persons.length

    //Modificacion del objeto
    persons = persons.filter(x => x.id !== id)
    /* console.log(persons)
    console.log(id)
    console.log(size) */

    if (size > persons.length)
        response.status(204).send()
    else
        response.status(404).send()

    console.log(persons)
})

//Agregar nuevos usuarios
app.post('/api/persons', (request, response) => {
    //Recuperacion sintaxis y objeto
    const body = request.body
    //console.log(body.name)

    const find = persons.find(x => x.name === body.name)
    //console.log('FILTER:'+filter.name)
    //console.log(body.name)
    //console.log(find)

    //Manejo del error
    //Campos vacios
    if (body.name === undefined && body.number === undefined) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    else if (body.number === undefined) {
        return response.status(400).json({
            error: 'number is missing'
        })
    }

    else if (body.name === undefined) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }

    else {
        //Si se llega a encontrar el nombre en el arreglo
        if(find!==undefined){
            return response.status(400).json({
                error:'name must be unique'
            })
        }

        //Creacion de nuevo objeto
        const person = {
            id: Math.floor(Math.random() * (1000 - 1) + 1),
            name: body.name,
            number: body.number
        }

        persons = persons.concat(person)
        response.json(person)

        console.log(persons)
    }


})

//Definición de puerto y que escuhe dicho puerto
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Sever running on port ${PORT}`)
})
