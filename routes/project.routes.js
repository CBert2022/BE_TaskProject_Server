const express = require("express");
const router = express.Router();

const Project = require("../models/Project.model");
const Task = require("../models/Task.model") 

/////////// GET ALL PROJECT ON INDEX //////////////

router.get('/projects/', (req, res, next) => {
    Project.find()
      .populate('tasks')
      .then(allProjects => res.json(allProjects))
      .catch(err => res.json(err));
  });

  /////////// CREATE A PROJECT ON INDEX //////////////

    router.post('/projects', (req, res, next) => {
      const { title, description, createdBy } = req.body;
     
      Project.create({ title, description,createdBy,tasks: [] })
        .then(response => res.json(response))
        .catch(err => res.json(err));
    });

      //////////// DELETE PROJECT ///////////

  router.post("/projects/:id/delete", (req, res, next)=>{
    const id = req.params.id

    Project.findById(id)
    .then((projectFound) => {
      projectFound.tasks.forEach(task => {
       Task.findByIdAndRemove(task.toString())
       .then((deletedTasks) => {})
      })
      Project.findByIdAndRemove(id)
      .then((deletedProject) =>{
          res.status(200).json(deletedProject)
      })
      .catch((err) =>{
          console.log(err)
      }) 
    })


})

 
module.exports = router; 