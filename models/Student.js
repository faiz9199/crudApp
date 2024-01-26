const mongoose = require('mongoose');

// Define the student schema
const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
});

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

// Export the Student model for use in other files
module.exports = Student;
