const router = require("express").Router();
const mongoose = require('mongoose');

const User = require("../models/User.model");
const Task = require("../models/Task.model") 
const Project = require("../models/Project.model");

  //////////// A L L   T A S K ///////////

// Get route ==> render all tasks

  router.get('/tasks', (req, res, next) => {
    Task.find()
      .then(allTasks => res.json(allTasks))
      .catch(err => res.json(err));

  });

  //////////// N E W   T A S K ///////////

// Post route ==> create new task
router.post("/tasks", (req, res, next) => {
    console.log(req.body)
    
    const { title, description, dueDate, projectId } = req.body;
  
    Task.create({ title, description, dueDate, project: projectId })
      .then((newTask) => {
        return Project.findByIdAndUpdate(projectId, {
          $push: { tasks: newTask._id },
        });
      })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });

  //////////// D E L E T E  T A S K ///////////

  router.post("/tasks/:id/delete", (req, res, next)=>{
    const id = req.params.id
    console.log(id)
    Task.findByIdAndRemove(id)
    .then((deletedTask) =>{
        console.log("MADE IT", deletedTask)
    })
    .catch((err) =>{
        console.log(err)
    }) 

})

/* console.log("this is ptoject: ", projectId)
console.log("this is book creator: ", response.creator._id.toString() ) */

  module.exports = router;
