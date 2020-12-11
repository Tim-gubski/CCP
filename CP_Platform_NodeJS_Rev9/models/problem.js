const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema(
  {
    name: String,
    time: String,
    problem: String,
    input: String,
    level: String,
    output:  String,
    answer:String,
    testingInput: String,
    sampleInputOne: String,
    sampleInputTwo: String,
    sampleOutputOne: String,
    sampleOutputTwo: String,
    solution:String,
    img:
    {
        data: Buffer,
        contentType: String
    }

  })

module.exports = mongoose.model('Problem', problemSchema)