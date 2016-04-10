var express = require('express');

// var bodyParser = require('body-parser');

var app = express();


var notes = [
  { author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
  { author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
  { author : 'Unknown', text : "Even the greatest was once a beginner. Don't be afraid to take that first step."},
  { author : 'Neale Donald Walsch', text : "You are afraid to die, and you're afraid to live. What a way to exist."}
];

//initializing code
app.listen(process.env.PORT || 3412);

app.get('/', function(req, res) {
  res.json(notes);
});

app.get('/note/random', function(req, res) {
  var id = Math.floor(Math.random() * notes.length);
  var q = notes[id];
  res.json(q);
});

app.get('/note/:id', function(req, res) {
  if(notes.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No note found');
  }
var q = notes[req.params.id];
  res.json(q);
});

// app.use(express.urlencoded())
// .use(express.json());

app.post('/note', function(req, res) {
  if(!req.body.hasOwnProperty('author') ||
     !req.body.hasOwnProperty('text')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }

var newnote = {
    author : req.body.author,
    text : req.body.text
  };

  console.log(newnote);
  //{
  // author: sodkfskdf,
  // text: lasdjkfasdf,
  //}

notes.push(newnote);
  res.json(true);
});

app.get('/note/:id', function(req, res) {
  if(notes.length <= req.params.id) {
    res.statusCode = 404;
    return res.send('Error 404: No note found');
  }

notes.splice(req.params.id, 1);
  res.json(true);
});
