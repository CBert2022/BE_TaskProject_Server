const express = require("express");
const router = express.Router();

const Project = require("../models/Project.model");
const Task = require("../models/Task.model"); 
const User = require("../models/User.model");

/////////// GET ALL PROJECT ON INDEX //////////////

router.get('/users/:id/projects/', (req, res, next) => {
  const id = req.params.id
  
    User.findById(id)
      .populate({
        path: 'projects',

        populate: {
          path: 'tasks',
          model: Task
        }
      })
      .then(allProjects => res.json(allProjects))
      .catch(err => res.json(err));


  });

  /////////// CREATE A PROJECT ON INDEX //////////////

// router.post("/projects", (req, res, next) => {
//     const { title, description} = req.body;
//     console.log(req.body);
//     Project.create({ title, description })
//         .then((response) => res.json(response))
//         .catch((err) => res.json(err));
//     });

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

router.post("/users/:id/projects", (req,res,next) => {
  const id = req.params.id

  const {array} = req.body
  User.findByIdAndUpdate(id, {projects: array})
/*   console.log("array",array)
  Project.deleteMany().then((result)=> {
    console.log("result!!!!",result)
    Project.create(array).then((result)=> console.log(result))
  }) */
  .then(user => {res.status(201)})
  .catch(err => console.log(err))
})


   


module.exports = router;