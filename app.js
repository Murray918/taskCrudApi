const mongoose = require('mongoose');
const express = require('express');
const bluebird = require('bluebird');
const ObjectId = require('mongodb').ObjectID;
const Task = require('./models/model.js');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/activities', {
  useMongoClient: true
});
const app = express();

app.use(bodyParser.json());

app.get('/api/activities', (req, res) => {
  console.log('in the get');
  Task.find().then((results) => {
    res.json({
      tasks: results
    })
  })
})

app.post('/api/activities', (req, res, ) => {
  const newTask = new Task({
    task: req.body.task,
    stats: [],
  })
  newTask.save()
    .then(() => {
      res.json({
        status: 'success',
      })
    })
});


app.put('/api/activities/:task', (req, res, ) => {
  let task = req.params.task;
  // console.log(req.body)
  Task.updateOne({
      task: task
    }, {
      $push: {
        stats: req.body
      }
    })
    .then((results) => {
      res.json({
        status: 'success',
        data: results
      })
    })
    .catch((error) => {
      console.log(error);
    })
})

app.delete('/api/stats/:task', (req, res) => {
  console.log('poop');
  task = req.params.task
  Task.deleteOne({
      task: task
    })
    .then((results) => {
      res.json({
        status: 'success',
        data: results
      })
    })
  console.log('slaw');
})



// Task.remove({},()=>{});

app.listen(3000, () => {
  console.log('Successfully started express application!');
})

// this sectnion of the code will shut down mongoose
process.on('SIGINT', () => {
  console.log("\nshutting down");
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected on app termination');
    process.exit(0);
  });
});
