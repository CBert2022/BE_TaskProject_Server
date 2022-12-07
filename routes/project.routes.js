const express = require("express");
const router = express.Router();

const Project = require("../models/Project.model");

/////////// GET ALL PROJECT ON INDEX //////////////

router.get('/projects/', (req, res, next) => {
    Project.find()
      .populate('tasks')
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
      const { title, description } = req.body;
     
      Project.create({ title, description, tasks: [] })
        .then(response => res.json(response))
        .catch(err => res.json(err));
    });

      //////////// DELETE PROJECT ///////////

  router.post("/projects/:id/delete", (req, res, next)=>{
    const id = req.params.id
    console.log(id)
    Project.findByIdAndRemove(id)
    .then((deletedTProject) =>{
        console.log("MADE IT", deletedTProject)
    })
    .catch((err) =>{
        console.log(err)
    }) 

})

   


module.exports = router;