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
    console.log(id)

    Project.findById(id)
    .then((projectFound) => {
      console.log("project: ", projectFound)
      projectFound.tasks.forEach(task => {
       Task.findByIdAndRemove(task.toString())
       .then((deletedTasks) => {})
      })
      Project.findByIdAndRemove(id)
      .then((deletedProject) =>{
          console.log("MADE IT", deletedProject)
          res.status(200).json(deletedProject)
      })
      .catch((err) =>{
          console.log(err)
      }) 
    })


})

  /////////// UPDATE PROJECT TASKS //////////////

router.post("/projects/sort", (req,res,next) => {
  const {array} = req.body
  console.log("array",array)
  Project.deleteMany().then((result)=> {
    console.log("result!!!!",result)
    Project.create(array).then((result)=> console.log(result))
  })

  

})


   


module.exports = router;