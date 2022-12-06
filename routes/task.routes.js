const router = require("express").Router();
const mongoose = require('mongoose');

const User = require("../models/User.model");
const Task = require("../models/Task.model") 
const Project = require("../models/Project.model");

  //////////// N E W   T A S K ///////////

// Post route ==> create new task
router.post("/tasks", (req, res, next) => {
    console.log(req.body)
    
    const { title, description, dueDate, project } = req.body;
  
    Task.create({ title, description, dueDate, project })
      .then((newTask) => {
        return Project.findByIdAndUpdate(Project._id, {
          $push: { tasks: newTask._id },
        });
      })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });

  module.exports = router;