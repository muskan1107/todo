const mongoose = require("mongoose");


mongoose.connect('mongodb+srv://ubantu:ubantu@cluster0.rgqpsg6.mongodb.net/').then(()=>{
    console.log('connected to db')
}).catch(err=>{
    console.log(err)
    console.log('Failed')
})


const todoSchema = mongoose.Schema({
  uid: {
    type: String,
    required: [true, "User details are required for creating a todo"],
  },

  title: {
    type: String,
    required: [true, "Title is required for create a todo task"],
  },
  description: {
    type: String,
  },

  date: {
    type: String,
    required: [true, "Date is required for creating task"],
  },

  
});

module.exports = mongoose.model('todo',todoSchema)
