const express = require('express')
const app = express()

const fruits = require('./fruits.json')

app.get('/', (req, res) => {
  res.send('hi')
})

app.get("/chickens", (req,res) => {
    res.send('Hello, chickens')
  })


  app.get("/chickens/:id", (req,res) => {
    res.send(req.query)
  })

  app.get("/fruits", (req,res) => {
    // res.send("plenty of fruits")
    res.send(fruits)
  })


module.exports = app;

