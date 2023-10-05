const express = require('express')
const path = require('path')
const Sentiment = require('sentiment')

const port = 3000
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

// GET for Webpages
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/index.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/Suicide%20Analysis.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'Suicide Analysis.html'))
})

app.get('/About.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'About.html'))
})

app.get('/depression_test.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'depression_test.html'))
})

app.get('/Helpline.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'Helpline.html'))
})

//GET for Images
app.get('/Images/*', function(req, res) {
  res.sendFile(path.join(__dirname, req.path))
})

// GET for sentiment analysis
app.get('/emotion', function(req, res) {
  const sentiment = new Sentiment()
  const text = req.query.text
  const score = sentiment.analyze(text)

  res.send(score)
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})
