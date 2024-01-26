const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// POST method
router.post("/", async (req, res) => {
  try {
    const personData = req.body;
    const newPerson = new Person(personData);
    const response = await newPerson.save();

    console.log("Data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET method
router.get("/", async (req, res) => {
  try {
    const personData = await Person.find();
    console.log("Data fetched");
    res.status(200).json(personData);
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET method(specific work type)
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log('Data fetched')
      res.status(200).json(response)
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// UPDATE method
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersondata = req.body;
    if (
      updatedPersondata.work &&
      !["chef", "waiter", "manager"].includes(updatedPersondata.work)
    ) {
      return res.status(400).json({ error: "Invalid work type" });
    }
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersondata,
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
    console.log("error");
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
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

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
