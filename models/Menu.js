const mongoose = require('mongoose');

// Define the student schema
const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  isVegetarian: {
    type: Boolean,
    default: false
  }
});

// Create the Student model
const Menu = mongoose.model('Menu', menuSchema);

// Export the Student model for use in other files
module.exports = Menu;
