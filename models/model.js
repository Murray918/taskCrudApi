const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: String,
  stats: [
            {
          date : String,
          numberOfTimes : Number
        }
      ]
})

const TaskSchema = mongoose.model('TaskSchema', taskSchema);

module.exports = TaskSchema
