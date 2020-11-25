const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema(
  {
    name: String,
    time: String,
    problem: String,
    input: String,
    level: Number,
    output:  String,
    sampleInputOne: String,
    sampleInputTwo: String,
    sampleOutputOne: String,
    sampleOutputTwo: String
  })

module.exports = mongoose.model('Problem', problemSchema)