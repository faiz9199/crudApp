const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// POST method
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newStudent = new Student(data);
    const response = await newStudent.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: "Internal sever error" });
  }
});

// GET method
router.get("/", async (req, res) => {
  try {
    const data = await Student.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: "Internal sever error" });
  }
});

// UPDATE method
router.put("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedStudentData = req.body;

    const response = await Student.findByIdAndUpdate(
      studentId,
      updatedStudentData,
      {
        new: true,
        returnDocument: "after",
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    if (error.name === "CastError" && error.kind === "ObjectId") {
      // Handle invalid ID error
      return res.status(404).json({ error: "Person not found" });
    }

    res.status(500).json({ error: "Internal sever error" });
  }
});

// DELETE method
router.delete("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const response = await Student.findByIdAndDelete(studentId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data deleted");
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    console.log(error);

    if (error.name === "CastError" && error.kind === "ObjectId") {
      // Handle invalid ID error
      return res.status(404).json({ error: "Person not found" });
    }

    res.status(500).json({ error: "Internal sever error" });
  }
});

module.exports = router;
