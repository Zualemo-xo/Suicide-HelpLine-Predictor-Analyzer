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

app.get('/speech%20to%20text.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'speech to text.html'))
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

// Function and GET for sentiment analysis
document.addEventListener('DOMContentLoaded', speechToEmotion, false)

function speechToEmotion() {
  const recognition = new webkitSpeechRecognition()
  recognition.lang = 'en-US'
  recognition.continuous = true

  recognition.onresult = function(event) {
    const results = event.results
    const transcript = results[results.length-1][0].transcript

    setEmoji('searching')

    fetch(`/emotion?text=${transcript}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.score > 0) {
          setEmoji('positive')
        } else if (result.score < 0) {
          setEmoji('negative')
        } else {
          setEmoji('neutral')
        }
      })
      .catch((e) => {
        console.error('Request error -> ', e)
        recognition.abort()
      })
  }

  recognition.onerror = function(event) {
    console.error('Recognition error -> ', event.error)
    setEmoji('error')
  }

  recognition.onaudiostart = function() {
    setEmoji('listening')
  }

  recognition.onend = function() {
    setEmoji('idle')
  }

  recognition.start();

  function setEmoji(type) {
    const emojiElem = document.querySelector('.emoji img')
    emojiElem.classList = type
  }
}


app.get('/emotion', function(req, res) {
  const sentiment = new Sentiment()
  const text = req.query.text
  const score = sentiment.analyze(text)

  res.send(score)
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})
