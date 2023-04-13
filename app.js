const express = require('express')
const cors = require('cors')
const fruits = require('./fruits.json')
const { capitalise } = require('./helpers')


const app = express()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send("hi")
})

app.get('/chickens', (req, res) => {
  res.send("Hello, chickens")
})

app.get('/chickens/:id', (req, res) => {
  res.send(req.query)
})

app.get('/fruits', (req, res) => {
  res.send(fruits)
})

app.get('/fruits/:name', (req, res) => {
  const name = req.params.name.toLowerCase()
  console.log(name)

  const fruit = fruits.find(fruit => fruit.name.toLowerCase() === name)
  console.log(fruit)
  if (fruit === undefined) {
    res.status(404).send({ error: `fruit: ${name} not found :(`})
  }
  res.send(fruit)
})

app.post('/fruits', (req, res) => {
  console.log("line 39", req.body.name)
  const ids = fruits.map(fruit => fruit.id)
  let maxId = Math.max(...ids)
  
  // console.log("line 42", maxId)

  const fruit = fruits.find(fruit => fruit.name === capitalise(req.body.name))

  console.log("line 48", fruit)

  if (fruit !== undefined) {
    res.status(409).send({error: "fruit already exists"})
  } else {
    maxId += 1
    const newFruit = req.body
    newFruit.id = maxId

    fruits.push(newFruit)

    res.status(201).send(newFruit)
  }

//   res.status(201).send(newFruit)

})


app.patch("/fruits/:name", (req, res) => {
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() === req.params.name.toLowerCase());
  
    if (fruit === undefined) {
      return res.status(404).send({error: "fruit does not exist"})
    }
  
    try {
      const updatedFruit = { ...req.body, name: capitalise(req.body.name), id: fruit.id}
  
      console.log("line 75", updatedFruit)
  
      const idx = fruits.findIndex(f => f.id === fruit.id);
      console.log(idx)
      fruits[idx] = updatedFruit;
      console.log(fruits[idx])
      res.send(updatedFruit)
    } catch (error) {
      res.status(400).send(error.message)
    }

   


  })


module.exports = app;
