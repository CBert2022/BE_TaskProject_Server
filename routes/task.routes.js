const router = require("express").Router();
const mongoose = require('mongoose');

const User = require("../models/User.model");
const Task = require("../models/Task.model") 
const Project = require("../models/Project.model");

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

  //////////// DELETE  T A S K ///////////

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
