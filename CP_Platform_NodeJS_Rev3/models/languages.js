const mongoose = require('mongoose');

// Step 1: Define our Schema
// See: https://mongoosejs.com/docs/guide.html
/*
"Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection."
*/
const languageSchema = new mongoose.Schema(
  { id : {
    type: Number
  },
  name: {
    type: String
  },
  editor_mode:{
    type: String
  } 
  });

// Compile and export our model using the above Schema.
// See: https://mongoosejs.com/docs/models.html 

module.exports = mongoose.model('Languages', languageSchema);
// Important: The first argument of mongoose.model() is the singular name of the collection your model is for. 
// ** Mongoose automatically looks for the plural, lowercased version of your model name. **"
// In our example, we name our model 'Definition' and mongoose will automatically look for the collection 'definitions' 